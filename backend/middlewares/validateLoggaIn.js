const {loggaInSchema} = require('../models/LoggaInSchema');

const validateLoggaIn = () => ({ 
    before: (handler) => {
        const { error } = loggaInSchema.validate(JSON.parse(handler.event.body));
        if(error) {
            throw new Error(error.details[0].message);
        }
        return;
    }
});

module.exports = {validateLoggaIn}

/**
 * Författare Najib
 * En middleware som kontrollerar att alla inloggningar kontrolleras mot loggaInSchema och vid eventuella fel skickas ett felmeddelande tillbaka
* */