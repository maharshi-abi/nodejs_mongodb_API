const jwt = require("jsonwebtoken");
const config = require('../config');

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        res.status(403).json({ message: "A token is required for authentication", data: [], status: 'error' })
    }
    try {
        const decoded = jwt.verify(token, config.JWTSecret);        
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token", data: [], status: 'error' })
    }
    return next();
};

module.exports = verifyToken;