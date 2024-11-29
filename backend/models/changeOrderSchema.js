const {orderSchema} = require('./orderSchema')

const changeOrderSchema = orderSchema.fork(
    ['username', 'customerDetails', 'paymentMethod', 'items', 'isDone', 'isApproved', 'totalPrice', 'kitchenMessage'],
    field => field.optional()
)

module.exports = { changeOrderSchema };

/**
 * Författare Ida
 * Skapar en JoiSchema för när man ändrar i en order. Alla fält är valfria.
 */