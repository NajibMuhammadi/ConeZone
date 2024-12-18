const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const {errorHandler} = require('../../middlewares/errorHandler.js')
const {validateChangeOrder} = require('../../middlewares/validateChangeOrder.js');
const { validateKey } = require('../../middlewares/validateKey.js');
const {validateToken} = require('../../middlewares/validateToken.js')

const handler = async (event, context) => {
    const pk = event.pathParameters.pk;
    const id = event.pathParameters.id;

    if(!id || !pk) {
        return sendError(404, {message: 'Please add an pk or an id'})
    } else {
        if(!context.isAdmin){
            return sendError(401, {message: 'Unauthorized'});
        }

        try {
            const  {isApproved, isDone, isPickedUp, kitchenMessage} = JSON.parse(event.body)
            console.log('Data received from frontend:', { isApproved, isDone, isPickedUp, kitchenMessage });
            const response = await db.get({
                TableName: 'conezoneorder-db',
                Key: {
                    pk: pk,
                    sk: id
                }
            })

            if(!response.Item) {
                return sendError(404, {message: 'Order not found'})
            }

                const oldOrder = response.Item;
            
                const item = {
                    ...oldOrder,
                    ...(isApproved !== undefined && {isApproved}),
                    ...(isDone !== undefined && {isDone}),
                    ...(isPickedUp !== undefined && {isPickedUp}),
                    ...(kitchenMessage !== undefined && {kitchenMessage})
                }

                console.log(item)
                console.log('Writing to DynamoDB:', item);

                await db.put({
                    TableName: 'conezoneorder-db',
                    Item: item,
                })

                const updatedOrder = await db.query({
                    TableName: 'conezoneorder-db',
                    KeyConditionExpression: 'pk = :pk',
                    ExpressionAttributeValues: {
                        ':pk': pk,
                    }
                })
                return sendResponse(200, {message: 'Order changed:', updatedOrder: updatedOrder.Items})
        } catch(error) {
            return sendError(500, {message: error.message})
        }
    } 
}

const middyHandler = middy(handler);
exports.handler = middyHandler.use(validateToken()).use(validateKey()).use(validateChangeOrder()).use(errorHandler());

/**
  * Författare: Ida
  * Funktion som gör att man kan ändra i en order
  * Genom att att använda spread operatorn ser funktionen till att om ett värde inte ändras så skrivs det inte över utan använder det som fanns i ordern från början
  * Lägger till information till köket och ändras isApproved / isDone
*/