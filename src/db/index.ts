import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Add types for global object (to persist connection across reloads)
declare global {
  // Avoid polluting globalThis too generically
  var __drizzleDb__: ReturnType<typeof drizzle> | undefined;
  var __drizzleClient__: ReturnType<typeof postgres> | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not set in environment variables.");
}

// Only create a new client if one doesn't already exist
const queryClient =
  global.__drizzleClient__ ??
  postgres(process.env.DATABASE_URL, {
    ssl: process.env.NODE_ENV === "production" ? "require" : false,
  });

export const db = global.__drizzleDb__ ?? drizzle(queryClient);

// Store in global to avoid multiple connections in dev
if (process.env.NODE_ENV !== "production") {
  global.__drizzleClient__ = queryClient;
  global.__drizzleDb__ = db;
}
