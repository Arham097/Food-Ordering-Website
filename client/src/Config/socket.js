import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000"; // Replace with your server URL


export const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("Connected to the server via WebSocket:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});
