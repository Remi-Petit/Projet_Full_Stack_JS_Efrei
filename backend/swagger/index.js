// swagger/index.js
const { HOST, PORT } = require('../config/config');
const contactSwagger = require('./contact.swagger');
const authSwagger = require('./auth.swagger');

const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation de l\'API pour gérer les contacts et les utilisateurs.'
  },
  servers: [
    {
      url: `http://${HOST}:${PORT}`,
      description: 'Serveur local'
    }
  ],
  paths: {
    ...authSwagger,
    ...contactSwagger,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Entrez votre token JWT dans le format : Bearer <token>'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

module.exports = swaggerDocs;
