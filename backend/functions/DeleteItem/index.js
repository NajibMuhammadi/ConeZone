const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index')
const middy = require('@middy/core');
const { validateToken } = require('../../middlewares/validateToken.js');
const { errorHandler } = require('../../middlewares/errorHandler.js');
const { validateKey } = require('../../middlewares/validateKey.js');

const deleteItem = async (event, context) => {
    const {id} = event.pathParameters;
    const pk = 'icecream';

    if(!id){
        return sendError(400, {message: 'Missing id'});
    }

    if(!context.isAdmin){
        return sendError(401, {message: 'Unauthorized'});
    }

    try{
        const result = await db.get({
            TableName: 'conezonemenu-db',
            Key: {
                pk : pk,
                sk : id,
            }
        });

        if(!result.Item){
            return sendError(404, {message: 'Item not found'});
        }

        const data = await db.delete({
            TableName: 'conezonemenu-db',
            Key: {
                pk : pk,
                sk : id,
            }  
        });

        return sendResponse(200, data);

    }catch(err){
        return sendError(404, {message : err.message});
    }
}

const middyHandler = middy(deleteItem); 
exports.handler = middyHandler.use(validateToken()).use(validateKey()).use(errorHandler());

/* 
    * Författare: Najib
    * Funktion som tar bort en item från vår meny databas
    * Funktionen kräver att användaren är inloggad som admin
 */

