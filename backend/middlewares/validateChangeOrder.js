const {changeOrderSchema} = require('../models/changeOrderSchema')

const validateChangeOrder = () => ({
    before : (handler) => {
        const { error } = changeOrderSchema.validate(JSON.parse(handler.event.body));
        if(error) {
            throw new Error(error.details[0].message);
        }
        return;
    }
});

module.exports = {validateChangeOrder}

/**
 * Författare Ida
 * En middleware som kontrollerar att ordrar som ändras kontrolleras mot cchangeOrderSchema och vid eventuella fel skickas ett felmeddelande tillbaka
 */