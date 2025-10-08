// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controller/user');

router.get('/', getAllUsers);

module.exports = router;
