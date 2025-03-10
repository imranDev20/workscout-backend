// src/routes/job.routes.ts

import { Router } from "express";
import * as jobController from "../controllers/job.controller.js";

const router = Router();

// Get all jobs with filtering and pagination
router.get("/", jobController.getJobs);

// Get job by ID
router.get("/:id", jobController.getJobById);

// Create a new job
router.post("/", jobController.createJob);

export const jobRoutes = router;
