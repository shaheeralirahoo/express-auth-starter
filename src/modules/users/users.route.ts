import { Router } from "express";

import { protect, usersLimiter } from "../../middlewares/auth.middleware";
import {
  getAllUserHandler,
  getPersonalDetailHandler,
  protedRouteHandler,
} from "./users.controller";

const userRoutes = Router();
//  get
userRoutes.get('/protected',usersLimiter,protect,protedRouteHandler)
userRoutes.get("/user/",usersLimiter, protect, getAllUserHandler);
userRoutes.get("/user/me",usersLimiter,protect, getPersonalDetailHandler);
userRoutes.get('/user/testlimt',usersLimiter,protedRouteHandler)
//  post
//  patch
//  delete

export default userRoutes;
