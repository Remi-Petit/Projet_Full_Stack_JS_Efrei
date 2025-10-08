// models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true, minlength: 10, maxlength: 20 },
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