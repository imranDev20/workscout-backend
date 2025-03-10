// src/routes/index.ts

import { Router } from "express";
import { jobRoutes } from "./job.routes.js";
// Import other route modules as they're created
// import { userRoutes } from './user.routes';

const router = Router();

router.use("/jobs", jobRoutes);
// Add other routes as they're created
// router.use('/users', userRoutes);

export const apiRoutes = router;
