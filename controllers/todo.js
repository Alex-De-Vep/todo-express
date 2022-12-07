const TodoItem = require('../models/todo_item');
const { NotFoundError, ValidationError } = require("../utils/errors");

const getTodoList = (req, res, next) => {
  TodoItem.find()
    .then((data) => res.send({ data }))
    .catch(next);
};

const getTodo = (req, res, next) => {
  TodoItem.findById(req.params.todoId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая todo не найдена');
    })
    .then((todo) => {
      res.send({ todo });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next(err);
    });
};

const createTodo = (req, res, next) => {
  const { name, description } = req.body;

  TodoItem.create({ name, description, owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next(err);
    });
};

module.exports = {
  getTodoList,
  getTodo,
  createTodo,
};
