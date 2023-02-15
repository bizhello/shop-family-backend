const mongoose = require('mongoose');
const { isEmail } = require('validator');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: { validator: isEmail, message: 'Invalid email.' },
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  firstName: {
    type: String,
    require: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  lastName: {
    type: String,
    require: true,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
});

module.exports.UserModel = model('user', userSchema);