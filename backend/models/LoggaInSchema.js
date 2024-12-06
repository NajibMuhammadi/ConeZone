const Joi = require('joi');

const loggaInSchema = Joi.object({
    usernameOrEmail: Joi.string().required().messages({
        'string.empty': 'username or email is not allowed to be empty',
        'any.required': 'username or email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'password is not allowed to be empty',
        'any.required': 'password is required'
    }),
});

module.exports = { loggaInSchema };

/* 
    *författare: Najib
    *kommentar: Denna kod är ett schema för att validera användarens uppgifter vid inloggning.
 */