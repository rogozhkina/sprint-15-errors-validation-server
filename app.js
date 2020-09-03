require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcryptjs');
const escape = require('escape-html');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(limiter);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5f3c0bbc2995e0947dda7a0f',
//   };
//   next();
// });

app.post('/signin', login);
app.post('/signup', createUser);

//app.use('/cards', cards);
app.use('/users', users);
app.use('/cards', require('./routes/cards'));
app.post('/cards', auth, createCard);

app.use(helmet());
app.use(auth);

app.use((req, res) => {
  res.status('404').send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
