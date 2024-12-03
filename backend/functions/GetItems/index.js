const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index')
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js')
const { errorHandler } = require('../../middlewares/errorHandler.js')

const getItems = async (event) => {
   try{
    const data = await db.scan({
        TableName: 'conezonemenu-db',
    })
    return sendResponse(200, data.Items);
   }catch(err){
        return sendError(404, {message : err.message});
   }
}
const middyHandler = middy(getItems)
exports.handler = middyHandler.use(validateKey()).use(errorHandler());
/* 
    * Författare: Najib
    * Funktion som hämtar alla items från vår meny databas
 */
