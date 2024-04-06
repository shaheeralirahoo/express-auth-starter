import { Router } from "express";

import { signInHandler, signUpHandler } from "./auth.controller";

const authRoutes = Router();
//  post
authRoutes.post("/auth/sign-in", signInHandler);
authRoutes.post("/auth/sign-up", signUpHandler);

export default authRoutes;
