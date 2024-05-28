import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import authRoutes from './routes/authRoutes.js';
// import chatRoutes from './routes/chatRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// app.use('/api/auth', authRoutes);
// app.use('/api/chat', chatRoutes);

export default app;
