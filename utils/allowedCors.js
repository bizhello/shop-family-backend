const allowedCors = [
  "https://bizhello.github.io/shop-family",
  "http://localhost:3000",
  "https://localhost:3000",
];

module.exports = {
  credentials: true,
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
