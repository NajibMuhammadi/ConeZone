const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index')

exports.handler = async (event) => {
   try{
    const data = await db.scan({
        TableName: 'conezonemenu-db',
    })
    return sendResponse(200, data.Items);
   }catch(err){
        return sendError(404, {message : err.message});
   }
}

/* 
    * Författare: Najib
    * Funktion som hämtar alla items från vår meny databas
 */
