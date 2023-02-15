const express = require('express');

const { createCardValidation, idCardValidation } = require('../../utils/validation');

const { getCards, postCard, deleteCard, getCardById } = require('../controller/cardControllers');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCardValidation, postCard);
cardRoutes.delete('/:cardId', idCardValidation, deleteCard);
cardRoutes.get('/:cardId', idCardValidation, getCardById);

module.exports = {
  cardRoutes,
};