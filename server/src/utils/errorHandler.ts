import { ErrorRequestHandler } from "express";
import multer from "multer";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  _next
) => {
  if (err instanceof multer.MulterError) {
    let message = "File upload error.";

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File too large. Max size is 5MB.";
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Invalid file type.";
    }
    res.status(400).json({
      success: false,
      message,
    });
  }

  const statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
