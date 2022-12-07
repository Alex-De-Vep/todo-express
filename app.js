const express = require('express');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes');
const todoRoutes = require('./routes/todoRoutes');
const auth = require('./middlewares/auth');
const { login, register } = require('./controllers/auth');
const { errors } = require("celebrate");
const rateLimit = require('express-rate-limit');

mongoose.connect('mongodb://localhost:27017/todo_database');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.post('/signup', register);
app.post('/signin', login);

app.use(auth);

app.use('/', usersRoutes);
app.use('/', todoRoutes);

app.get('/', (req, res) => {
  res.status(404).send('page not found');
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(3000, () => {
  console.log('server started');
});
