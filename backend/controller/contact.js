// controller/contact.js
const Contact = require('../model/contact');

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    if (!contacts.length) {
      return res.status(404).json({ message: 'Aucun contact trouvé.' });
    }
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération des contacts.',
      error: error.message,
    });
  }
};

const postContact = async (req, res) => {
  try {
    const { firstName, lastName, email, address, phone, website, company } = req.body;

    const conflicts = [
      // { field: 'email', value: email, message: 'Un contact avec cet email existe déjà.' },
      { field: 'phone', value: phone, message: 'Un contact avec ce numéro de téléphone existe déjà.' }
    ];

    for (const { field, value, message } of conflicts) {
      const existingContact = await Contact.findOne({ [field]: value, user: req.user.id });
      if (existingContact) {
        return res.status(400).json({ message });
      }
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      address,
      phone,
      website,
      company,
      user: req.user.id
    });
    await newContact.save();

    res.status(200).json({
      message: 'Contact ajouté',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération des données contact.',
    });
  }
};

const putContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, address, phone, website, company } = req.body;

    const contact = await Contact.findOne({ _id: id, user: req.user.id });
    if (!contact) {
      return res.status(404).json({
        message: 'Aucun contact trouvé avec cet ID.',
      });
    }

    if (firstName) contact.firstName = firstName;
    if (lastName) contact.lastName = lastName;
    if (email) contact.email = email;
    if (address) contact.address = address;
    if (phone) contact.phone = phone;
    if (website) contact.website = website;
    if (company) contact.company = company;

    await contact.save();

    res.status(200).json({
      message: "Le contact a bien été modifié",
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur serveur lors de la modification du contact.',
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOneAndDelete({ _id: id, user: req.user.id });
    if (!contact) {
      return res.status(404).json({
        message: 'Aucun contact trouvé avec cet ID.',
      });
    }

    res.status(200).json({
      message: 'Le contact a correctement été supprimé',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur serveur lors de la suppression du contact.',
    });
  }
};

module.exports = {
  getAllContacts,
  postContact,
  putContact,
  deleteContact,
};