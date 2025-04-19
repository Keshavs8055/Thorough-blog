import express from "express";
import { UserSignUp } from "../controllers/auth/signup";
import { UserLogin } from "../controllers/auth/login";
import { VerifyEmail } from "../controllers/auth/verify";

const AuthRoutes = express.Router();

AuthRoutes.post("/signup", UserSignUp);
AuthRoutes.post("/login", UserLogin);
AuthRoutes.get("/verify", VerifyEmail);

export default AuthRoutes;
