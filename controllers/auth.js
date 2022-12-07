const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const register = (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash }))
    .then((user) => res.send({ _id: user._id, email: user.email }))
    .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "dev-secret", { expiresIn: "30d" }) });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  register,
  login,
};
