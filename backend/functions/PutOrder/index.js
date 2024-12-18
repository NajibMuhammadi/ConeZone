const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const {errorHandler} = require('../../middlewares/errorHandler.js')
const {validateChangeOrder} = require('../../middlewares/validateChangeOrder.js');
const { validateKey } = require('../../middlewares/validateKey.js');

const handler = async (event) => {
    const pk = event.pathParameters.pk;
    const id = event.pathParameters.id;

    if(!id || !pk) {
        return sendError(404, {message: 'Please add an pk or an id'})
    } else {
        try {
            const  {customerDetails, items, isApproved, isDone, isPickedUp, paymentMethod, totalPrice} = JSON.parse(event.body)
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

            console.log("Checking isApproved: ", response.Item.isApproved);


            if(response.Item.isApproved === true) {
                return sendError(400, {message: 'You can not change an approved item'})
            } else if (response.Item.isApproved === false) {
                const oldOrder = response.Item;
            
                const item = {
                    ...oldOrder,
                    ...(customerDetails !== undefined && {customerDetails}), 
                    ...(items !== undefined && { items }),
                    ...(totalPrice !== undefined && { totalPrice }),
                    ...(isApproved !== undefined && {isApproved}),
                    ...(isPickedUp !== undefined && {isPickedUp}),
                    ...(paymentMethod !== undefined && {paymentMethod}),
                    ...(isDone !== undefined && {isDone})    
                }
                
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
            }
        } catch(error) {
            return sendError(500, {message: error.message})
        }
    } 
}

const middyHandler = middy(handler);
exports.handler = middyHandler.use(validateKey()).use(validateChangeOrder()).use(errorHandler());

/**
  * Författare: Ida
  * Funktion som gör att man kan ändra i en order
  * Genom att att använda spread operatorn ser funktionen till att om ett värde inte ändras så skrivs det inte över utan använder det som fanns i ordern från början
*/

/* 
    * Författare: Najib
    * la till validateKey
 */