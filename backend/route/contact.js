// route/contactRoutes.js
const express = require('express');
const router = express.Router();
const { getAllContacts, getContact, postContact, putContact, deleteContact } = require('../controller/contact');

router.get('/', getAllContacts);

router.get('/:id', getContact);

router.post('/', postContact);

router.put('/:id', putContact);

router.delete('/:id', deleteContact);

module.exports = router;
