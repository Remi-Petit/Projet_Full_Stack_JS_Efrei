// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { getAllContacts, getContact, postContact, putContact, deleteContact } = require('../controller/contact');

// Route pour récupérer tous les utilisateurs
/**
 * @openapi
 * /contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: Récupère la liste des contacts (nécessite un token)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 */
router.get('/', getAllContacts);

router.get('/:id', getContact);

router.post('/', postContact);

router.put('/:id', putContact);

router.delete('/:id', deleteContact);

module.exports = router;
