import express from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/productController.js";
import upload from "../utils/upload.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, upload.array("images", 3), addProduct);
router.get("/", getAllProducts);
router.get("/mine", protect, getMyProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
