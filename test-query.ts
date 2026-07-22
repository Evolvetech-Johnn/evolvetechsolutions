import * as dotenv from 'dotenv';
dotenv.config();

async function testQuery() {
  try {
    const postgres = (await import('postgres')).default;
    const sql = postgres(process.env.DATABASE_URL!);
    await sql`
      CREATE TABLE IF NOT EXISTS "portfolio_items" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "title" text NOT NULL,
        "description" text,
        "category" text NOT NULL,
        "image_url" text NOT NULL,
        "order_index" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;
    console.log("Table created successfully");
  } catch (error) {
    console.error("Query failed:", error);
  }
  process.exit(0);
}
testQuery();
