import { request } from "../../../infrastructure/http"
import type {
  ApiResponse,
  Platform,
  Project,
  SuccessUrl,
} from "../../../shared/types"

export function getPlatforms() {
  return request<ApiResponse<Platform[]>>("/platforms")
}

export function getPlatformById(id: string) {
  return request<ApiResponse<Platform>>(`/platforms/${id}`)
}

export function getProjects(params?: { platform?: string }) {
  return request<ApiResponse<Project[]>>("/projects", { params })
}

export function getProjectById(id: string) {
  return request<ApiResponse<Project>>(`/projects/${id}`)
}

export function getProjectRealUrl(id: string) {
  return request<SuccessUrl>(`/internal/projects/${id}/url`)
}
