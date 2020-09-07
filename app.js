require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(limiter);
app.use(cookieParser());
app.use(helmet());

app.use(requestLogger);
//app.use(logger);

// удалить после ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// за ним идут все обработчики роутов
// app.post('/signup', createUser);
// app.post('/signin', login);
// app.use('/users', usersRouter);
// app.post('/posts', postsRouter);

app.use('/cards', cards);
app.use('/users', users);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError') {
    res.status('400').send({ message: 'Невалидные данные' });
  // } else if (err.name === 'CastError') {
  //   res.status('404').send({ message: 'Запрашиваемый ресурс не найден' });
  } else if (err.name === 'CastError') {
    res.status('404').send({ message: 'Запрашиваемый ресурс не найден' });
  } else if (err.name === 'MongoError') {
    res.status('409').send({ message: 'Такой пользователь уже существует' });
  } else {
    //res.status('500').send({ message: 'На сервере произошла ошибка' });
    console.log(err.name);
    res.status('500').send({ message: err.message });
  }
});

// app.use((req, res) => {
//   res.status('404').send({ message: 'Запрашиваемый ресурс не найден' });
// });

// app.use((err, req, res, next) => {
//   // если у ошибки нет статуса, выставляем 500
//   const { statusCode = 500, message } = err;

//   res
//     .status(statusCode)
//     .send({
//       // проверяем статус и выставляем сообщение в зависимости от него
//       message: statusCode === 500
//         ? 'На сервере произошла ошибка'
//         : message
//     });
// });

// app.use((err, req, res, next) => {
//   res.status(err.statusCode).send({ message: err.message });
// });

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
