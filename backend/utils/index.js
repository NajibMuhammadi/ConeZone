const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}

const generateToken = async (user) => {
    const payLoad ={
        UserId : user.UserID,
        isAdmin: user.isAdmin
        
    }

    const token = jwt.sign(payLoad, process.env.SECRET_ACCESS_KEY, {expiresIn: '1h'});

    return token;
}


module.exports = { hashPassword, comparePassword, generateToken };


/* 
    * Författare: Najib
    * Funktioner för att hasha lösenord, jämföra lösenord och generera token
 */