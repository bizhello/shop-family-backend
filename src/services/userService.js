const { UserModel } = require("../models/userModel");
const tokenService = require("./tokenService");
class UserService {
  async findUsersName() {
    const usersName = await UserModel.find({}).select(
      "firstName lastName -_id"
    );

    return usersName;
  }

  async findUserById(id) {
    const user = await UserModel.findById(id);
    if (user === null) {
      throw new NotFoundError("Пользователь не существует");
    }

    return user;
  }

  async deleteUserById(userId) {
    const user = await UserModel.findById(userId);
     
    if (user === null) {
      throw new NotFoundError("Пользователь не существует");
    }
    await UserModel.deleteOne({ id: userId });
    await tokenService.removeTokenByUserId(userId);
  }
}

module.exports = new UserService();
