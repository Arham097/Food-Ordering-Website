const express = require('express');
const morgan = require('morgan');
const app = express();
const globalErrorHandler = require('./controllers/errorController');



app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server side!', app: 'DineWith Hasan' });
});

app.use(globalErrorHandler);
module.exports = app;