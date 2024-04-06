import type { Handler } from "express";

import { Response } from "../../mappers/Response.mapper";
import { findManyUser, findUserById } from "./users.service";

export const getAllUserHandler: Handler = async (req, res) => {
  const users = await findManyUser();
  return Response.map({ res, data: users });
};

export const getPersonalDetailHandler: Handler = async (req, res) => {
  const user = await findUserById(req.user?.id);
  return Response.map({ res, data: user });
};

export const protedRouteHandler: Handler = async (req, res) => {
  
  return Response.map({ res,data:'token is valid' });
};
