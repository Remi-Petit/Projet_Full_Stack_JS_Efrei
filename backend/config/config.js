// config/config.js
require('dotenv').config({ path: './../.env' });

module.exports = {
  NODE_ENV: process.env.VITE_ENV_MODE || 'development',
  HOST: process.env.VITE_HOST_API || 'localhost',
  PORT: process.env.VITE_PORT_API || 3000,
  PROTOCOL: process.env.VITE_PROTOCOL_API || 'http',
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  FRONTEND_URL: process.env.FRONTEND_URL || process.env.VITE_PROTOCOL+'://'+process.env.VITE_HOST+':'+process.env.VITE_PORT,
};