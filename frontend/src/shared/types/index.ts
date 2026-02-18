export type Platform = {
  id: string;
  name: string;
  summary: string;
  icon: string;
  category: string;
  description: string;
  technologies: string[];
  highlights: string[];
  features: string[];
};

export type ProjectResult = Record<string, string>;

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type Project = {
  id: string;
  name: string;
  platform: string;
  category: string;
  description: string;
  summary: string;
  image: string;
  internalUrl?: string;
  liveUrl?: string;
  technologies: string[];
  features: string[];
  highlights: string[];
  status: string;
  year: number;
  createdAt: string;
  client: string;
  duration: string;
  testimonial: string;
  testimonialDetails?: ProjectTestimonial;
  results: ProjectResult;
};

export type Technology = {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  level: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type SuccessUrl = {
  success: boolean;
  url: string;
};
