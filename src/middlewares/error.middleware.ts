import { ZodError } from "zod";

import type { IResponseMapperParams } from "../shared/interface.shared";
import type { ErrorRequestHandler } from "express";

import { Response } from "../mappers/Response.mapper";
import { HttpException } from "../utils/exception.util";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const response: IResponseMapperParams = {
    res,
    status: 500,
    message: err?.message ?? "Failed",
  };
  if (err instanceof HttpException) response["status"] = err.status;
  if (err instanceof ZodError) {
    response["status"] = 400;
    response["message"] = `${err.issues[0]?.path[0]} ${err.issues[0]?.message}`;
  }
  return Response.map(response);
};
