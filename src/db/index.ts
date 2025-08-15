import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env");
}

// Create the Postgres client
const queryClient = postgres(process.env.DATABASE_URL);

// Create the Drizzle DB instance
export const db = drizzle(queryClient);