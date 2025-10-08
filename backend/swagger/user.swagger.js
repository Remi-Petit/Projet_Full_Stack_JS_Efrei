const userSwagger = {
  '/api/users': {
    get: {
      tags: ['Users'],
      summary: 'Récupère la liste des utilisateurs (nécessite un token)',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Liste des utilisateurs',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    email: { type: 'string' }
                    // Ajoute d'autres propriétés selon ton modèle User
                  }
                }
              }
            }
          }
        },
        401: { description: 'Non autorisé (token manquant ou invalide)' },
        404: { description: 'Aucun utilisateur trouvé.' }
      }
    }
  }
};

module.exports = userSwagger;