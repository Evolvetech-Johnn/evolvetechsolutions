import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { leadsTable } from "./schema";
import { config as loadEnv } from "dotenv";
loadEnv({ path: [".env.local", ".env"] });

const connectionString = process.env.DATABASE_URL;

if (!connectionString)
  throw new Error("DATABASE_URL isn't defined on .env.local");

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, {
  schema: {
    leads: leadsTable,
  },
});
