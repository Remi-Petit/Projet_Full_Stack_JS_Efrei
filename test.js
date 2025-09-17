require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connect();

// Route de test
app.get('/', (req, res) => {
  console.log('Test de route');
  res.send('Serveur et base de données prêts !');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://${process.env.HOST}:${PORT}`);
});
