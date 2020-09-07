const Card = require('../models/card');
const ValidationError = require('../errors/validation-err');
const OwnerError = require('../errors/owner-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
    //.catch((err) => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(next);
    // .catch((err) => {
    //   if (err.name === 'ValidationError') {
    //     res.status(400).send({ message: 'Невалидные данные' });
    //   } else {
    //     res.status(500).send({ message: 'На сервере произошла ошибка' });
    //   }
    // });
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
      // else if (err.name === 'CastError') {
      //   throw new NotFoundError('Карточка не найдена');
      // }
    })
    .catch((err) => {
      console.log(err.name);
      next(err);
    });
    // .catch((err) => {
    //   if (err.name === 'TypeError') {
    //     res.status(404).send({ message: 'Карточка не найдена' });
    //   } else {
    //     res.status(500).send({ message: 'На сервере произошла ошибка' });
    //   }
    // });
};
