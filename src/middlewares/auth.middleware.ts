import type { Handler } from "express";

import { UnauthorizedException } from "../utils/exception.util";
import { tokenVerify } from "../shared/function.shared";
import { AUTH_MESSAGES } from "../modules/auth/auth.constant";
import rateLimit from "express-rate-limit";

export const protect: Handler = (request, response, next) => {
  const authorizationHeader = request.headers["authorization"];

  if (!authorizationHeader?.startsWith("Bearer")) {
    throw new UnauthorizedException(AUTH_MESSAGES.UN_AUTHORIZED);
  }

  const token = authorizationHeader.split(" ")[1];
  if (token == undefined)
    throw new UnauthorizedException(AUTH_MESSAGES.UN_AUTHORIZED);

  try {
    const user = tokenVerify(token);
    request["user"] = user;
    next();
  } catch (error) {
    throw new UnauthorizedException(AUTH_MESSAGES.UN_AUTHORIZED);
  }
};

export const usersLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  statusCode: 429, // Status code to return when limit is exceeded
});
