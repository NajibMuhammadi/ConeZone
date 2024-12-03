const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index.js')
const middy = require('@middy/core');
const { validateToken } = require('../../middlewares/validateToken.js');
const { errorHandler } = require('../../middlewares/errorHandler.js');
const {validateChangeItem} = require('../../middlewares/validateChangeItem')

const putItem = async (event, context) => {
    const id = event.pathParameters.id;

    if(!id) {
        return sendError(404, {message: 'Please add an id'})
    } 

    if(!context.isAdmin) {
        return sendError(401, {message: 'Unauthorized'})
    }
    
    try {1
        const {name, desc, price, category, popular, components, image} = JSON.parse(event.body)
        const response = await db.get({
            TableName: 'conezonemenu-db',
            Key: {
                pk: 'icecream',
                sk: id
            }
        })

        if(!response.Item) {
            return sendError(404, {message: 'Message not found'})
        }

        const item = {
            pk: 'icecream',
            sk: id,
            name: name, 
            desc: desc,
            price: price,
            category: category,
            popular: popular,          
            components: components,
            image: image
        }

        await db.put({
            TableName: 'conezonemenu-db',
            Item: item,
        })

        const updatedIcecream = await db.query({
            TableName: 'conezonemenu-db',
            KeyConditionExpression: 'pk = :pk',
            ExpressionAttributeValues: {
                ':pk': 'icecream',
            }
        })
        return sendResponse(200, {message: 'Icecream changed:', updatedIcecream})
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

const middyHandler = middy(putItem);
exports.handler = middyHandler.use(validateToken()).use(validateChangeItem()).use(errorHandler());

/**
  * Författare: Ida
  * Funktion som gör att man kan ändra i alla våra produkter som tillhör typen icecream
*/

/* 
    * Författare: Najib
    * tar emot context från validateToken middleware och kollar om användaren är admin eller inte.
 */