const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const connectedUsers = new Set();

io.on("connection", (socket) => {
  socket.on("join", (username, callback) => {
    if (connectedUsers.has(username)) {
      return callback({
        status: 401,
        message: "El nombre ya está en uso, elige otro",
      });
    } else {
      connectedUsers.add(username);
      socket.username = username;

      io.emit("updateUsers", Array.from(connectedUsers.keys()));

      io.emit("userConnected", { user: username });
    }
    return callback({ status: 200, message: "Login correcto" });
  });

  socket.on("message", ({ user, message }) => {
    io.emit("message", { user, message, timestamp: new Date() });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      connectedUsers.delete(socket.username);
      io.emit("userDisconnected", { user: socket.username });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
