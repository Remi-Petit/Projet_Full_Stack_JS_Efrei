// app.js
const express = require('express');
const cors = require('cors');
const { connect } = require('./db/connect');
const { HOST, PORT, FRONTEND_URL } = require('./config/config');
const contactRoutes = require('./route/contact');
const userRoutes = require('./route/user');
const authRoutes = require('./route/auth');
const { protect } = require('./middleware/authMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const app = express();

// 🧩 Configuration CORS
const allowedOrigins = [FRONTEND_URL];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // si tu envoies des cookies ou un header Authorization
}));

app.use(express.json());

// Connexion à MongoDB
connect();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', protect, contactRoutes);
app.use('/api/users', protect, userRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://${HOST}:${PORT}`);
});

