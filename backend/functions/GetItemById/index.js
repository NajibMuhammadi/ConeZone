const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index.js')

exports.handler = async (event) => {
    const id = event.pathParameters.id;


    if(!id) {
        return sendError(404, {message: 'Please add an id'})
    } else {
        try {
            const data = await db.get({
                TableName: 'conezonemenu-db',
                Key: {
                    pk: 'icecream',
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
  * Funktion som hämtar ett item från vår menydatabas som ligger under pk glass
*/