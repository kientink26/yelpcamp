import ExpressError from "./ExpressError.js";

export const notFoundError = new ExpressError("resource not found", 404);

export const invalidCredentialError = new ExpressError(
  "invalid credential",
  401
);

export const requireAuthenticationError = new ExpressError(
  "must be authenticated",
  401
);

export const invalidTokenError = new ExpressError("invalid token", 401);

export const notPermittedError = new ExpressError(
  "doesn't have the necessary permissions",
  403
);

export const badRequestError = new ExpressError("bad request", 400);
