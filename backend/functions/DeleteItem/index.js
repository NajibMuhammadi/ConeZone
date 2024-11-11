const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index')

exports.handler = async (event) => {
    const {id} = event.pathParameters;
    const pk = 'icecream';

    if(!id){
        return sendError(400, {message: 'Missing id'});
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

/* 
    * Författare: Najib
    * Funktion som tar bort en item från vår meny databas
 */

