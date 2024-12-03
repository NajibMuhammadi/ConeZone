const {changeItemSchema} = require('../models/changeItemSchema')

const validateChangeItem = () => ({
    before : (handler) => {
        const { error } = changeItemSchema.validate(JSON.parse(handler.event.body));
        if(error) {
            console.error('Validation error', error.details)
            throw new Error(error.details[0].message);
        }
        return;
    }
});

module.exports = {validateChangeItem}

/**
 * Författare Ida
 * En middleware som kontrollerar att items som ändras kontrolleras mot changeItemSchema och vid eventuella fel skickas ett felmeddelande tillbaka
 */