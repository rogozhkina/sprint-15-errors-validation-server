const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/validation-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { JWT_SECRET = 'secret-key' } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(req.headers);
    throw new AuthorizationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log('payload');
  } catch (err) {
    console.log(err.name);
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
