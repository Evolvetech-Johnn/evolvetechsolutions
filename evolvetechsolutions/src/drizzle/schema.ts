import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const leadsTable = pgTable("leadsTable", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  role: varchar("role", { length: 32 }),
  phone: varchar("phone", { length: 16 }).notNull(),
  email: varchar("email", { length: 64 }),
});
