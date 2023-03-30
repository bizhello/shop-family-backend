const mongoose = require("mongoose");
const { isURL } = require("validator");

const { Schema, model } = mongoose;

const cardSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  dateFrom: {
    type: Number,
    require: true,
  },
  dateTo: {
    type: Number,
    require: true,
  },
  count: {
    type: Number,
    require: true,
  },
  url: {
    type: String,
    require: true,
    validate: { validator: isURL, message: "Ссылка не валидна" },
  },
});

module.exports.CardModel = model("card", cardSchema);
