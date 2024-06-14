import express from "express";
import {
  sendMessage,
  getChatHistory,
  getUsers,
  createChat,
  getChatByUsers,
} from "../controllers/chatController.js";

const router = express.Router();

// /api/chat

router.post("/create", createChat);
router.post("/messages", sendMessage);
router.get("/messages", getChatHistory);
router.get("/users", getUsers);
router.get("/:user1/:user2", getChatByUsers);

export default router;
