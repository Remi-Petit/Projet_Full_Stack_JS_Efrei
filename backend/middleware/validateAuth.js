const { body, validationResult } = require('express-validator');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

exports.validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Veuillez fournir un email valide.'),
  body('password')
    .matches(passwordRegex)
    .withMessage('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map(err => err.msg);
      return res.status(400).json({ message: messages.join(' ') });
    }
    next();
  },
];

exports.validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('L’email est requis.')
    .isEmail()
    .withMessage('Veuillez fournir un email valide.'),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map(err => err.msg);
      return res.status(400).json({ message: messages.join(' ') });
    }
    next();
  },
];
