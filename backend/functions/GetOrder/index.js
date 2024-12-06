const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index.js')
const middy = require('@middy/core');
const { validateKey } = require('../../middlewares/validateKey.js');
const { errorHandler } = require('../../middlewares/errorHandler.js');

const getOrder = async (event) => {

    const pk = event.pathParameters.pk;
    const id = event.pathParameters.id;


    if(!id || !pk) {
        return sendError(404, {message: 'Please add both a user and an id'})
    } else {
        try {
            const data = await db.get({
                TableName: 'conezoneorder-db',
                Key: {
                    pk: pk,
                    sk: id
                }
            })
            if (!data.Item) {
                return sendError(404, { message: `Order with pk ${pk} and id ${id} not found` });
            }
        return sendResponse(200, data.Item)
        } catch(error) {
            return sendError(500, {message: error.message})
        }
    } 
}

const middyHandler = middy(getOrder);
exports.handler = middyHandler.use(validateKey()).use(errorHandler());

/**
  * Författare: Ida
  * Funktion som hämtar order utifrån både pk och id, som båda skickas med i url:en. 
  * order/{pk}/{id}
*/

/* 
    * Författare: Najib
    * ändrade till middy och la till validateKey och errorHandler
 */