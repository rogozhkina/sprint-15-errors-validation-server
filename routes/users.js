const router = require('express').Router();
const {
  getUsers,
  getUserById,
  login,
  createUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
//router.post('/signin', login);
//router.post('/', createUser);

module.exports = router;
