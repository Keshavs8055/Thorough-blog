import express from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import { getCurrentUser, getDetailedUserProfile } from "../controllers/auth/me";
import { requireVerified } from "../middlewares/requireVerified";
import { requestAuthor } from "../controllers/user/requestAuthor";

const userRoutes = express.Router();

userRoutes.get("/me", requireAuth, getCurrentUser);
userRoutes.get("/profile/:profileId", requireAuth, getDetailedUserProfile);
userRoutes.post("/upgrade", requireAuth, requireVerified, requestAuthor);

// /user/requestAuthor - requireAuth, requireVerified
// /posts/create - requireAuth, requireRole(['author'])

export default userRoutes;
