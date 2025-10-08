// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth');
const { validateRegister, validateLogin } = require('../middleware/validateAuth');

router.post('/login', validateLogin, login);

router.post('/register', validateRegister, register);

module.exports = router;
