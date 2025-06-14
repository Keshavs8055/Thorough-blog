import { Request, Response } from "express";
import Post from "../../models/post";
import { generateTagsFromContent } from "../../utils/generateTags";
import { catchAsync } from "../../utils/catchAsync";

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  const { title, body, date, summary } = req.body;

  if (!title || !body) {
    return res
      .status(400)
      .json({ success: false, error: "Title and body are required" });
  }

  // Image is uploaded via multer -> Cloudinary and available at req.file.path
  const imageUrl = req.file?.path || "";

  // Optional: Use AI/NLP to generate tags from the content
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
      _id: user._id,
      name: user.name,
    },
    date,
    summary,
  });

  await newPost.save();

  return res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: newPost,
  });
});
