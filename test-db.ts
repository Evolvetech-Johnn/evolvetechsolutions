import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
  const sql = postgres(process.env.DATABASE_URL!);
  try {
    const result = await sql`SELECT 1`;
    console.log("Connection successful", result);
  } catch (e) {
    console.error("Connection failed", e);
  } finally {
    process.exit(0);
  }
}

testConnection();
