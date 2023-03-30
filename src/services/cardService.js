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
    await CardModel.deleteOne({ _id: id });
    return;
  }

  async findCardById(id) {
    const card = await CardModel.findById(id);
    if (card === null) {
      throw new NotFoundError("Карточки не существует");
    }

    return card;
  }

  async putCard({ id, title, dateFrom, dateTo, count, url }) {
    const card = await CardModel.findByIdAndUpdate(
      id,
      { title, dateFrom, dateTo, count, url },
      { new: true, runValidators: true }
    );

    return card;
  }

  async increment(id) {
    const card = await CardModel.findById(id);
    card.count += 1;
    await card.save();

    return card;
  }

  async decrement(id) {
    const card = await CardModel.findById(id);
    card.count -= 1;
    await card.save();

    return card;
  }

  // async changeDateFrom(id, dateFrom) {
  //   const card = await CardModel.findById(id);

  //   card.dateFrom = dateFrom;
  //   await card.save();

  //   return card;
  // }

  // async changeDateTo(id , dateTo) {
  //   const card = await CardModel.findById(id);

  //   card.dateTo = dateTo;
  //   await card.save();

  //   return card;
  // }
}

module.exports = new CardService();
