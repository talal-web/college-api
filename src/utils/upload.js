// /src/utils/upload.js
import multer from "multer";
import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

// Multer memory storage (store files in memory temporarily)
const storage = multer.memoryStorage();

// Only accept image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images are allowed"), false);
};

// Multer upload instance
const upload = multer({ storage, fileFilter });

// Function to upload buffer to Cloudinary
export const uploadToCloudinary = (fileBuffer, folder = "college_uploads") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    Readable.from(fileBuffer).pipe(stream);
  });
};

export default upload;
