import { Server } from "socket.io";

export const chatSocket = (httpServer) => {
  const ioServer = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  ioServer.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("message", (message) => {
      console.log(`Received message from client: ${message}`);
      ioServer.emit("message", message);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
