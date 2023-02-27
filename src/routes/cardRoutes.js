const express = require("express");

const {
  createCardValidation,
  idCardValidation,
  putCardValidation,
} = require("../../utils/validation");

const {
  getCards,
  postCard,
  deleteCard,
  getCardById,
  putCardById,
  incrementById,
  decrementById,
  // changeDateFrom,
  // changeDateTo,
} = require("../controllers/cardControllers");

const cardRoutes = express.Router();

cardRoutes.get("/", getCards);
cardRoutes.post("/", createCardValidation, postCard);
cardRoutes.delete("/:cardId", idCardValidation, deleteCard);
cardRoutes.get("/:cardId", idCardValidation, getCardById);
cardRoutes.put("/:cardId", putCardValidation, putCardById);
cardRoutes.patch("/:cardId/increment", idCardValidation, incrementById);
cardRoutes.patch("/:cardId/decrement", idCardValidation, decrementById);

// cardRoutes.patch("/:cardId/dateFrom", idCardValidation, changeDateFrom);
// cardRoutes.patch("/:cardId/dateTo", idCardValidation, changeDateTo);

module.exports = {
  cardRoutes,
};
