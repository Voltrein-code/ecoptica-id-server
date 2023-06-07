const router = require('express').Router();

const {
  getUsers, getCurrentUser, getUserById, updateUser, changePassword,
} = require('../controllers/users');
const { updateUserValidation, userIdValidation, changePasswordValidation } = require('../midllewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidation, getUserById);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/password', changePasswordValidation, changePassword);

module.exports = router;
