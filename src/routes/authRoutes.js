const express = require('express');

const { createUser, login, logout } = require('../controllers/authControllers');
const { createUserValidation } = require('../../utils/validation');
const { loginValidation } = require('../../utils/validation');

const authRoutes = express.Router();

authRoutes.post('/signup', createUserValidation, createUser);
authRoutes.post('/signin', loginValidation, login);
authRoutes.post('/logout', logout);

module.exports = {
  authRoutes,
};