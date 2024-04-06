import type { Response } from "express";

export interface IResponseMapperParams {
  message?: string;
  status?: number;
  data?: unknown;
  res: Response;
}

export interface IResponse {
  message: string;
  status: number;
  data: unknown;
  success: boolean;
}
