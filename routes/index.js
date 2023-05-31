const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../midllewares/auth');
const errorRouter = require('./error');

const {
  signInValidation,
  signUpValidation,
  routesWithAuthValidation,
} = require('../midllewares/validation');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

router.use('/users', routesWithAuthValidation, auth, require('./users'));

router.use('/', errorRouter);

module.exports = router;
