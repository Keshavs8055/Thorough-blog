import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import User from "../../models/UserModel";
import { generateToken } from "../../utils/auth/jwtUtils";
import { generateVerificationToken } from "../../utils/auth/tokenUtils";
import { buildUserResponse } from "../../utils/userUtils";
import sendVerificationEmail from "../../utils/auth/sendVerifyMail";
import { userRoles } from "../../types";

export const UserSignUp = catchAsync(async (req: Request, res: Response) => {
  const {
    name,
    username,
    email,
    password,
    bio,
    website,
    twitter,
    linkedin,
    expertise,
  } = req.body;
  const isAuthor = req.body.isAuthor || false;

  if (!name || !username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, username, email, password) are required.",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "An account with that email or username already exists.",
    });
  }

  // Handle avatar image (if uploaded)
  const avatarFile = req.file as Express.Multer.File;
  const avatar = avatarFile
    ? {
        url: (avatarFile as any).path, // Cloudinary URL
        label: username,
      }
    : undefined;

  const { rawToken, hashed, expiresAt } = generateVerificationToken();

  let userRole: userRoles = userRoles.USER;
  if (isAuthor) userRole = userRoles.PENDING;

  const newUser = await User.create({
    name,
    username,
    email: email.toLowerCase(),
    password,
    verificationToken: hashed,
    verificationTokenExpires: expiresAt,
    isVerified: false,
    role: userRole,
    isAuthor,
    avatar: avatar?.url, // for non-authors
    ...(isAuthor && {
      authorProfile: {
        bio,
        socialMedia: {
          website,
          twitter,
          linkedin,
        },
        expertise,
      },
    }),
  });

  const verificationLink = `${process.env.CLIENT_URL}/verify?token=${rawToken}&email=${email}`;

  try {
    await sendVerificationEmail(email, verificationLink);
  } catch {
    await User.findByIdAndDelete(newUser._id);
    return res.status(500).json({
      success: false,
      message: "Failed to send verification email. Please try again later.",
    });
  }

  const token = generateToken(newUser._id.toString());

  return res.status(201).json({
    success: true,
    message:
      "Signup successful! Please check your email to verify your account.",
    user: buildUserResponse(newUser),
    token,
  });
});
