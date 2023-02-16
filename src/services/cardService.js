const { CardModel } = require("../models/cardModel");
const { NotFoundError } = require("../../utils/errors/NotFoundError");

class CardService {
  async getCards() {
    return await CardModel.find({});
  }

  async createCard({ title, dateFrom, dateTo, count, url }) {
    const card = await new CardModel({ title, dateFrom, dateTo, count, url });
    await card.save();

    return card;
  }

  async removeCard(id) {
    const card = await CardModel.findById(id);

    if (card === null) {
      throw new NotFoundError("Карточка была уже удалена");
    }
    await CardModel.deleteOne({ id });

    return;
  }

  async findCardById(id) {
    const card = await CardModel.findById(id);
    if (card === null) {
        throw new NotFoundError("Карточки не существует");
    }
    
    return card;
  }
}

module.exports = new CardService();
