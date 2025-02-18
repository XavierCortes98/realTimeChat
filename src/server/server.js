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
  console.log("cliente conectado: ", socket.id);

  socket.on("join", (username) => {
    if (connectedUsers.has(username)) {
      socket.emit("usernameError", "El nombre ya esta en uso, elige otro");
    } else {
      connectedUsers.add(username);
      socket.username = username;
      io.emit("userConnected", { user: username });
      console.log("user agregado", username);
    }

    io.emit("userConnected", { user: username, id: socket.id });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
