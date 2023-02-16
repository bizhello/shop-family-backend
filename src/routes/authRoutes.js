const express = require('express');

const { createUser, login, logout, refreshToken } = require('../controllers/authControllers');
const { createUserValidation } = require('../../utils/validation');
const { loginValidation } = require('../../utils/validation');

const authRoutes = express.Router();

authRoutes.post('/signup', createUserValidation, createUser);
authRoutes.post('/signin', loginValidation, login);
authRoutes.post('/logout', logout);
authRoutes.get('/refresh', refreshToken);

module.exports = {
  authRoutes,
};