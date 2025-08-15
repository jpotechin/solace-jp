import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { advocates } from '../schema';
import { advocateData } from './advocates';

config();

const seedDatabase = async () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not found in environment variables');
    console.log('Please uncomment the DATABASE_URL in your .env file');
    process.exit(1);
  }

  try {
    console.log('🌱 Starting database seeding...');

    
    const sql = postgres(databaseUrl, { max: 1 });
    const db = drizzle(sql);

    console.log('📊 Inserting data...');

    
    const records = await db.insert(advocates).values(advocateData).returning();

    console.log(`✅ Successfully seeded ${records.length} advocates`);
    console.log('📋 Sample records:');
    records.slice(0, 3).forEach((record, index) => {
      console.log(
        `  ${index + 1}. ${record.firstName} ${record.lastName} - ${record.city}`
      );
    });

    
    await sql.end();

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
