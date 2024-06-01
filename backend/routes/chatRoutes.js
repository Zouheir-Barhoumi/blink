import express from "express";
import { sendMessage, history, users } from "../controllers/chatController.js";

const router = express.Router();

router.post("/messages", sendMessage);
router.get("/messages", history);
router.get("/users", users);

export default router;
