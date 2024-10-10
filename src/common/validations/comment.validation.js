import Joi from "joi";

const CommentValidation = Joi.object({
  description: Joi.string().min(3).required().messages({
    "string.base": `'description' must be a string.`,
    "string.empty": `'description' cannot be empty.`,
    "string.min": `'description' must be at least 3 characters long.`,
    "any.required": `'description' is required.`,
  }),
  rate: Joi.number().min(0).max(5).required().messages({
    "number.base": `'rate' must be a number.`,
    "number.min": `'rate' must be at least 0.`,
    "number.max": `'rate' must be a maximum 5.`,
    "any.required": `'rate' are required.`,
  }),
});

const CommentAnsValidation = Joi.object({
  description: Joi.string().min(3).required().messages({
    "string.base": `'description' must be a string.`,
    "string.empty": `'description' cannot be empty.`,
    "string.min": `'description' must be at least 3 characters long.`,
    "any.required": `'description' is required.`,
  }),
});

export { CommentValidation, CommentAnsValidation };
