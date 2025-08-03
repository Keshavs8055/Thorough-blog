import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import User from "../../models/UserModel";
import { generateToken } from "../../utils/auth/jwtUtils";
import { generateVerificationToken } from "../../utils/auth/tokenUtils";
import { buildUserResponse } from "../../utils/userUtils";
import sendVerificationEmail from "../../utils/auth/sendVerifyMail";
import { AppError } from "../../utils/appError";
import { sendResponse } from "../../utils/globalResponse";
import { InferResponse, RoleTypes, userRoles } from "../../global_types";
import { CompleteUserResponse } from "../../global_types";

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
    throw new AppError(
      "All fields (name, username, email, password) are required.",
      400
    );
  }

  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username }],
  });

  if (existingUser) {
    throw new AppError(
      "An account with that email or username already exists.",
      400
    );
  }

  const avatarFile = req.file as Express.Multer.File;
  const avatar = avatarFile
    ? {
        url: (avatarFile as any).path,
        label: username,
      }
    : undefined;

  const { rawToken, hashed, expiresAt } = generateVerificationToken();

  let userRole: RoleTypes = userRoles.USER;
  if (isAuthor) userRole = userRoles.PENDING_AUTHOR;

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
    avatar: avatar?.url,
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
    throw new AppError(
      "Failed to send verification email. Please try again later.",
      500
    );
  }

  const token = generateToken(newUser._id.toString());

  const response: InferResponse<CompleteUserResponse["data"]> = {
    success: true,
    message:
      "Signup successful! Please check your email to verify your account.",
    data: {
      user: buildUserResponse(newUser),
    },
  };

  return sendResponse({
    res,
    statusCode: 201,
    ...response,
  });
});
