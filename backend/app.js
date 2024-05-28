import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
// import authRoutes from "./routes/authRoutes.js";
// import chatRoutes from './routes/chatRoutes.js';

// dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
dotenv.config({ path: new URL("../.env", import.meta.url).pathname });
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// app.use("/api/auth", authRoutes);
// app.use('/api/chat', chatRoutes);

export default app;
