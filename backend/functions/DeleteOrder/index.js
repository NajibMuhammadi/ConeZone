const { db } = require('../../services/index.js');
const { sendResponse, sendError } = require('../../responses/index.js');

exports.handler = async (event) => {
    const id = event.pathParameters.id;
    const pk = event.pathParameters.pk;

    if(!id || !pk) {
        return sendError(404, { message: 'Id or pk is missing' });
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
                return sendError(400, { message: 'Order not found' });
            }
            if(data.Item.isApproved === true) {
                return sendError(400, {message: 'You can not delete an approved item'})
            } else if (data.Item.isApproved === false) {
                try {
                    await db.delete({
                            TableName: 'conezoneorder-db',
                            Key: {
                                pk: pk,
                                sk: id
                            }
                    })
                    return sendResponse(200, {success: true, message: `Your order has been deleted`});
                    } catch (error) {
                        return sendError(404, { message: error.message });
                    }
            } else {
                return sendError(400, {message: 'Something went wrong'})
            }
        } catch (error) {
            return sendError(404, { message: error.message });
        }
    }
}