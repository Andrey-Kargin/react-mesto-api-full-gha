require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const router = require('./routes');

const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validation');

const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

app.use(cors());
app.use(requestLogger);

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(router);

app.use(auth);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500 ? 'Ошибка сервера' : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
