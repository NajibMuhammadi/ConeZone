const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index.js')
const middy = require('@middy/core');
const { validateToken } = require('../../middlewares/validateToken.js');
const { errorHandler } = require('../../middlewares/errorHandler.js');
const { validateKey } = require('../../middlewares/validateKey.js');

const getItem = async (event, context) => {
    const id = event.pathParameters.id;

    if(!id) {
        return sendError(404, {message: 'Please add an id'})
    }

    if(!context.isAdmin){
        return sendError(401, {message: 'Unauthorized'})
    }

    try {
        const data = await db.get({
            TableName: 'conezonemenu-db',
            Key: {
                pk: 'icecream',
                sk: id
            }
        })
    return sendResponse(200, data.Item)
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

const middyHandler = middy(getItem)
exports.handler = middyHandler.use(validateToken()).use(validateKey()).use(errorHandler());

/**
  * Författare: Ida
  * Funktion som hämtar ett item från vår menydatabas som ligger under pk glass
*/

/* 
    * Författare: Najib
    * tar emot context från validateToken middleware och kollar om användaren är admin eller inte.
    * ändrade till middy och la till validateKey och errorHandler
 */