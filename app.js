const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { limiter } = require('./midllewares/limiter');
const { requestLogger, errorLogger } = require('./midllewares/logger');
const errorHandler = require('./midllewares/error-handler');
const routes = require('./routes');

require('dotenv').config();

const { NODE_ENV } = process.env;
const { SERVER_PORT, DB } = NODE_ENV === 'production' ? process.env : require('./constants/config');

const app = express();

app.set('trust proxy', 'loopback');

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(routes);

app.use(requestLogger);

app.use(limiter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${SERVER_PORT}`);
});
