import express from "express";
import * as users from "../handlers/users.js";
import catchAsync from "../utils/catchAsync.js";
import { validateBody } from "../middlewares.js";
import { registerUserSchema } from "../schema.js";
const router = express.Router();

router
  .route("/")
  .post(
    validateBody.bind(null, registerUserSchema),
    catchAsync(users.registerUser)
  );

export default router;
