// tests/contacts.put.test.js
const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('PUT /api/contacts/:id', () => {
  let mongoServer;
  let token;
  let contactId;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Crée un utilisateur et récupère un token
    const resUser = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user@example.com',
        password: 'MotDePasse123!',
      });
    token = resUser.body.token;

    // Crée un contact pour les tests
    const resContact = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '0123456789',
      });
    contactId = resContact.body.contactId; // Assure-toi que ton contrôleur renvoie l'ID du contact créé
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('devrait mettre à jour un contact existant', async () => {
    const response = await request(app)
      .put(`/api/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jean-Modifié',
        lastName: 'Dupont-Modifié',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/modifié/i);
  });

  it('devrait retourner une erreur si le contact n\'existe pas', async () => {
    const fakeId = '507f1f77bcf86cd799439011'; // ID MongoDB fictif
    const response = await request(app)
      .put(`/api/contacts/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jean-Modifié',
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toMatch(/Aucun contact trouvé/i);
  });

  it('devrait retourner une erreur si le prénom est invalide', async () => {
    const response = await request(app)
      .put(`/api/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: '', // Prénom vide
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors.firstName).toMatch(/requis/i);
  });
});
