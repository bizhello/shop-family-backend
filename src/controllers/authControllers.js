const authService = require("../services/authService");

async function login(req, res, next) {
  try {
    const { email, password, remember } = req.body;
    const userData = await authService.login(email, password);

    if (remember) {
      res
        .cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 1000,
          httpOnly: true,
        })
        .send({
          accessToken: userData.accessToken,
          userId: userData.userId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
    }
    res.send({
      accessToken: userData.accessToken,
      userId: userData.userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const userData = await authService.registration(
      email,
      password,
      firstName,
      lastName
    );
    res
      .cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
      })
      .send({
        accessToken: userData.accessToken,
        userId: userData.userId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    await authService.logout(refreshToken);

    res.clearCookie("refreshToken").send({ message: "Выход" });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const tokens = await authService.refresh(refreshToken);

    res
      .cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
      })
      .send({
        accessToken: tokens.accessToken,
        userId: tokens.userId,
        email: tokens.email,
        firstName: tokens.firstName,
        lastName: tokens.lastName,
      });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  createUser,
  logout,
  refreshToken,
};
