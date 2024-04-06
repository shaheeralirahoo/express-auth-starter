import type { Handler } from "express";
import type { User } from "@prisma/client";

import jwt from "jsonwebtoken";

import { UNKNOWN_ROUTE_MESSAGE } from "./constants/app.constant";
import { NotFoundException } from "../utils/exception.util";
import { ENV } from "../utils/env.util";
import {rateLimit} from 'express-rate-limit'

export function tokenGenerator(user: User) {
  return jwt.sign(user, ENV.JWT_SECRET);
}

export function tokenVerify(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET) as User;
}

export const unknownRouteHandler: Handler = () => {
  throw new NotFoundException(UNKNOWN_ROUTE_MESSAGE);
};
export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(obj as any).filter(([key]) => !keys.includes(key as any)),
  ) as Omit<T, Key>;
}

export const usersLimiter = (minute:number,maxNumberOfRequest:number) => {
  const usersLimiter = rateLimit({
    windowMs: minute * 1000, // 1 minute
    max: maxNumberOfRequest, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    statusCode: 429, // Status code to return when limit is exceeded
  });
  return usersLimiter
}



