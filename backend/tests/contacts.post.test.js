// tests/contacts.post.test.js
const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('POST /api/contacts', () => {
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

  it('devrait créer un nouveau contact avec des données valides', async () => {
    const response = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '0123456789',
        email: 'jean.dupont@example.com',
        address: {
          street: '123 Rue de Paris',
          city: 'Paris',
          zipcode: '75000',
        },
        website: 'https://example.com',
        company: {
          name: 'Exemple Inc.',
        },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/Contact ajouté/i);
  });

  it('devrait retourner une erreur si le prénom est manquant', async () => {
    const response = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        lastName: 'Dupont',
        phone: '0123456789',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors.firstName).toMatch(/requis/i);
  });

  it('devrait retourner une erreur si le téléphone est invalide', async () => {
    const response = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '123', // Trop court
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors.phone).toMatch(/10.*20.*chiffres/i);
  });

  it('devrait retourner une erreur si le téléphone existe déjà', async () => {
    // Crée un premier contact
    await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '0123456789',
      });

    // Essaie de créer un deuxième contact avec le même téléphone
    const response = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Marie',
        lastName: 'Martin',
        phone: '0123456789',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/numéro de téléphone existe déjà/i);
  });
});
