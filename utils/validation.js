const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('./regexs');

// const updateUserValidation = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email()
//       .message({
//         'string.required': 'Поле e-mail обязательно для заполнения',
//       }),
//     name: Joi.string().required().min(2).max(30)
//       .message({
//         'string.required': 'Поле с именем обязательно для заполнения',
//         'string.min': 'Имя не может быть меньше двух символов',
//         'string.max': 'Имя не должно превышать 30 символов',
//       }),
//   }),
// });

const createCardValidation = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(3).max(40).required(),
    dateFrom: Joi.number().integer().required(),
    dateTo: Joi.number().integer().required(),
    count: Joi.number().integer().min(0).max(1000).required(),
    url: Joi.string().required().regex(regexUrl),
  }),
});

const idCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const idUserValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
//   updateUserValidation,
  createCardValidation,
  idCardValidation,
  idUserValidation,
  createUserValidation,
  loginValidation,
};