import { PrismaClient } from "@prisma/client";
import { isDevelopment } from "./env.util";

export const db = new PrismaClient(
  isDevelopment ? { log: ["error", "info", "query", "warn"] } : undefined
);
