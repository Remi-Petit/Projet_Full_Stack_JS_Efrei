// tests/contacts.get.test.js
const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('GET /api/contacts', () => {
  let mongoServer;
  let token;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Crée un utilisateur et récupère un token
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user@example.com',
        password: 'MotDePasse123!',
      });
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('devrait retourner une liste vide de contacts pour un nouvel utilisateur', async () => {
    const response = await request(app)
      .get('/api/contacts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toMatch(/Aucun contact trouvé/i);
  });

  it('devrait retourner 401 si le token est manquant ou invalide', async () => {
    const response = await request(app)
      .get('/api/contacts')
      .set('Authorization', 'Bearer invalidtoken');

    expect(response.statusCode).toBe(401);
  });
});
