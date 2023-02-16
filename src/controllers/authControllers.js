const authService = require("../services/authService");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userData = await authService.login(email, password);

    res
      .cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
      })
      .send({ refreshToken: userData.refreshToken });
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
      .send({ accessToken: userData.accessToken });
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

module.exports = {
  login,
  createUser,
  logout,
};
