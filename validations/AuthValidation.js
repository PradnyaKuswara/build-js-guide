import Joi from "joi";

export const loginValidation = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Field email is required",
        "string.email": "Email is not valid",
        "string.base": "Field email must be a string",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Field password is required",
        "string.base": "Field password must be a string",
    }),
});