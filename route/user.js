// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controller/user');

// Route pour récupérer tous les utilisateurs
router.get('/', getAllUsers);

module.exports = router;
