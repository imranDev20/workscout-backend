// src/types/job.types.ts

import { JobType } from "@prisma/client";

// For GET job requests - query parameters
export interface JobQueryParams {
  page?: number;
  limit?: number;
  title?: string;
  location?: string;
  jobType?: JobType;
  isActive?: boolean;
  categoryId?: string;
  skillId?: string;
}

// For creating a job - what we expect from the frontend
export interface CreateJobDto {
  title: string;
  description: string;
  location?: string;
  jobType: JobType;
  salary?: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  deadline: Date;
  isFeatured?: boolean;
  isActive?: boolean;
  skills?: string[]; // Array of skill IDs
  categories?: string[]; // Array of category IDs
}

// Pagination response wrapper
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
