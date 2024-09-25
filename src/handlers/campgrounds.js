import prisma from "../db.js";
import { notFoundError } from "../utils/errors.js";

export const listCampgrounds = async (req, res) => {
  const campgrounds = await prisma.campground.findMany({
    take: req.query.page_size,
    skip: (req.query.page - 1) * req.query.page_size,
    orderBy: {
      id: "asc",
    },
  });
  res.json({ campgrounds: campgrounds });
};

export const createCampground = async (req, res) => {
  const { title, price, location, description } = req.body;
  const campground = await prisma.campground.create({
    data: {
      title,
      price,
      location,
      description,
      author: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });
  res.json({ campground: campground });
};

export const showCampground = async (req, res, next) => {
  const campground = await prisma.campground.findUnique({
    where: {
      id: req.IDParam,
    },
  });
  if (!campground) {
    return next(notFoundError);
  }
  res.json({ campground: campground });
};

export const updateCampground = async (req, res) => {
  const { title, price, location, description } = req.body;
  const campground = await prisma.campground.update({
    where: {
      id: req.IDParam,
      author: {
        id: req.user.id,
      },
    },
    data: {
      title,
      price,
      location,
      description,
    },
  });
  res.json({ campground: campground });
};

export const deleteCampground = async (req, res) => {
  await prisma.campground.delete({
    where: {
      id: req.IDParam,
      author: {
        id: req.user.id,
      },
    },
  });
  res.json({ message: "campground deleted" });
};
