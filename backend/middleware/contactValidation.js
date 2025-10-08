const { body, validationResult } = require('express-validator');

const forbiddenChars = /["'`<>]/;
const phoneRegex = /^[0-9]{10,20}$/; // Entre 10 et 20 chiffres
const websiteRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// Règles de validation
const contactValidationRules = [
  // Prénom
  body('firstName')
    .notEmpty().withMessage('Le prénom est requis.')
    .isLength({ max: 50 }).withMessage('Le prénom ne doit pas dépasser 50 caractères.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le prénom.')
    .trim()
    .escape(),

  // Nom
  body('lastName')
    .notEmpty().withMessage('Le nom est requis.')
    .isLength({ max: 50 }).withMessage('Le nom ne doit pas dépasser 50 caractères.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le nom.')
    .trim()
    .escape(),

  // Email (optionnel mais validé si présent)
  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('L’email doit être valide (ex: utilisateur@domaine.fr).')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans l’email.')
    .trim()
    .normalizeEmail(),

  // Téléphone (10 à 20 chiffres obligatoires)
  body('phone')
    .notEmpty().withMessage('Le téléphone est requis.')
    .bail() // Arrête si le champ est vide
    .isLength({ min: 10, max: 20 }).withMessage('Le numéro de téléphone doit contenir entre 10 et 20 chiffres.')
    .bail() // Arrête si la longueur est invalide
    .matches(phoneRegex).withMessage('Le numéro de téléphone ne doit contenir que des chiffres.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le téléphone.')
    .trim(),

  // Adresse (optionnelle)
  body('address.street')
    .optional({ checkFalsy: true })
    .isLength({ max: 100 }).withMessage('L’adresse ne doit pas dépasser 100 caractères.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans la rue.')
    .trim()
    .escape(),

  body('address.city')
    .optional({ checkFalsy: true })
    .isLength({ max: 50 }).withMessage('La ville ne doit pas dépasser 50 caractères.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans la ville.')
    .trim()
    .escape(),

  body('address.zipcode')
    .optional({ checkFalsy: true })
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le code postal.')
    .trim(),

  // Site web (optionnel mais validé si présent)
  body('website')
    .optional({ checkFalsy: true })
    .matches(websiteRegex).withMessage('Le site web doit commencer par http:// ou https:// et être une URL valide.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le site web.')
    .trim(),

  // Société (optionnelle)
  body('company.name')
    .optional({ checkFalsy: true })
    .isLength({ max: 100 }).withMessage('Le nom de l’entreprise ne doit pas dépasser 100 caractères.')
    .custom(value => !forbiddenChars.test(value)).withMessage('Caractères interdits dans le nom de l’entreprise.')
    .trim()
    .escape(),
];

// Middleware de gestion des erreurs
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = {};
    errors.array().forEach(err => {
      extractedErrors[err.path] = err.msg;
    });
    return res.status(400).json({ errors: extractedErrors });
  }
  next();
};

module.exports = {
  contactValidationRules,
  validate
};
