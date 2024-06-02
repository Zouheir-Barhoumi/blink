import Chat from "../models/chat.js";
import Message from "../models/message.js";
import User from "../models/user.js";

const createChat = async (req, res) => {
  try {
    const { userIds } = req.body;
    if (!userIds || userIds.length < 2) {
      return res
        .status(400)
        .json({ error: "At least two users are required to create a chat" });
    }
    const users = await User.find({ _id: { $in: userIds } });
    if (users.length !== userIds.length) {
      return res.status(400).json({ error: "Some users were not found" });
    }

    const chat = new Chat({ users: userIds });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.log(`Error creating chat: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId, sender, content } = req.body;
    if (!chatId || !sender || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    if (!chat.participants.includes(sender)) {
      return res
        .status(403)
        .json({ error: "You are not a participant in this chat" });
    }

    const newMessage = new Message({ chatId, sender, content });
    await newMessage.save();

    chat.messages.push(newMessage._id);
    await chat.save();

    // emit the messageto connected clients
    io.to(chatId).emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error sending message: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getChatHistory = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error retrieving chat history: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a list of users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(`Error retrieving users: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createChat, sendMessage, getChatHistory, getUsers };
