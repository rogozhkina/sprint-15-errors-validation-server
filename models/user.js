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
      }
    }
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      // validator: (email) => isEmail(email),
      // message: 'Неверный формат почты'
      }
    }
  },
  password: {
    type: String,
    required: true,
    //minlength: 8
  }
});

module.exports = mongoose.model('user', userSchema);
