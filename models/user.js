const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      res.status(401).send({ message: 'Неправильные почта или пароль' });
    }

    return bcrypt
      .compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          res.status(401).send({ message: 'Неправильные почта или пароль' });
        }

        //return user; // теперь user доступен
        res.status(201).send({ _id: user._id });
      })
      .catch((err) => {
        res.status(401).send({ message: err.message });
      });
  });
};

module.exports = mongoose.model('user', userSchema);
