const jwt = require("jsonwebtoken");

const { TokenModel } = require("../models/tokenModel");
const { UnauthorizedError } = require("../../utils/errors/UnauthorizedError");

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

class TokenService {
  generateTokens(userId) {
    const accessToken = jwt.sign({ userId }, JWT_ACCESS_SECRET, {
      expiresIn: "20s",
    });

    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token.save();
  }

  async removeToken(refreshToken) {
    await TokenModel.deleteOne({ refreshToken });
    return;
  }

  async findRefreshToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });

    return tokenData;
  }

  validateAccessToken(accessToken) {
    try {
      const { userId } = jwt.verify(accessToken, JWT_ACCESS_SECRET);
      return userId;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      const { userId } = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      return userId;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
