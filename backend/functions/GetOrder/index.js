const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index.js')

exports.handler = async (event) => {

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
        return sendResponse(200, {success: true, message: data.Item
        })
        } catch(error) {
            return sendError(500, {message: error.message})
        }
    } 
}

/**
  * Författare: Ida
  * Funktion som hämtar order utifrån både pk och id, som båda skickas med i url:en. 
  * order/{pk}/{id}
*/