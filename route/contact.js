// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { getAllContacts } = require('../controller/contact');

// Route pour récupérer tous les utilisateurs
router.get('/', getAllContacts);

module.exports = router;
