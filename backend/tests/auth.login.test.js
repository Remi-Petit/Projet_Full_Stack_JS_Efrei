// tests/auth.login.test.js
const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('POST /api/auth/login', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Crée un utilisateur pour les tests de login
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'MotDePasse123!',
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('devrait permettre à un utilisateur de se connecter avec des identifiants valides', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'MotDePasse123!',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('devrait retourner une erreur si l\'email est invalide', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'email-invalide',
        password: 'MotDePasse123!',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/email valide/i);
  });

  it('devrait retourner une erreur si le mot de passe est incorrect', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'motdepasseincorrect',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toMatch(/Email ou mot de passe incorrect/i);
  });

  it('devrait retourner une erreur si l\'utilisateur n\'existe pas', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'utilisateur.inexistant@example.com',
        password: 'MotDePasse123!',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toMatch(/Email ou mot de passe incorrect/i);
  });
});
