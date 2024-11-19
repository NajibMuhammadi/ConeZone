const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index');
const middy = require('@middy/core');
const { errorHandler } = require('../../middlewares/errorHandler.js');
const { validateLoggaIn } = require('../../middlewares/validateLoggaIn.js');

const loggaIn = async (event) => {

    const body = JSON.parse(event.body);
    let {usernameOrEmail, password} = body;

    usernameOrEmail = usernameOrEmail.toLowerCase();

    try{  
        const {Items} = await db.scan({
            TableName: 'conezoneuser-db',
            FilterExpression: ' username = :username OR email = :email',
            ExpressionAttributeValues: {
                ':username': usernameOrEmail,
                ':email': usernameOrEmail
            }
        });

        if(Items.length === 0){
            return sendError(400, 'User not found');
        }

        const user = Items[0];

        if(user.password !== password){
            return sendError(400, 'Invalid password');
        }

        return sendResponse(200, {
            body: {
                success: true,
                message: 'User logged in successfully',
                data: {
                    username: user.username,
                    email: user.email,
                    UserID: user.UserID
                }
            }
        });

    }
    catch(err){
        return sendError(500, err);
    }
}

exports.handler = middy(loggaIn)
    .use(validateLoggaIn())
    .use(errorHandler());

/* 
    *författare: Najib
    *kommentar: Denna kod är en funktion som loggar in en användare baserat på användarens användarnamn eller e-post och lösenord.
 */






