require('dotenv').config()

module.exports = {
    port: process.env.SERVER_PORT,
    mongoUrL: process.env.MONGODB_URL,
    JWTSecret: process.env.JWT_SECRET,
    JWTExpireIn: process.env.JWT_EXPIRE_IN,    
}