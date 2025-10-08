// middleware/contactValidation.js
const { body, validationResult } = require('express-validator');

const forbiddenChars = /["'`<>]/;

const contactValidationRules = [
  // Prénom
  body('firstName')
    .notEmpty().withMessage('Le prénom est requis.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le prénom.'),
  
  // Nom
  body('lastName')
    .notEmpty().withMessage('Le nom est requis.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le nom.'),
  
  // Email (optionnel)
  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('Email invalide.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans l’email.'),
  
  // Téléphone
  body('phone')
    .notEmpty().withMessage('Le téléphone est requis.')
    .matches(/^[0-9+\- ]+$/).withMessage('Numéro invalide.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le téléphone.'),

  // Adresse (optionnelle)
  body('address.street')
    .optional({ checkFalsy: true })
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans la rue.'),
  body('address.city')
    .optional({ checkFalsy: true })
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans la ville.'),
  body('address.zipcode')
    .optional({ checkFalsy: true })
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le code postal.'),

  // Site web (optionnel)
  body('website')
    .optional({ checkFalsy: true })
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le site web.'),

  // Société (optionnelle)
  body('company.name')
    .optional({ checkFalsy: true })
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le nom de l’entreprise.'),

  // Middleware pour retourner les erreurs
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Retourner un objet { field: message } plutôt qu'un texte unique
      const extractedErrors = {};
      errors.array().forEach(err => {
        extractedErrors[err.param] = err.msg;
      });
      return res.status(400).json({ errors: extractedErrors });
    }
    next();
  }
];

module.exports = { contactValidationRules };
