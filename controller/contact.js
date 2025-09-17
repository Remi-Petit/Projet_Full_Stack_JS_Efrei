// controller/contact.js
const Contact = require('../model/contact');

const getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find({});
      if (!contacts.length) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
      }
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur serveur lors de la récupération des utilisateurs.',
        error: error.message,
      });
    }
  };

module.exports = {
  getAllContacts,
};
