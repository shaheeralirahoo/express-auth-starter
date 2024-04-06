import { z, ZodType } from "zod";

export interface AuthDto {
  username: string;
  password: string;
}

export const authSchema: ZodType<AuthDto> = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(5).max(50),
});
