const {userSchema} = require('../models/RegisterSchema');

const validateRegister = () => ({
    before : (handler) => {
        const { error } = userSchema.validate(JSON.parse(handler.event.body));
        if(error) {
            throw new Error(error.details[0].message);
        }
        return;
    }
});

module.exports = {validateRegister}

/**
 * Författare Najib
 * En middleware som kontrollerar att alla nya användare som registreras kontrolleras mot userSchema och vid eventuella fel skickas ett felmeddelande tillbaka
 * */