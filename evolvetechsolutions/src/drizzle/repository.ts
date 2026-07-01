import { InferInsertModel } from "drizzle-orm";
import { db } from ".";
import { leadsTable } from "./schema";

export async function createLead(lead: InferInsertModel<typeof leadsTable>) {
  try {
    await db.insert(leadsTable).values(lead);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : "Erro desconhecido",
    };
  }
}
