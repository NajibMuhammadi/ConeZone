const {itemSchema} = require('../models/itemSchema')

const validateNewItem = () => ({
    before : (handler) => {
        const { error } = itemSchema.validate(JSON.parse(handler.event.body));
        if(error) {
            throw new Error(error.details[0].message);
        }
        return;
    }
});

module.exports = {validateNewItem}

/**
 * Författare Ida
 * En middleware som kontrollerar att alla nya produkter som läggs till kontrolleras mot itemSchema och vid eventuella fel skickas ett felmeddelande tillbaka
 */