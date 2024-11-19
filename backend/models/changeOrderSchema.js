const Joi = require('joi');
const {orderSchema} = require('./orderSchema')

const changeOrderSchema = orderSchema.fork(
    ['username', 'name', 'mail', 'number', 'order', 'totalPrice'],
    field => field.optional()
)

module.exports = { changeOrderSchema };

/**
 * Författare Ida
 * Skapar en JoiSchema för när man ändrar i en order. Alla fält är valfria.
 */