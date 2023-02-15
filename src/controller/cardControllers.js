const { Card } = require('../models/cardModels');
const { NotFoundError } = require('../../utils/errors/NotFoundError');
const { BadRequestError } = require('../../utils/errors/BadRequestError');

async function getCards(req, res, next) {
  try {
    const movies = await Card.find({});
    res.send(movies);
  } catch (error) {
    next(error);
  }
}

async function postCard(req, res, next) {
  try {
    const card = new Card({
        title: req.body.title,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        count: req.body.count,
        url: req.body.url,
    });
    await card.save();
    res.send({ message: 'Карточка создана' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные при создании карточки'));
    } else {
      next(error);
    }
  }
}

async function deleteCard(req, res, next) {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card === null) {
      throw new NotFoundError('Карточка была уже удалена');
    }
      await Card.deleteOne({ id: req.params.cardId });
      res.send({ message: 'Карточка удалена' });
  } catch (error) {
    next(error);
  }
}

async function getCardById(req, res, next) {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card === null) {
      throw new NotFoundError('Карточки не существует');
    }
      res.send(card);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getCards,
  postCard,
  deleteCard,
  getCardById,
};