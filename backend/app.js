// app.js
const express = require('express');
const cors = require('cors');
const { connect } = require('./db/connect');
const { HOST, PORT, FRONTEND_URL } = require('./config/config');
const contactRoutes = require('./route/contact');
const authRoutes = require('./route/auth');
const { protect } = require('./middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const app = express();

const allowedOrigins = [FRONTEND_URL];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Connexion à MongoDB
connect();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', protect, contactRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Exporte l'application pour les tests
module.exports = app;

// Démarre le serveur uniquement si le script est exécuté directement
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://${HOST}:${PORT}`);
  });
}

