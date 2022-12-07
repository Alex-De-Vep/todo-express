const todoRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getTodoList, getTodo, createTodo } = require('../controllers/todo');

todoRoutes.get('/todo', getTodoList);

todoRoutes.get('/todo/:todoId', celebrate({
  params: Joi.object().keys({
    todoId: Joi.string().alphanum().length(24),
  }),
}), getTodo);

todoRoutes.post('/todo', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    description: Joi.string(),
  }),
}), createTodo);

module.exports = todoRoutes;
