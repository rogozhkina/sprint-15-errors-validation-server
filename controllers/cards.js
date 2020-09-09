const Card = require('../models/card');
const OwnerError = require('../errors/owner-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .populate('user')
    .then((card) => {
      if (card.owner._id == req.user._id) {
        card.remove();
        res.send({ data: card });
      } else if (card.owner._id != req.user._id) {
        throw new OwnerError('Нельзя удалять чужую карточку');
      }
    })
    .catch((err) => {
      next(err);
    });
};
