import { Server } from "socket.io";
import Message from "../models/message.js";
import Chat from "../models/chat.js";

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
      console.log(
        `New message from ${sender} in chat ${chatId}: Conent: ${content}`,
      );
      try {
        // Ensure that chat exists and sender is a participant
        const chat = await Chat.findById(chatId);
        if (!chat) {
          return socket.emit("error", { message: "Chat not found" });
        }
        if (!chat.participants.includes(sender)) {
          return socket.emit("error", {
            message: "You are not a participant in this chat",
          });
        }
        // Save the message
        const message = new Message({ chatId, sender, content });
        await message.save();

        // Add the message to the chat
        chat.messages.push(message._id);
        await chat.save();

        // Emit the message to connected clients
        // ioServer.to(chatId).emit("newMessage", message);
        ioServer.emit("newMessage", message);
      } catch (error) {
        console.log(`Error sending message: ${error}`);
        return socket.emit("error", { message: "Internal server error" });
      }
    });

    socket.on("typing", (data) => {
      if (data) {
        // socket.to(chatId).emit("typing", socket.id);
        socket.emit("typing", data.userId);
        console.log(`User ${data.userId} is typing in chat ${data.chatId}`);
      }
    });

    socket.on("stopTyping", (data) => {
      if (data) {
        // socket.to(chatId).emit("stopTyping", { user });
        socket.emit("stopTyping", socket.id);
        console.log(
          `User ${data.userId} stopped typing in chat ${data.chatId}`,
        );
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
