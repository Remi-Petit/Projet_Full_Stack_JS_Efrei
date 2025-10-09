// tests/auth.register.test.js
const request = require('supertest');
const app = require('../app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('POST /api/auth/register', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('devrait créer un nouvel utilisateur avec un mot de passe valide', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'MotDePasse123!',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
  });

  it('devrait retourner une erreur si l\'email est invalide', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'email-invalide',
        password: 'MotDePasse123!',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/email valide/i);
  });

  it('devrait retourner une erreur si le mot de passe est trop faible', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'motdepasse',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/8 caractères.*majuscule.*minuscule.*chiffre.*caractère spécial/i);
  });

  it('devrait retourner une erreur si le mot de passe contient des caractères interdits', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'MotDePasse123"',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/caractères interdits/i);
  });

  it('devrait retourner une erreur si l\'email existe déjà', async () => {
    // Crée un utilisateur
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'MotDePasse123!',
      });

    // Essaie de créer le même utilisateur
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'MotDePasse123!',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/existe déjà/i);
  });
});
