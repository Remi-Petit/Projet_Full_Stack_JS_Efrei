// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth');


/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Connexion d'un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: bernard.martin@example.com
 *               password:
 *                 type: string
 *                 example: B3rn@rd2025
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Email ou mot de passe incorrect
 */
router.post('/login', login);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Inscription d'un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: nouvel.utilisateur@example.com
 *               password:
 *                 type: string
 *                 example: MotDePasse123!
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Email déjà utilisé ou mot de passe invalide
 */
router.post('/register', register);

module.exports = router;
