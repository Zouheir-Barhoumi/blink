import Message from "../models/message.js";
import User from "../models/user.js";

const sendMessage = async (req, res) => {
  const { chatId, sender, content } = req.body;
  try {
    const newMessage = await Message.create({ chatId, sender, content });
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

export { sendMessage, getChatHistory, getUsers };
