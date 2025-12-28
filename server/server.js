const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const { initializeSocket } = require('./utils/socket');


mongoose.connect('mongodb+srv://admin:arham097@practice.8z2ajfw.mongodb.net/DineWithHasan', {
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

