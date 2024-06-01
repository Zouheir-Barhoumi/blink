import { Server } from "socket.io";
import Message from "../models/message";

export const chatSocket = (httpServer) => {
  const ioServer = new Server(httpServer, {
    cors: {
      origin: "*", // adjust thsi to match frontend's origin
    },
  });

  ioServer.on("connection", (socket) => {
    console.log("New client connected", socket.id);
    // Listen for 'message' events from clients
    socket.on("message", async ({ chatId, sender, content }) => {
      try {
        const message = await Message.create({ chatId, sender, content });
        ioServer.to(chatId).emit("newMessage", message);
      } catch (error) {
        console.log(`Error sending message: ${error}`);
        return socket.emit("error", { message: "Internal server error" });
      }
    });

    socket.on("join", (chatId) => {
      if (chatId) {
        socket.join(chatId);
        console.log(`User ${socket.id} joined room ${chatId}`);
      }
    });

    socket.on("typing", (chatId) => {
      if (chatId) {
        socket.to(chatId).emit("typing", socket.id);
      }
    });

    socket.on("stopTyping", ({ chatId, user }) => {
      if (chatId) {
        socket.to(chatId).emit("stopTyping", { user });
      }
    });

    // Listen for 'disconnect' events
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return ioServer;
};
