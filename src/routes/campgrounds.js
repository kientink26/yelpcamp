import express from "express";
import * as campgrounds from "../handlers/campgrounds.js";
import catchAsync from "../utils/catchAsync.js";
import { validateBody, extractIDParam } from "../middlewares.js";
import { createCampgroundSchema, updateCampgroundSchema } from "../schema.js";
import prisma from "../db.js";
import { notPermittedError } from "../utils/errors.js";
const router = express.Router();

const requireAuthorship = async (req, res, next) => {
  const campground = await prisma.campground.findUnique({
    where: {
      id: req.IDParam,
    },
  });
  if (campground.authorId !== req.user.id) {
    return next(notPermittedError);
  }
  next();
};

router
  .route("/")
  .get(catchAsync(campgrounds.listCampgrounds))
  .post(
    validateBody.bind(null, createCampgroundSchema),
    catchAsync(campgrounds.createCampground)
  );

router
  .route("/:id")
  .get(extractIDParam, catchAsync(campgrounds.showCampground))
  .patch(
    extractIDParam,
    requireAuthorship,
    validateBody.bind(null, updateCampgroundSchema),
    catchAsync(campgrounds.updateCampground)
  )
  .delete(
    extractIDParam,
    requireAuthorship,
    catchAsync(campgrounds.deleteCampground)
  );

export default router;
