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

async function putCardById(req, res, next) {
  try {
    const card = await cardService.putCard(req.body);
    res.send(card);
  } catch (error) {
    next(error);
  }
}

async function incrementById(req, res, next) {
  try {
    const card = await cardService.increment(req.params.cardId);
    res.send(card);
  } catch (error) {
    next(error);
  }
}

async function decrementById(req, res, next) {
  try {
    const card = await cardService.decrement(req.params.cardId);
    res.send(card);
  } catch (error) {
    next(error);
  }
}

// async function changeDateFrom(req, res, next) {
//   try {
//     const card = await cardService.changeDateFrom(req.params.cardId, req.body);
//     res.send(card);
//   } catch (error) {
//     next(error);
//   }
// }

// async function changeDateTo(req, res, next) {
//   try {
//     const card = await cardService.changeDateTo(req.params.cardId, req.body);
//     res.send(card);
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  getCards,
  postCard,
  deleteCard,
  getCardById,
  putCardById,
  incrementById,
  decrementById,
  // changeDateFrom,
  // changeDateTo,
};
