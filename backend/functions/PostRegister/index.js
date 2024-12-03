const {db} = require('../../services/index.js')
const {sendResponse, sendError } = require('../../responses/index')
const {v4: uuid} = require('uuid'); 
const middy = require('@middy/core');
const { errorHandler } = require('../../middlewares/errorHandler.js');
const { validateRegister } = require('../../middlewares/validateRegister.js');
const { hashPassword } = require('../../utils/index.js');
const { validateKey } = require('../../middlewares/validateKey.js');

const isAdmin = false;

const registerUser = async (event) => {

   const body = JSON.parse(event.body);
   let {username, email, password, confirmPassword} = body;

    username = username.toLowerCase();
    email = email.toLowerCase();

    if(password !== confirmPassword){
        return sendError(400, 'Passwords do not match');
    }

    const hashedPassword = await hashPassword(password);

    const id = uuid().substring(0, 8);
    const createdAt = new Date().toLocaleString('sv-SE', {timeZone: 'Europe/Stockholm'});

    try{
        const {Items} = await db.scan({
            TableName: 'conezoneuser-db',
            FilterExpression: 'username = :username OR email = :email',
            ExpressionAttributeValues: {
                ':username': username,
                ':email': email
            }
        });

        if(Items.length > 0){
            return sendError(400, 'User already exists');
        }

        await db.put({
            TableName: 'conezoneuser-db',
            Item: {
                UserID: id,
                username: username,
                email: email,
                password: hashedPassword,
                createdAt: createdAt,
                isAdmin: isAdmin
            }
        });

        return sendResponse(200, {
            body:{
              success: true,
              message: 'User registered successfully',
              data: {
                UserID: id,
                username: username,
                email: email,
                createdAt: createdAt,
              }
            },
          });
    } catch(err){
        return sendError(500, err);
    }
}

exports.handler = middy(registerUser)
    .use(validateKey())
    .use(validateRegister())
    .use(errorHandler());

/* 
    * Författare: Najib
    * Funktion som används för att registrera en användare i databasen
 */