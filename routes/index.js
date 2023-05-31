const router = require('express').Router();
const { login } = require('../controllers/users');
const auth = require('../midllewares/auth');

const { signInValidation, signUpValidation,  }

router.post('/signin', signInValidation, login);
