const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const { initializeSocket } = require('./utils/socket');

// Set NODE_ENV to production if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:arham097@practice.8z2ajfw.mongodb.net/DineWithHasan';

mongoose.connect(MONGODB_URI, {
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

