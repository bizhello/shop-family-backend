const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

require('dotenv').config();
const { routes } = require('./src/routes/index');

const { errorHandler } = require('./utils/errors/errorHandler');
// const { requestLogger, errorLogger } = require('./src/middlewares/logger');
// const { dataRateLimit } = require('./utils/limiter');

// const limiter = rateLimit(dataRateLimit);

const app = express();
app.disable('x-powered-by');

const { MONGO_SHOP, PORT } = process.env;

// app.options('*', cors());
// app.use(cors());

app.use(express.json());
// app.use(requestLogger);
// app.use(limiter);
// app.use(helmet());
// app.use(cookieParser());
app.use(routes);
// app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_SHOP);
  console.log('connected to db');
  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
