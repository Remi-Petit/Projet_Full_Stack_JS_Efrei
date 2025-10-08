// controller/auth.js
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/config');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    // // 2. Crée un nouvel utilisateur (le mot de passe sera hashé automatiquement grâce au `pre('save')` dans le modèle)
    const newUser = new User({ email, password });
    await newUser.save();

    // // 3. Génère un token JWT pour l'utilisateur nouvellement inscrit
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // // 4. Renvoie le token et les infos de l'utilisateur (sans le mot de passe)
    res.status(201).json({
      message: 'Utilisateur créé avec succès !',
      token,
      user: { id: newUser._id, email: newUser.email },
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Vérifie si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // 2. Vérifie le mot de passe
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect : '+password });
    }

    // 3. Génère un token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 4. Renvoie le token
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email },
    });    

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};

module.exports = { register, login };
