require('dotenv').config();


const config = {
env: process.env.NODE_ENV || 'dev',
port: process.env.PORT || 3001,
dbUser: process.env.DB_USER,
dbPassword: process.env.DB_PASSWORD,
dbHost: process.env.DB_HOST,
dbName: process.env.DB_NAME,
dbPort: process.env.DB_PORT,
apiKey: process.env.API_KEY,
jwtSecret: process.env.JWT_SECRET,
email: process.env.EMAIL,
emailPassword: process.env.EMAIL_PASSWORD,
jwtRecuperacion: process.env.JWT_SECRET_RECOVERY,
jwtRefresh: process.env.JWT_SECRET_REFRESH

}

module.exports = { config }
