import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

// Define environment schema with validation
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("5000"),
  API_PREFIX: z.string().default("/api"),
  // Add other environment variables as needed
  // DB_URL: z.string(),
  // JWT_SECRET: z.string(),
  // etc.
});

// Validate and parse environment variables
const envVars = envSchema.parse(process.env);

// Export typed config
export const config = {
  environment: envVars.NODE_ENV,
  isDevelopment: envVars.NODE_ENV === "development",
  isProduction: envVars.NODE_ENV === "production",
  isTest: envVars.NODE_ENV === "test",
  port: envVars.PORT,
  apiPrefix: envVars.API_PREFIX,
  // Add other config properties as needed
  // dbUrl: envVars.DB_URL,
  // jwtSecret: envVars.JWT_SECRET,
  // etc.
};
