const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index');
const middy = require('@middy/core');
const { validateKey } = require('../../middlewares/validateKey.js');
const { errorHandler } = require('../../middlewares/errorHandler.js');

const getOrders = async (event) => {
    try {
        const data = await db.scan({
            TableName: 'conezoneorder-db',
        })
        return sendResponse(200, {success: true, message: data.Items})
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

const middyHandler = middy(getOrders)
exports.handler = middyHandler.use(validateKey()).use(errorHandler());

/**
 * Författare Ida
 * Funktion som hämtar alla våra orders i vår orderdatabas
 * BEHÖVER LÄGGA TILL ATT ENBART ADMIN KAN GÖRA DETTA!
 */

/* 
    * Författare: Najib
    * ändrade till middy och la till validateKey och errorHandler
 */