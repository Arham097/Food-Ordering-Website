const express = require('express');
const morgan = require('morgan');
const app = express();
const globalErrorHandler = require('./controllers/errorController');
const itemRouter = require('./routes/itemRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const cors = require('cors');

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server side!', app: 'DineWith Hasan' });
// });

app.use('/api/v1/items', itemRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);

app.use(globalErrorHandler);
module.exports = app;