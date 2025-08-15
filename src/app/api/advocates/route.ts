// src/app/api/advocates/route.ts
import { advocates } from "@/db/schema";
import { advocateData } from "@/db/seed/advocates";
import { or, like, count, sql } from "drizzle-orm";
import type { Advocate } from "@/types/advocate";
import {db} from "@/db";

// Helper to filter advocates during fallback
function matchesSearch(advocate: Advocate, search: string) {
  const lower = search.toLowerCase();
  return (
    advocate.firstName.toLowerCase().includes(lower) ||
    advocate.lastName.toLowerCase().includes(lower) ||
    advocate.city.toLowerCase().includes(lower) ||
    advocate.degree.toLowerCase().includes(lower) ||
    advocate.specialties.some(s => s.toLowerCase().includes(lower)) ||
    advocate.yearsOfExperience.toString().includes(lower)
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = (searchParams.get("search") || "").trim().toLowerCase();

    let finalData: Advocate[];
    let total: number;
    let source: 'static' | 'database';

    // Try database first, fallback to static data
    try {
      if (db) {
        const offset = (page - 1) * limit;
        
        let paginated;
        if (search) {
          paginated = await db
            .select()
            .from(advocates)
            .where(
              or(
                like(advocates.firstName, `%${search}%`),
                like(advocates.lastName, `%${search}%`),
                like(advocates.city, `%${search}%`),
                like(advocates.degree, `%${search}%`),
                like(advocates.specialties, `%${search}%`),
                sql`${advocates.yearsOfExperience}::text LIKE ${`%${search}%`}`
              )
            )
            .limit(limit)
            .offset(offset);
        } else {
          paginated = await db
            .select()
            .from(advocates)
            .limit(limit)
            .offset(offset);
        }

        // Get total count for pagination
        const totalQuery = await db
          .select({ count: count() })
          .from(advocates);
        const dbTotal = Number(totalQuery[0]?.count || 0);

        // Map database results to match Advocate type
        finalData = paginated.map((adv) => ({
          id: adv.id || 0,
          firstName: adv.firstName || '',
          lastName: adv.lastName || '',
          city: adv.city || '',
          degree: adv.degree || '',
          specialties: Array.isArray(adv.specialties) ? adv.specialties : [],
          yearsOfExperience: adv.yearsOfExperience || 0,
          phoneNumber: adv.phoneNumber || 0,
          createdAt: adv.createdAt || new Date()
        }));
        total = dbTotal;
        source = 'database';
      } else {
        throw new Error('Database not available');
      }
    } catch (dbError) {
      // Fallback to static data
      let filteredData = advocateData;
      
      if (search) {
        filteredData = filteredData.filter((adv) => matchesSearch(adv, search));
      }
      
      finalData = filteredData;
      total = filteredData.length;
      source = 'static';
    }

    // Apply pagination only for static data (database data is already paginated)
    let paginatedData: Advocate[];
    if (source === 'database') {
      // Database already handled pagination
      paginatedData = finalData;
    } else {
      // Apply client-side pagination for static data
      const offset = (page - 1) * limit;
      paginatedData = finalData.slice(offset, offset + limit);
    }

    return Response.json({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      },
      source
    });

  } catch (error) {
    console.error("Error fetching advocates:", error);

    const fallbackPagination = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false
    };

    return Response.json({
      error: "Internal server error",
      data: [],
      pagination: fallbackPagination
    }, { status: 500 });
  }
}