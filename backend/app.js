import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import authRoutes from "./routes/authRoutes.js";
// import chatRoutes from './routes/chatRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../.env");

dotenv.config({ path: envPath });

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
// app.use('/api/chat', chatRoutes);

export default app;
