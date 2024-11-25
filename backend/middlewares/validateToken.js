const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = () => ({
    before: (handler) => {
        try {
            const authorizationHeader = handler.event.headers.authorization;

            if (!authorizationHeader) {
                throw new Error('Authorization header is missing');
            }

            const token = authorizationHeader.split(' ')[1];

            if (!token) {
                throw new Error('Token is missing in Authorization header');
            }

            const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_KEY);

            if (!decodedToken) {
                throw new Error('Invalid token');
            }

            handler.context.isAdmin = decodedToken.isAdmin; 
            // för att detta ska fungera måste vi ta emot context i vår handler på nästa sida.

        } catch (err) {
            throw new Error(`Token validation error: ${err.message}`);
        }
    },
});

module.exports = { validateToken };
