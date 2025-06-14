import express from "express";
import { UserSignUp } from "../controllers/auth/signup";
import { UserLogin } from "../controllers/auth/login";
import { VerifyEmail } from "../controllers/auth/verify";
import UploadMiddleware from "../middlewares/uploadMiddleware";
import { requireAuth } from "../middlewares/authMiddleware";
import { userLogout } from "../controllers/auth/logout";

const upload = UploadMiddleware("avatar");

const AuthRoutes = express.Router();

AuthRoutes.post(
  "/signup",
  //   express.urlencoded({ extended: true }),
  upload.single("image"),
  UserSignUp
);
AuthRoutes.post("/login", UserLogin);
AuthRoutes.post("/logout", requireAuth, userLogout);
AuthRoutes.get("/verify", VerifyEmail);

export default AuthRoutes;
