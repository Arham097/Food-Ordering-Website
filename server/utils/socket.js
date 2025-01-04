const { Server } = require('socket.io');

let clients = new Map();
let io = null;

function initializeSocket(server) {
  console.log("Initializing Socket.io...");
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log("New Connection Established", socket.id);

    socket.on('userRegistered', (userId) => {
      clients.set(userId.toString(), socket.id);
      console.log("Connected", clients);
    });

    socket.on('disconnect', () => {
      for (const [key, value] of clients.entries()) {
        if (value === socket.id) {
          clients.delete(key);
          console.log(`User with ID ${key} has been disconnected`);
          break;
        }
      }
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io is not initialized. Call initializeSocket(server) first.");
  }
  return io;
}

function getClients() {
  if (!clients) {
    throw new Error("Clients map is not initialized. Ensure the server has called initializeSocket(server).");
  }
  return clients;
}

module.exports = { initializeSocket, getIO, getClients };
