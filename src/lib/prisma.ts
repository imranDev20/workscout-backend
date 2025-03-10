import { PrismaClient } from "@prisma/client";

// Create a singleton Prisma instance
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export default prisma;
