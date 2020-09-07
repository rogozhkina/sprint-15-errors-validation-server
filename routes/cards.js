const router = require('express').Router();
const auth = require('../middlewares/auth');
const { celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  getCards, createCard, deleteCardById
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, celebrate ({body: Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  link: Joi.string().required().link(),
  }) , createCard);
router.delete('/:id', auth, deleteCardById);

module.exports = router;
