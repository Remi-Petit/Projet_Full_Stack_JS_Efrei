// swagger/contact.swagger.js
const contactSwagger = {
  '/api/contacts': {
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
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string' },
                    address: {
                      type: 'object',
                      properties: {
                        street: { type: 'string' },
                        suite: { type: 'string' },
                        city: { type: 'string' },
                        zipcode: { type: 'string' },
                        geo: {
                          type: 'object',
                          properties: {
                            lat: { type: 'string' },
                            lng: { type: 'string' }
                          }
                        }
                      }
                    },
                    phone: { type: 'string' },
                    website: { type: 'string' },
                    company: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        catchPhrase: { type: 'string' },
                        bs: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        401: { description: 'Non autorisé (token manquant ou invalide)' }
      }
    },
    post: {
      tags: ['Contacts'],
      summary: 'Ajoute un nouveau contact',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstName: { type: 'string', example: 'Jean' },
                lastName: { type: 'string', example: 'Dupont' },
                email: { type: 'string', example: 'jean.dupont@example.com' },
                address: {
                  type: 'object',
                  properties: {
                    street: { type: 'string', example: '12 rue de Paris' },
                    suite: { type: 'string', example: 'Apt 3' },
                    city: { type: 'string', example: 'Paris' },
                    zipcode: { type: 'string', example: '75001' },
                    geo: {
                      type: 'object',
                      properties: {
                        lat: { type: 'string', example: '48.8566' },
                        lng: { type: 'string', example: '2.3522' }
                      }
                    }
                  }
                },
                phone: { type: 'string', example: '0601020304' },
                website: { type: 'string', example: 'www.jeandupont.fr' },
                company: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Dupont SARL' },
                    catchPhrase: { type: 'string', example: 'Toujours plus haut' },
                    bs: { type: 'string', example: 'business solutions' }
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Contact ajouté' },
        400: { description: 'Conflit : email ou téléphone déjà utilisé' },
        500: { description: 'Erreur serveur' }
      }
    }
  },
  '/api/contacts/{id}': {
    put: {
      tags: ['Contacts'],
      summary: 'Modifie un contact par son ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                address: { type: 'object' },
                phone: { type: 'string' },
                website: { type: 'string' },
                company: { type: 'object' }
              }
            }
          }
        }
      },
      responses: {
        200: { description: 'Le contact a bien été modifié' },
        404: { description: 'Aucun contact trouvé avec cet ID' },
        500: { description: 'Erreur serveur' }
      }
    },
    delete: {
      tags: ['Contacts'],
      summary: 'Supprime un contact par son ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Le contact a correctement été supprimé' },
        404: { description: 'Aucun contact trouvé avec cet ID' },
        500: { description: 'Erreur serveur' }
      }
    }
  }
};

module.exports = contactSwagger;