// db/connect.js
const { MONGODB_URI } = require('../config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

async function connect() {
    // Connexion à MongoDB
    await mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅'))
    .catch(err => console.error('❌', err));
}

module.exports = { connect };