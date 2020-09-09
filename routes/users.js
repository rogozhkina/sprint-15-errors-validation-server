const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const auth = require('../middlewares/auth');
const ValidationError = require('../errors/validation-err');

const {
  getUsers,
  getUserById,
  login,
  createUser,
} = require('../controllers/users');

const validatorURL = (link) => {
  if (!validator.isURL(link)) {
    throw new ValidationError('Невалидные данные');
  }
  return link;
};

router.get('/', auth, getUsers);

router.get('/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId().required(),
  }),
}), getUserById);

router.post('/signin', login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validatorURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

module.exports = router;
