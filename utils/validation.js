const { celebrate, Joi } = require("celebrate");
const { regexUrl } = require("./regexs");

const createCardValidation = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(3).max(40).required(),
    dateFrom: Joi.number().integer().required(),
    dateTo: Joi.number().integer().required(),
    count: Joi.number().integer().min(0).max(1000).required(),
    url: Joi.string().required().regex(regexUrl),
  }),
});

const putCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
  body: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
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
    remember: Joi.boolean().required(),
  }),
});

module.exports = {
  putCardValidation,
  createCardValidation,
  idCardValidation,
  idUserValidation,
  createUserValidation,
  loginValidation,
};
