import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const runMigration = async (): Promise<void> => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  console.log('Running migrations...');
  console.log('Database URL:', process.env.DATABASE_URL);

  const sql = postgres(process.env.DATABASE_URL, { 
    max: 1,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  
  try {
    const db = drizzle(sql);
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('✅ Successfully ran migration.');
  } catch (error) {
    console.error('❌ Failed to run migration.');
    console.error(error);
    throw error;
  } finally {
    await sql.end();
  }
};

runMigration()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
