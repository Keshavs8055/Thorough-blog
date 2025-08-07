import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

import AuthRoutes from "./routes/auth";
import userRoutes from "./routes/userRoutes";
import searchRoutes from "./routes/searchRoutes";
import { globalErrorHandler } from "./utils/errorHandler";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI || "").then(() => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});
app.use("/api/posts", postRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);

// Ensure globalErrorHandler is used as an error-handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
