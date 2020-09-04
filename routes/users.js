const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  login,
  createUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
