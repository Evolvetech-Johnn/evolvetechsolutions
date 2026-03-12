export type ApiConfig = {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
};

export const API_CONFIG: ApiConfig = {
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const API_ENDPOINTS = {
  health: "/health",
  platforms: "/platforms",
  platformById: (id: string) => `/platforms/${id}`,
  projects: "/projects",
  projectById: (id: string) => `/projects/${id}`,
  projectUrl: (id: string) => `/internal/projects/${id}/url`,
  technologies: "/technologies",
  contact: "/contact",
} as const;

export type ApiEndpoint = string;

export const buildApiUrl = (endpoint: ApiEndpoint) =>
  `${API_CONFIG.baseURL}${endpoint}`;
