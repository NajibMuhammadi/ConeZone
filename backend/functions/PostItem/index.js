const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index')
const {v4 : uuid} = require('uuid')
const middy = require('@middy/core');
const {errorHandler} = require('../../middlewares/errorHandler.js')
const {validateNewItem} = require('../../middlewares/validateNewItem.js')

const handler = async (event) => {
      const {pk, name, desc, price, category, popular, components, image} = JSON.parse(event.body)
      const id = uuid().substring(0, 8)
    
      try {
        await db.put({
          TableName: 'conezonemenu-db',
          Item: {
            pk: pk,
            sk: id,
            name: name, 
            desc: desc,
            price: price,
            category: category,
            popular: popular,          
            components: components,
            image: image
          }
        })
          return sendResponse(200, {success: true, message: 'New item added'})
      } catch (error) {
        return sendError (500, {success: false, message: error.message})
      }
}

const middyHandler = middy(handler);
exports.handler = middyHandler.use(validateNewItem()).use(errorHandler());

/**
  * Författare: Ida
  * Funktion som lägger till nya items till vår meny databas
  * Funtionen använder sig av middy för att dels validera den inkommande datan mot en valideringsmiddleware och eventuella fel hanteras av errorHandlern
*/
