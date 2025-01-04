const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const http = require('http');
const { initializeSocket } = require('./utils/socket');

dotenv.config({ path: "./config/.env" });

mongoose.connect('mongodb://127.0.0.1:27017/DineWithHasan', {
})

  .then(() => {
    console.log('DB connection successful!');
  }).catch((err) => {
    console.log('DB connection failed!', err);
  });

const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);

})

