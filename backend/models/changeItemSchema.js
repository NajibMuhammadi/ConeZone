const {itemSchema} = require('./itemSchema')

const changeItemSchema = itemSchema.fork(
    ['pk', 'name', 'desc', 'price', 'category', 'popular', 'components', 'image'],
    field => field.optional()
)

module.exports = { changeItemSchema };

/**
 * Författare Ida
 * Skapar en JoiSchema för när man ändrar i en order. Alla fält är valfria.
 */