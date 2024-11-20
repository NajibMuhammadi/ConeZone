const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index')
const middy = require('@middy/core');
const {errorHandler} = require('../../middlewares/errorHandler.js')
const {validateNewOrder} = require('../../middlewares/validateNewOrder.js')
const {v4 : uuid} = require('uuid')


const handler = async (event) => {
    const {username, customerDetails, items, paymentMethod, isApproved, isDone, totalPrice} = JSON.parse(event.body)
    const sk = uuid().substring(0, 8)

    try {
        await db.put({
            TableName: 'conezoneorder-db',
            Item: {
                pk: username || 'guest',
                sk: sk,
                customerDetails: customerDetails,
                items: items,
                paymentMethod: paymentMethod,
                totalPrice: totalPrice,
                isApproved: isApproved,
                isDone: isDone 
        }
    })
        return sendResponse(200, {success: true, message: 'New order added'})
    } catch (error) {
        return sendError (500, {success: false, message: error.message})
    }
}

const middyHandler = middy(handler);
exports.handler = middyHandler.use(validateNewOrder()).use(errorHandler());

/**
* Författare: Ida
* Funktion som lägger till ordrar till vår order databas.
* Om användaren är inloggad lagrats det under användarnamnet, annars under guest. 
* Funtionen använder sig av middy för att dels validera den inkommande datan mot en valideringsmiddleware och eventuella fel hanteras av errorHandlern
*/
