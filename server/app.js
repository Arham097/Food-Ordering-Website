const express = require('express');
const morgan = require('morgan');
const app = express();
const globalErrorHandler = require('./controllers/errorController');
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const menuRouter = require('./routes/menuRoutes');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

app.use(cors(
  {
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use('/api/v1/items', itemRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/menu', menuRouter);


app.use(globalErrorHandler);
module.exports = app;