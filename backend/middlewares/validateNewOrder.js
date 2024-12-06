const {orderSchema} = require('../models/orderSchema')

const validateNewOrder = () => ({
    before : (handler) => {
        const { error } = orderSchema.validate(JSON.parse(handler.event.body));
        if(error) {
            throw new Error(error.details[0].message);
        }
        return;
    }
});

module.exports = {validateNewOrder}

/**
 * Författare Ida
 * En middleware som kontrollerar att alla nya ordrar som läggs till kontrolleras mot orderSchema och vid eventuella fel skickas ett felmeddelande tillbaka
 */