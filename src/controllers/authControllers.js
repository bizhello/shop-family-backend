const bcrypt = require("bcrypt");

const authService = require("../services/authService");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userData = await authService.login(email, password);

    res
      .cookie("jwtRefreshToken", userData.jwtRefreshToken, {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
      })
      .send({ jwtAccessToken: userData.jwtAccessToken });
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
      .cookie("jwtRefreshToken", userData.jwtRefreshToken, {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
      })
      .send({ jwtAccessToken: userData.jwtAccessToken });
  } catch (error) {
    next(error);
  }
}

// async function signout(req, res, next) {
//   try {
//     res.clearCookie('jwt').send({ message: 'Выход' });
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = {
  login,
  createUser,
  //   signout,
};
