import express from "express";
import * as tokens from "../handlers/tokens.js";
import catchAsync from "../utils/catchAsync.js";
import { validateBody } from "../middlewares.js";
import { registerUserSchema } from "../schema.js";
const router = express.Router();

router
  .route("/authentication")
  .post(
    validateBody.bind(null, registerUserSchema),
    catchAsync(tokens.createAuthenticationToken)
  );

export default router;
