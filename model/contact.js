// models/contact.js
const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
}, { _id: false });

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  suite: { type: String },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  geo: { type: geoSchema, required: true },
}, { _id: false });

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  catchPhrase: { type: String },
  bs: { type: String },
}, { _id: false });

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: { type: addressSchema, required: true },
  phone: { type: String },
  website: { type: String },
  company: { type: companySchema },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
