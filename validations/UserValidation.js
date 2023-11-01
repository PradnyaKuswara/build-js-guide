import Joi from "joi";

export const createUserValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Field name is required",
        "string.base": "Field name must be a string",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Field email is required",
        "string.email": "Email is not valid",
        "string.base": "Field email must be a string",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Field password is required",
        "string.base": "Field password must be a string",
    }),
    image: Joi.string().required().messages({
        "string.empty": "Field image is required",
        "string.base": "Field image must be a string",
    }),
});

export const updateUserValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Field name is required",
        "string.base": "Field name must be a string",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email is not valid",
        "string.base": "Field email must be a string",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Field password is required",
        "string.base": "Field password must be a string",
    }),
    image: Joi.string().allow(null, ""),
});

export const fileValidation = (file) => {
    return !file;;
};