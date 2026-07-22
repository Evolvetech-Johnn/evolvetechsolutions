import * as dotenv from 'dotenv';
dotenv.config();

async function testQuery() {
  try {
    const postgres = (await import('postgres')).default;
    const sql = postgres(process.env.DATABASE_URL!);
    
    console.log('Adding team_profile_slug to portfolio_items...');
    await sql`
      ALTER TABLE portfolio_items 
      ADD COLUMN IF NOT EXISTS team_profile_slug text REFERENCES team_profiles(slug);
    `;
    console.log('Column added successfully!');

    await sql.end();
  } catch (error) {
    console.error("Query failed:", error);
  }
  process.exit(0);
}
testQuery();
