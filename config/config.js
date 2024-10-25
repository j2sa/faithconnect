require('dotenv').config();

const config = {
  port: 3000,
  mongoUri: process.env.MONGO_URI,
};

module.exports = config;