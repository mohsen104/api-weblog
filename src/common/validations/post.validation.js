import Joi from "joi";

const PostValidation = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.base": `'title' must be a string.`,
    "string.empty": `'title' cannot be empty.`,
    "string.min": `'title' must be at least 3 characters long.`,
    "any.required": `'title' is required.`,
  }),
  description: Joi.string().min(20).required().messages({
    "string.base": `'description' must be a string.`,
    "string.empty": `'description' cannot be empty.`,
    "string.min": `'description' must be at least 20 characters long.`,
    "any.required": `'description' is required.`,
  }),
  slugs: Joi.array().max(10).required().messages({
    "array.base": `'slugs' must be an array.`,
    "array.max": `'slugs' must be a maximum 10 items.`,
    "any.required": `'slugs' are required.`,
  }),
});

const PostEditValidation = Joi.object({
  title: Joi.string().min(3).allow("").messages({
    "string.base": `'title' must be a string.`,
    "string.min": `'title' must be at least 3 characters long.`,
  }),
  description: Joi.string().min(20).allow("").messages({
    "string.base": `'description' must be a string.`,
    "string.min": `'description' must be at least 20 characters long.`,
  }),
  slugs: Joi.array().max(10).allow("").messages({
    "array.base": `'slugs' must be an array.`,
    "array.max": `'slugs' must be a maximum 10 items.`,
  }),
});

export { PostValidation, PostEditValidation };
