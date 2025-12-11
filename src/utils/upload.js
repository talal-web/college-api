// /utils/upload.js
import multer from "multer";
import storage from "../config/cloudinary";

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images are allowed"), false);
};

// Multer upload instance
const upload = multer({ storage, fileFilter });

export default upload;
