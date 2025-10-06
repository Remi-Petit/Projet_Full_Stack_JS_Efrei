// models/contact.js
const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
  lat: { type: String },
  lng: { type: String },
}, { _id: false });

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  suite: { type: String },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  geo: { type: geoSchema },
}, { _id: false });

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  catchPhrase: { type: String },
  bs: { type: String },
}, { _id: false });

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true/*, unique: true*/ },
  address: { type: addressSchema, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  company: { type: companySchema },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
