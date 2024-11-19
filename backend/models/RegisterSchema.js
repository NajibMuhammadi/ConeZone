const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.empty': 'username is not allowed to be empty',
        'any.required': 'username is required'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'email is not allowed to be empty',
        'string.email': 'email must be a valid email address',
        'any.required': 'email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'password is not allowed to be empty',
        'any.required': 'password is required'
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'passwords do not match',
        'any.required': 'confirmPassword is required'
    })
});

module.exports = { userSchema };

/* 
    *författare: Najib
    *kommentar: Denna kod är ett schema för att validera användarens uppgifter vid registrering.
 */