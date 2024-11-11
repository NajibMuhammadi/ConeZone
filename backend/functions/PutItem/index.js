const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index.js')

exports.handler = async (event) => {
    const id = event.pathParameters.id;

    if(!id) {
        return sendError(404, {message: 'Please add an id'})
    } else {
        try {
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
}
