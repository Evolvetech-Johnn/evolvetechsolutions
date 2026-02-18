import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
})

export async function request<T>(
  url: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    data?: unknown
    params?: Record<string, unknown>
    headers?: Record<string, string>
  }
) {
  const res = await api.request<T>({
    url,
    method: options?.method || "GET",
    data: options?.data,
    params: options?.params,
    headers: options?.headers
  })
  return res.data
}

export { api }
