const userService = require("../services/userService");

async function getUsersName(_, res, next) {
  try {
    const usersName = await userService.findUsersName();
    res.send(usersName);
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await userService.findUserById(req.params.userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUserById(req, res, next) {
  try {
    await userService.deleteUserById(req.params.userId);
    res.send({ message: "Пользователь удален" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsersName,
  getUserById,
  deleteUserById,
};
