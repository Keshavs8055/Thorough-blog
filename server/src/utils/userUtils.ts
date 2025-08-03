import { Types } from "mongoose";
import { IUser } from "../global_types";

export const buildUserResponse = (user: IUser) => ({
  _id: user._id instanceof Types.ObjectId ? user._id.toString() : user._id,
  name: user.name,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  isAuthor: user.isAuthor,
  isVerified: user.isVerified,
  role: user.role, // UPDATE FRONTEND
});

export const buildCompleteUserResponse = (user: IUser) => ({
  _id: user._id,
  name: user.name,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  role: user.role, // UPDATE FRONTEND
  authorProfile: user.authorProfile,
  isVerified: user.isVerified,
  isAuthor: user.isAuthor,
});
