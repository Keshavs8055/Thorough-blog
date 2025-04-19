import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  LikePost,
} from "../controllers/postController";
import { requireAuth } from "../middlewares/authMiddleware";
import { requireVerified } from "../middlewares/requireVerified";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", createPost);
postRouter.post("/:id/like", requireAuth, requireVerified, LikePost);

export default postRouter;
