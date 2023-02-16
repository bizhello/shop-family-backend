const bcrypt = require("bcrypt");

const { UserModel } = require("../models/userModel");
const tokenService = require("./tokenService");
const { ConflictError } = require("../../utils/errors/ConflictError");
const { UnauthorizedError } = require("../../utils/errors/UnauthorizedError");

SALT_ROUNDS = 10;

class AuthService {
  async registration(email, password, firstName, lastName) {
    const condidate = await UserModel.findOne({ email });
    if (condidate) {
      throw new ConflictError("Пользователь с таким email уже существует");
    }
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await UserModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
    });

    const dataUser = await newUser.save();
    const tokens = tokenService.generateTokens(dataUser._id);

    await tokenService.saveToken(dataUser._id, tokens.refreshToken);

    return {
      id: newUser._id,
      email,
      firstName,
      lastName,
      ...tokens,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Неправильно указан логин и/или пароль!");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedError("Неправильно указан логин и/или пароль!");
    }

    const tokens = tokenService.generateTokens(user._id);

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
    };
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);

    return;
  }
}

module.exports = new AuthService();
