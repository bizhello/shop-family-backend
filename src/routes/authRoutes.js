const express = require('express');

const authRoutes = express.Router();
// const {
//   createUser, login, signout,
// } = require('../controller/authControllers');

const { createUser, login } = require('../controllers/authControllers');


const { createUserValidation } = require('../../utils/validation');
const { loginValidation } = require('../../utils/validation');

authRoutes.post('/signup', createUserValidation, createUser);
authRoutes.post('/signin', loginValidation, login);
// authRoutes.get('/signout', signout);

module.exports = {
  authRoutes,
};