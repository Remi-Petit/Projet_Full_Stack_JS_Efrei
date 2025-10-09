// db/connect.js
const { MONGODB_URI, NODE_ENV } = require('../config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

async function connect() {
    if (NODE_ENV === 'test') {
        console.log('Mode test détecté, connexion à la base de données de test ignorée.');
        return;
    }

    // Connexion à MongoDB
    await mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connect DB : ✅'))
    .catch(err => console.error('Connect DB : ❌', err));
}

module.exports = { connect };