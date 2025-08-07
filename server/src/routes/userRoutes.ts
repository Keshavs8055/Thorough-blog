import express from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import { getCurrentUser, getDetailedUserProfile } from "../controllers/auth/me";
import { requireVerified } from "../middlewares/requireVerified";
import { requestAuthor } from "../controllers/user/requestAuthor";
import uploadMiddleware from "../middlewares/uploadMiddleware";
import { editUserProfile } from "../controllers/user/editUserProfile";
import { getAuthorPageData } from "../controllers/user/getAuthorPageData";

const userRoutes = express.Router();
const upload = uploadMiddleware("avatar");

userRoutes.get("/me", requireAuth, getCurrentUser);
userRoutes.get("/:profileId", requireAuth, getDetailedUserProfile);
userRoutes.get("/author/:username", getAuthorPageData);

userRoutes.post(
  "/upgrade",
  requireAuth,
  requireVerified,
  upload.single("avatar"),
  requestAuthor
);

userRoutes.put(
  "/edit-profile",
  requireAuth,
  requireVerified,
  upload.single("image"),
  editUserProfile
);

// /posts/create - requireAuth, requireRole(['author'])

export default userRoutes;
