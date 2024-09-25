import Joi from "joi";

export const createCampgroundSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  // image: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateCampgroundSchema = Joi.object({
  title: Joi.string(),
  price: Joi.number().min(0),
  // image: Joi.string(),
  location: Joi.string(),
  description: Joi.string(),
});

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
