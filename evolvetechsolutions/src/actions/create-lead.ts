"use server";

import { createLead } from "@/drizzle/repository";
import { leadsTable } from "@/drizzle/schema";
import { InferInsertModel } from "drizzle-orm";

export async function createLeadAction(
  lead: InferInsertModel<typeof leadsTable>,
) {
  return await createLead(lead);
}
