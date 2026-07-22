import * as dotenv from 'dotenv';
dotenv.config();
import { db } from './src/db/index.js';
import { portfolioItems } from './src/db/schema.js';
import { desc } from 'drizzle-orm';

async function testQuery() {
  try {
    const items = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
    console.log("Items:", items);
  } catch (error) {
    console.error("Query failed:", error);
  }
  process.exit(0);
}
testQuery();
