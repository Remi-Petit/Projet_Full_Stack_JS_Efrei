const contactSwagger = {
  '/contacts': {
    get: {
      tags: ['Contacts'],
      summary: 'Récupère la liste des contacts (nécessite un token)',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Liste des contacts',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' }
                  }
                }
              }
            }
          }
        },
        401: { description: 'Non autorisé (token manquant ou invalide)' }
      }
    }
  }
  // Ajoute les autres routes ici...
};

module.exports = contactSwagger;