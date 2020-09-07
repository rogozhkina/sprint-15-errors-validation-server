const router = require('express').Router();
const auth = require('../middlewares/auth');
const { celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  getUsers,
  getUserById,
  login,
  createUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.post('/signin', login);
router.post('/signup', celebrate ({body: Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().required().min(2).max(30),
  avatar: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  }) , createUser);

module.exports = router;
