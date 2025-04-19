import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import AuthRoutes from "./routes/auth";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();
const env = dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI || "").then(() => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/test", (req, res) => {
  res.json({
    status: "working",
  });
});
app.use("/api/posts", postRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
