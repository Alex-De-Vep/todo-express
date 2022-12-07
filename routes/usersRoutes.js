const usersRoutes = require('express').Router();
const { getUsers } = require('../controllers/users');

usersRoutes.get('/users/:userId', getUsers);

module.exports = usersRoutes;
