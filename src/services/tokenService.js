const jwt = require("jsonwebtoken");

const { TokenModel } = require("../models/tokenModel");

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

class TokenService {
  generateTokens(userId) {
    const accessToken = jwt.sign({ userId }, JWT_ACCESS_SECRET, {
      expiresIn: "30m",
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

  async removeTokenByUserId(userId) {
    await TokenModel.deleteOne({ user: userId });
    return;
  }
}

// const isAuthorized = async (token) => {
//   try {
//     const decoded = await jwt.verify(token, JWT_ACCESS_SECRET);
//     return decoded.id;
//   } catch (err) {
//     return false;
//   }
// };

module.exports = new TokenService();
