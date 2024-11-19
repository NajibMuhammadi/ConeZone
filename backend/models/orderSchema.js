const Joi = require('joi');

const orderSchema = Joi.object({
    username : Joi.string().required(),
    customerDetails: Joi.object({
        name : Joi.string().required(),
        email : Joi.string().email().required(),
        phone: Joi.string().pattern(/^\+?[0-9]+$/).required(),
    }).required(),
    items: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            price: Joi.number().strict().required(),
            qty: Joi.number().strict().required(),
        })).required(),
    isApproved: Joi.boolean().strict().required(),
    isDone: Joi.boolean().strict().required(),
    paymentMethod: Joi.string().required(),
    totalPrice : Joi.number().strict().required()
}); 

module.exports = { orderSchema };

/**
 * Författare Ida
 * Skapar en JoiSchema där jag säkerhetsställer att nya order är av rätt typ och är required.
 */