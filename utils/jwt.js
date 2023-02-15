const jwt = require('jsonwebtoken');

const {
  JWT_SECRET = 'very-secrets',
} = process.env;

const getJwtToken = (id) => jwt.sign(
  { id },
  JWT_SECRET,
  { expiresIn: '7d' },
);

const isAuthorized = async (token) => {
  try {
    const decoded = await jwt.verify(
      token,
      JWT_SECRET,
    );
    return decoded.id;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getJwtToken,
  isAuthorized,
};