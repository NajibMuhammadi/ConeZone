const { db } = require('../../services/index.js');
const { sendResponse, sendError, sendResponseWithHeaders } = require('../../responses/index');
const middy = require('@middy/core');
const { errorHandler } = require('../../middlewares/errorHandler.js');
const { validateLoggaIn } = require('../../middlewares/validateLoggaIn.js');
const { comparePassword } = require('../../utils/index.js');
const { generateToken } = require('../../utils/index.js');

const loggaIn = async (event) => {

    let body = JSON.parse(event.body);
    let { usernameOrEmail, password } = body;

    usernameOrEmail = usernameOrEmail.toLowerCase();

    try {
        const { Items } = await db.scan({
            TableName: 'conezoneuser-db',
            FilterExpression: ' username = :username OR email = :email',
            ExpressionAttributeValues: {
                ':username': usernameOrEmail,
                ':email': usernameOrEmail
            }
        });

        if (Items.length === 0) {
            return sendError(400, 'User not found');
        }

        const user = Items[0];

        const isValid = await comparePassword(password, user.password);

        if (!isValid) {
            return sendError(400, 'username or password is incorrect');
        }

        const token = await generateToken(user);

        return sendResponseWithHeaders(
            200,
            {
                success: true,
                message: 'User logged in successfully',
                data: {
                    UserID: user.UserID,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
            },
            token
        );

    }
    catch (err) {
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






