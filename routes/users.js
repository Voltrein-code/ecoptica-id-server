const router = require('express').Router();

const {
  getUsers, getCurrentUser, getUserById, updateUser,
} = require('../controllers/users');
const { updateUserValidation, userIdValidation } = require('../midllewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidation, getUserById);
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
