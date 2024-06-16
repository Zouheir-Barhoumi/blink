import mongoose from "mongoose";
import Chat from "../models/chat.js";
import Message from "../models/message.js";
import User from "../models/user.js";

const createChat = async (req, res) => {
  try {
    const { participants } = req.body;
    if (!participants || participants.length < 2) {
      return res
        .status(400)
        .json({ error: "At least two users are required to create a chat" });
    }

    // Validate the participants' IDs
    for (const participant of participants) {
      if (!mongoose.Types.ObjectId.isValid(participant)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
    }

    const users = await User.find({ _id: { $in: participants } });
    if (users.length !== participants.length) {
      return res.status(400).json({ error: "Some users were not found" });
    }

    const chat = new Chat({ participants });
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

// Get chat by user1 and user2 ids
const getChatByUsers = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    /* 
     TODO: remove logging
    */
    console.log(`user1: ${user1} \t user2: ${user2}`);
    /* end of logging */
    if (
      !mongoose.Types.ObjectId.isValid(user1) ||
      !mongoose.Types.ObjectId.isValid(user2)
    ) {
      return res.status(400).json({ error: "invalid user ID" });
    }
    const chat = await Chat.findOne({
      // $or: [{ participants: [user1, user2] }, { participants: [user2, user1] }],
      participants: { $in: [user2, user1] },
    });
    // const chat = await Chat.findOne({
    //   participants: { $in: [user1, user2] },
    //   $expr: { $eq: [{ $size: "$participants" }, 2] },
    // });

    if (!chat) {
      return res.status(404).json({ error: "Chat not foundsies" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.log(`Error retrieving chat ID: ${error}`);
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

export { createChat, sendMessage, getChatHistory, getUsers, getChatByUsers };
