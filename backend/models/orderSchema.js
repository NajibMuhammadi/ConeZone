const Joi = require('joi');

const orderSchema = Joi.object({
    username : Joi.string().required(),
    name : Joi.string().required(),
    mail : Joi.string().email().required(),
    number: Joi.string().pattern(/^\+?[0-9]+$/).required(),
    order: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            itemPrice: Joi.number().strict().required(),
            quantity: Joi.number().strict().required(),
            itemTotal: Joi.number().strict().required()
        })).required(),
    totalPrice : Joi.number().strict().required()
}); 

module.exports = { orderSchema };

/**
 * Författare Ida
 * Skapar en JoiSchema där jag säkerhetsställer att nya order är av rätt typ och är required.
 */