const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const requestTime = require('./middleware/requestTime');
const app = express();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(requestTime);

app.use('/api/v1/users', userRouter);

app.use(errorHandler);
module.exports = app; // export app from this file.
