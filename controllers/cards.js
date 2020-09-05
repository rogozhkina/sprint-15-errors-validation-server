const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Невалидные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.id)
    .populate('user')
    .then((card) => {
      if (card.owner._id != req.user._id) {
        res.status(403).send({ message: 'Нельзя удалять чужую карточку' });
        return;
      } if (card.owner._id == req.user._id) {
        card.remove();
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
