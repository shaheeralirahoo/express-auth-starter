import type { Handler } from "express";

import { Response } from "../../mappers/Response.mapper";
import { authSchema } from "./schemas/auth.schema";
import { AUTH_MESSAGES } from "./auth.constant";
import { signIn, signUp } from "./auth.service";
import { exclude, tokenGenerator } from "../../shared/function.shared";
import { verifyPassword } from "../../utils/hash.util";
import { BadRequestException } from "../../utils/exception.util";
import { upsertIp } from "../users/users.service";
import {requestIP } from 'request-ip'
export const signInHandler: Handler = async (req, res, next) => {
  try {
    const body = authSchema.parse(req.body);

    const user = await signIn(body);
    const verifypass =  await verifyPassword(body.password,user.password)
    const ipAddress = req.connection.remoteAddress

    if(!verifypass){
      await  upsertIp(ipAddress,user.id)
      throw new BadRequestException(AUTH_MESSAGES.INC_CREDENTIALS)
    }
    const payload =  exclude(user,['password']);
    const token = tokenGenerator(user);
    return Response.map({
      res,
      message: AUTH_MESSAGES.SIGN_IN,
      data: { payload, token },
    });
  } catch (err) {
    next(err);
  }
};

export const signUpHandler: Handler = async (req, res, next) => {
  try {
    const body = authSchema.parse(req.body);

    const user = await signUp(body);
    const token = tokenGenerator(user);

    return Response.map({
      res,
      message: AUTH_MESSAGES.SIGN_UP,
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};
