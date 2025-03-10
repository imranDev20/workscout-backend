// src/app.ts

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/environment.js";
import { apiRoutes } from "./routes/index.js";

export const createApp = () => {
  const app = express();

  // Apply middleware
  app.use(helmet());
  app.use(cors());
  app.use(morgan(config.isDevelopment ? "dev" : "combined"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Apply API routes
  app.use(config.apiPrefix, apiRoutes);

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Error handling
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      res.status(500).json({
        error: "Internal Server Error",
        message: config.isDevelopment ? err.message : "Something went wrong",
      });
    }
  );

  return app;
};
