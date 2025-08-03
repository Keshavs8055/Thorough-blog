import express from "express";
import {
  getAllPosts,
  getPostById,
  LikePost,
} from "../controllers/post/postController";
import { requireAuth } from "../middlewares/authMiddleware";
import { requireVerified } from "../middlewares/requireVerified";
import { createPost } from "../controllers/post/createPost";
import { requireRole } from "../middlewares/roleMiddleware";
import { userRoles } from "../global_types";
import uploadMiddleware from "../middlewares/uploadMiddleware";
import { getPostsByTags } from "../controllers/post/getTags";

const upload = uploadMiddleware("image");

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.get("/tags/all", getPostsByTags);

// /api/posts/by-tags?tags=education,elearning&limit=3&excludeId=6829d915c5521e6e56192a8e

postRouter.post(
  "/",
  requireAuth,
  requireVerified,
  requireRole([userRoles.AUTHOR]),
  upload.single("image"),
  createPost
);
postRouter.post("/:id/like", requireAuth, requireVerified, LikePost);

export default postRouter;
