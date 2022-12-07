const User = require('../models/user');
const { ValidationError, NotFoundError } = require("../utils/errors");

const getUsers = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ email: user.email, _id: user._id }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next(err);
    });
};

module.exports = {
  getUsers,
};
