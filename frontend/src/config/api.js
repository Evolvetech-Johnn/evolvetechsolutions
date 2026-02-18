// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// API endpoints
export const API_ENDPOINTS = {
  health: '/health',
  platforms: '/platforms',
  platformById: (id) => `/platforms/${id}`,
  projects: '/projects',
  projectById: (id) => `/projects/${id}`,
  projectUrl: (id) => `/internal/projects/${id}/url`,
  technologies: '/technologies',
  contact: '/contact'
};

// Helper function to build full URL
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};
