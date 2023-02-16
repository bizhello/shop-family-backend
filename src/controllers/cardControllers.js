const cardService = require("../services/cardService");
const { BadRequestError } = require("../../utils/errors/BadRequestError");

async function getCards(_, res, next) {
  try {
    const cards = await cardService.getCards();
    res.send(cards);
  } catch (error) {
    next(error);
  }
}

async function postCard(req, res, next) {
  try {
    const card = await cardService.createCard(req.body);
    res.send(card);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(new BadRequestError("Некорректные данные при создании карточки"));
    } else {
      next(error);
    }
  }
}

async function deleteCard(req, res, next) {
  try {
    await cardService.removeCard(req.params.cardId);
    res.send({ message: "Карточка удалена" });
  } catch (error) {
    next(error);
  }
}

async function getCardById(req, res, next) {
  try {
    const card = await cardService.findCardById(req.params.cardId);
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
