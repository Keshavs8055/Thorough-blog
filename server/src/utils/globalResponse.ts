import { Response } from "express";
import { SendResponseOptions } from "../global_types";

export function sendResponse<T>({
  res,
  statusCode,
  success,
  message,
  data,
}: SendResponseOptions<T>): Response {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
}
