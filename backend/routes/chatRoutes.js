import express from "express";
import {
  sendMessage,
  getChatHistory,
  getUsers,
  createChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/create", createChat);
router.post("/messages", sendMessage);
router.get("/messages", getChatHistory);
router.get("/users", getUsers);

export default router;
