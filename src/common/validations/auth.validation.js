import Joi from "joi";

const SendOtpValidation = Joi.object({
    mobile: Joi.string().pattern(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')).required().messages({
        'string.base': `'mobile' must be a string.`,
        "string.pattern.base": `'mobile' is incorrect.`,
        'any.required': `'mobile' is required.`,
    }),
});

const CheckOtpValidation = Joi.object({
    mobile: Joi.string().pattern(new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')).required().messages({
        'string.base': `'mobile' must be a string.`,
        "string.pattern.base": `'mobile' is incorrect.`,
        'any.required': `'mobile' is required.`,
    }),
    code: Joi.string().min(3).max(5).required().messages({
        'string.base': `'code' must be a string.`,
        'string.empty': `'code' cannot be empty.`,
        'string.min': `'code' must be at least 3 characters long.`,
        'string.max': `'code' must be a maximum 5 characters long.`,
        'any.required': `'code' is required.`,
    }),
});

export { SendOtpValidation, CheckOtpValidation };
