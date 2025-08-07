import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary";
import path from "path";

function uploadMiddleware(folderName: string) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const folderPath = `${folderName.trim()}`; // Update the folder path here
      const fileExtension = path.extname(file.originalname).substring(1);
      const publicId = `${file.fieldname}-${Date.now()}`;

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
      };
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    fileFilter: (req, file, cb) => {
      const allowedTypes = /^(jpeg|png|jpg)$/;
      const extname =
        file.originalname.endsWith(".jpeg") ||
        file.originalname.endsWith(".png") ||
        file.originalname.endsWith(".jpg");
      const mimetype = allowedTypes.test(file.mimetype.split("/")[1]);

      if (mimetype && extname) {
        cb(null, true);
      } else {
        cb(
          new multer.MulterError(
            "LIMIT_UNEXPECTED_FILE",
            "Only images are allowed!"
          )
        );
      }
    },
  });
}

export default uploadMiddleware;
