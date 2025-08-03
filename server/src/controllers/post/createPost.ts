import { Request, Response } from "express";
import Post from "../../models/post";
import { generateTagsFromContent } from "../../utils/generateTags";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/globalResponse";
import { InferResponse, CreatePostResponse } from "../../global_types";
import { AppError } from "../../utils/appError";

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  const { title, body, date, summary } = req.body;

  if (!title || !body) {
    throw new AppError("Title and body are required", 400);
  }

  const imageUrl = req.file?.path || "";

  const fullContent = `${title}. ${body}`;
  const tags = await generateTagsFromContent(fullContent);

  const newPost = new Post({
    title,
    body,
    image: {
      src: imageUrl,
      alt: title,
    },
    tags,
    author: {
      username: user.username,
      name: user.name,
    },
    date,
    summary,
  });

  await newPost.save();

  const response: InferResponse<CreatePostResponse["data"]> = {
    success: true,
    message: "Post created successfully",
    data: {
      _id: newPost._id.toString(),
      title: newPost.title,
      body: newPost.body,
      image: newPost.image,
      tags: newPost.tags,
      author: newPost.author,
      date: newPost.date,
      summary: newPost.summary,
    },
  };

  return sendResponse({
    res,
    statusCode: 201,
    ...response,
  });
});
