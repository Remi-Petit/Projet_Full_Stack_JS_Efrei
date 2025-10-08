// models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'Le prénom est requis.'] },
  lastName: { type: String, required: [true, 'Le nom est requis.'] },
  email: { type: String, match: [/.+@.+\..+/, 'Email invalide.'] },
  phone: { type: String, required: [true, 'Le téléphone est requis.'], minlength: [10, 'Numéro trop court'], maxlength: [20, 'Numéro trop long'] },
  website: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    zipcode: { type: String },
  },
  company: {
    name: { type: String },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);