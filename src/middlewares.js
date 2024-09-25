import ExpressError from "./utils/ExpressError.js";
import jwt from "jsonwebtoken";
import prisma from "./db.js";
import {
  requireAuthenticationError,
  invalidTokenError,
  notFoundError,
  badRequestError,
} from "./utils/errors.js";

export const requireAuthentication = (req, res, next) => {
  if (!req.user) {
    return next(requireAuthenticationError);
  }
  next();
};

export const authenticate = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return next();
  }

  const [prefix, token] = bearer.split(" ");

  if (prefix !== "Bearer" || !token) {
    return next(invalidTokenError);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    req.user = user;
    next();
  } catch (e) {
    next(invalidTokenError);
  }
};

export const validateBody = (schema, req, res, next) => {
  const { error } = schema.validate(req.body, { convert: false });
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    next(new ExpressError(msg, 400));
  } else {
    next();
  }
};

export const extractIDParam = (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id) || id < 1) {
    return next(notFoundError);
  }
  req.IDParam = id;
  next();
};

export const extractPagination = (req, res, next) => {
  const page = req.query.page ? Number.parseInt(req.query.page, 10) : 1;
  if (Number.isNaN(page) || page < 1) {
    return next(badRequestError);
  }
  const pageSize = req.query.page_size
    ? Number.parseInt(req.query.page_size, 10)
    : 20;
  if (Number.isNaN(pageSize) || pageSize < 1) {
    return next(badRequestError);
  }
  req.query.page = page;
  req.query.page_size = pageSize;
  next();
};
