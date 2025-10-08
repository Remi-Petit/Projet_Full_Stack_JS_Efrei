// route/contactRoutes.js
const express = require('express');
const router = express.Router();
const { contactValidationRules, validate } = require('../middleware/contactValidation');
const { getAllContacts, getContact, postContact, putContact, deleteContact } = require('../controller/contact');

router.get('/', getAllContacts);

router.get('/:id', getContact);

router.post('/', contactValidationRules, validate, postContact);

router.put('/:id', contactValidationRules, validate, putContact);

router.delete('/:id', deleteContact);

module.exports = router;
