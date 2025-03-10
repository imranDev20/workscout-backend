// src/controllers/job.controller.ts

import { Request, Response } from "express";
import { JobQueryParams, CreateJobDto } from "@/types/job.types.js";
import { JobType } from "@prisma/client";
import * as jobService from "../services/job.service.js";

/**
 * Get jobs with pagination and filters
 */
export const getJobs = async (req: Request, res: Response) => {
  try {
    const queryParams: JobQueryParams = {
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      title: req.query.title as string | undefined,
      location: req.query.location as string | undefined,
      jobType: req.query.jobType as JobType | undefined,
      isActive:
        req.query.isActive === "true"
          ? true
          : req.query.isActive === "false"
          ? false
          : undefined,
      categoryId: req.query.categoryId as string | undefined,
      skillId: req.query.skillId as string | undefined,
    };

    const jobs = await jobService.getJobs(queryParams);
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error getting jobs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get job by ID
 */
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await jobService.getJobById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Error getting job by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Create a new job
 */
export const createJob = async (req: Request, res: Response) => {
  try {
    // In a real app, you'd get this from the authenticated user
    // For now, we'll pass it from the request
    const { employerProfileId } = req.body;

    if (!employerProfileId) {
      return res
        .status(400)
        .json({ message: "Employer profile ID is required" });
    }

    // Parse deadline string to Date
    let jobData = req.body as CreateJobDto;
    if (typeof jobData.deadline === "string") {
      jobData = {
        ...jobData,
        deadline: new Date(jobData.deadline),
      };
    }

    const job = await jobService.createJob(employerProfileId, jobData);
    return res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);

    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
