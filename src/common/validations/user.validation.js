import Joi from "joi";

const UserValidation = Joi.object({
  fullName: Joi.string().min(3).allow("").messages({
    "string.base": `'fullName' must be a string.`,
    "string.min": `'fullName' must be at least 3 characters long.`,
  }),
  bio: Joi.string().min(10).allow("").messages({
    "string.base": `'bio' must be a string.`,
    "string.min": `'bio' must be at least 10 characters long.`,
  }),
});

export default UserValidation;
