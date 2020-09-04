const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards, createCard, deleteCardById
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, createCard);
router.delete('/:id', auth, deleteCardById);

module.exports = router;
