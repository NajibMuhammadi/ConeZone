const {keys} = require('../data/keys');
const validateKey = () => ({
    before : (handler) =>{
        const {key} = handler.event.queryStringParameters;

        if(!key){
            throw new Error('Du måste ange en API-nyckel för att komma åt denna resurs');
        }

        if(!keys.some (k => k === key)){
            throw new Error('Din API-nyckel existerar inte');
        }
        return;
    }
})

module.exports = {validateKey}

/*
    * Författare: Najib
    * Middleware som validerar API-nyckeln som användaren skickar med i querystring.
 */