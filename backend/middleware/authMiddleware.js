require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: 'Access denied'
            });
        }

        const token =
            authHeader.split(' ')[1];

        const decoded =
            jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch (err) {
        return res.status(401).json({message: 'Invalid token'});
    }
};

module.exports = authenticateToken;