const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(req.headers);
    return res.status(401).send({ message: 'Необходима авторизация_Не авторизован' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '12345678');
    console.log('payload');
  } catch (err) {
    console.log('err');
    return res.status(401).send({ message: 'Необходима авторизация2' });
  }

  req.user = payload;

  next();
};
