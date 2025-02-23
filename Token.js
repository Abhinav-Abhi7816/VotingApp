const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtVerify = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({ message: "Token not found!" });
            return;
        }
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.userPayload = decoded;

        next();
    }
    catch (err) {
        
        console.log(err)
        if(err.name==='TokenExpiredError')
        {
            res.status(500).json({error:"Token expired!"})
            return;
        }
        res.status(500).json({ error: "Internal Server error!" });
    }
}

const generateToken = function (payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 });
    return token;
}

module.exports = { jwtVerify, generateToken };