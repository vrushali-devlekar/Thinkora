import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import {
  getMe,
  login,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username , email, password }
 */

authRouter.post("/register", registerValidator, register);

/**
 * @route POST /api/auth/login
 * @desc Register a new user
 * @access Public
 * @body {username , email, password }
 */

authRouter.post("/login", loginValidator, login);

/**
 * @route POST /api/auth/get-me
 * @desc verify user's email address
 * @access Public
 * @body { token }
 */
authRouter.get("/get-me", authUser,getMe);

/**
 * @route GET /api/auth/verify-user
 * @desc Verify user email address
 * @access Public
 * @query {token}
 */
authRouter.get("/verify-email", verifyEmail);

export default authRouter;
