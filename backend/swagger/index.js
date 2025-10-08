const contactSwagger = require('./contact.swagger');
const authSwagger = require('./auth.swagger');
const userSwagger = require('./user.swagger');

const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0'
  },
  paths: {
    ...authSwagger,
    ...contactSwagger,
    ...userSwagger,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

module.exports = swaggerDocs;