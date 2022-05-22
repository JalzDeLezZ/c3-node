require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  myApiKey: process.env.MY_API_KEY,
  jwtSecret: process.env.JWT_SECRET
}

module.exports = { config };
