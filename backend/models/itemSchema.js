const Joi = require('joi');

const itemSchema = Joi.object({
    pk : Joi.string().required(),
    name : Joi.string().required(),
    desc : Joi.string().required(),
    price : Joi.number().strict().required(),
    category : Joi.string().required(),
    popular: Joi.boolean().strict().required(),
    components: Joi.array().items(Joi.string()).required(),
    image: Joi.string().required(),
}); 

module.exports = { itemSchema };

/**
 * Författare Ida
 * Skapar en JoiSchema där jag säkerhetsställer att nya items är av rätt typ och är required.
 */