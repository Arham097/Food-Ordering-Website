const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: "./config/.env" });
const app = require('./app');


mongoose.connect('mongodb://127.0.0.1:27017/DineWithHasan', {
})

  .then(() => {
    console.log('DB connection successful!');
  }).catch((err) => {
    console.log('DB connection failed!', err);
  });

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);

})
