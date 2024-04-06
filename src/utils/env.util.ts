import * as dotenv from "dotenv";
import { z, ZodType } from "zod";

dotenv.config();

interface IEnvType {
  NODE_ENV?: string;
  PORT: string;
  JWT_SECRET: string;
}

const envSchema: ZodType<IEnvType> = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.string(),
  JWT_SECRET: z.string(),
});

export const ENV = envSchema.parse(process.env);

export const isDevelopment: boolean = ENV.NODE_ENV != "production";
export const isProduction: boolean = ENV.NODE_ENV === "production";
