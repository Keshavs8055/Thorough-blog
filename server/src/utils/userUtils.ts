import { IUser } from "../types";

export const buildUserResponse = (user: IUser) => ({
  id: user._id,
  name: user.name,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  isAuthor: user.isAuthor,
  role: user.role, // UPDATE FRONTEND
});

export const buildCompleteUserResponse = (user: IUser) => ({
  id: user._id,
  name: user.name,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  role: user.role, // UPDATE FRONTEND
  authorProfile: user.authorProfile,
  isAuthor: user.isAuthor,
});
