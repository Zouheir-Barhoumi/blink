import { Server } from "socket.io";
import Message from "../models/message.js";

export const chatSocket = (httpServer) => {
  const ioServer = new Server(httpServer, {
    cors: {
      origin: "*", // adjust thsi to match frontend's origin
    },
  });

  ioServer.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    //  Handle joining a chat
    socket.on("join", async (chatId) => {
      try {
        const chat = await Message.findById(chatId);
        if (!chat) {
          return socket.emit("error", { message: "Chat not found" });
        }
        socket.join(chatId);
        console.log(`User ${socket.id} joind chat ${chatId}`);
        socket.emit("joined", chat);
        // emit the chat history to the client
        ioServer.to(chatId).emit("chatHistory", chat);
        // change status to online
        socket.to(chatId).emit("statusChange", {
          userId: socket.id,
          status: "online",
        });
      } catch (error) {
        console.log(`Error joining chat: ${error}`);
        return socket.emit("error", { message: "Internal server error" });
      }
    });

    // Listen for 'message' events from clients
    socket.on("message", async ({ chatId, sender, content }) => {
      try {
        const chat = await Message.findById(chatId);
        if (!chat) {
          return socket.emit("error", { message: "Chat not found" });
        }
        const message = await Message.create({ chatId, sender, content });
        chat.messages.push(message._id);
        await chat.save();
        // emit the message to connected clients
        ioServer.to(chatId).emit("newMessage", message);
      } catch (error) {
        console.log(`Error sending message: ${error}`);
        return socket.emit("error", { message: "Internal server error" });
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
      // notify others in the chat that a user has disconnected
      socket.rooms.forEach((chatId) => {
        ioServer
          .to(chatId)
          .emit("statusChange", { userId: socket.id, status: "offline" });
      });
    });
  });

  return ioServer;
};
