// controller/user.js
const User = require('../model/user');

const register = async (req, res) => {
    
}

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      if (!users.length) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des utilisateurs.',
        error: error.message,
      });
    }
  };

module.exports = {
    getAllUsers,
};