// src/services/job.service.ts

import prisma from "../lib/prisma.js";
import {
  CreateJobDto,
  JobQueryParams,
  PaginatedResponse,
} from "@/types/job.types.js";
import { Job, Prisma } from "@prisma/client";

/**
 * Get jobs with filters and pagination
 */
export const getJobs = async (
  queryParams: JobQueryParams
): Promise<PaginatedResponse<Job>> => {
  const {
    page = 1,
    limit = 10,
    title,
    location,
    jobType,
    isActive = true,
    categoryId,
    skillId,
  } = queryParams;

  const skip = (page - 1) * limit;

  // Build the where clause based on provided filters
  const where: Prisma.JobWhereInput = {
    isActive,
    ...(title && { title: { contains: title, mode: "insensitive" } }),
    ...(location && { location: { contains: location, mode: "insensitive" } }),
    ...(jobType && { jobType }),
    ...(categoryId && { categories: { some: { categoryId } } }),
    ...(skillId && { skills: { some: { skillId } } }),
  };

  // Count total records for pagination
  const total = await prisma.job.count({ where });

  // Fetch jobs with relations
  const jobs = await prisma.job.findMany({
    where,
    take: limit,
    skip,
    orderBy: { createdAt: "desc" },
    include: {
      employerProfile: {
        select: {
          id: true,
          companyName: true,
          logo: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  return {
    data: jobs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get job details by ID
 */
export const getJobById = async (id: string) => {
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      employerProfile: true,
      categories: {
        include: {
          category: true,
        },
      },
      skills: {
        include: {
          skill: true,
        },
      },
      applications: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
    },
  });

  return job;
};

/**
 * Create a new job
 */
export const createJob = async (
  employerProfileId: string,
  jobData: CreateJobDto
) => {
  const { skills = [], categories = [], ...jobDetails } = jobData;

  return prisma.$transaction(async (tx) => {
    // Create the job
    const job = await tx.job.create({
      data: {
        ...jobDetails,
        employerProfile: {
          connect: { id: employerProfileId },
        },
      },
    });

    // Add skills
    if (skills.length > 0) {
      await Promise.all(
        skills.map((skillId) =>
          tx.jobSkill.create({
            data: {
              job: { connect: { id: job.id } },
              skill: { connect: { id: skillId } },
            },
          })
        )
      );
    }

    // Add categories
    if (categories.length > 0) {
      await Promise.all(
        categories.map((categoryId) =>
          tx.jobCategory.create({
            data: {
              job: { connect: { id: job.id } },
              category: { connect: { id: categoryId } },
            },
          })
        )
      );
    }

    // Return the job with relations
    return tx.job.findUnique({
      where: { id: job.id },
      include: {
        employerProfile: true,
        categories: {
          include: {
            category: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });
  });
};
