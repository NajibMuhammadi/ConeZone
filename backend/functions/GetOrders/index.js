const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index')

exports.handler = async (event) => {
    try {
        const data = await db.scan({
            TableName: 'conezoneorder-db',
        })
        return sendResponse(200, {success: true, message: data.Items})
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

/**
 * Författare Ida
 * Funktion som hämtar alla våra orders i vår orderdatabas
 * BEHÖVER LÄGGA TILL ATT ENBART ADMIN KAN GÖRA DETTA!
 */