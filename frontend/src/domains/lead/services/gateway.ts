import { request } from "../../../infrastructure/http"
import type { ApiResponse } from "../../../shared/types"

export type ContactPayload = {
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string
  message: string
}

export function submitContact(payload: ContactPayload) {
  return request<ApiResponse<{ message: string }>>("/contact", { method: "POST", data: payload })
}
