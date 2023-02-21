const { UnauthorizedError } = require("../../utils/errors/UnauthorizedError");
const tokenService = require("../services/tokenService");

module.exports = async (req, _, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(UnauthorizedError("Ошибка авторизации"));
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(UnauthorizedError("Ошибка авторизации"));
    }
    const userId = tokenService.validateAccessToken(accessToken);
    if (!userId) {
      return next(UnauthorizedError("Ошибка авторизации"));
    }
    req.userId = userId;
    next();
  } catch (error) {
    next(new UnauthorizedError("Ошибка авторизации"));
  }
};
