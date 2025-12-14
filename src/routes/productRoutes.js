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

const router = express.Router();

router.post("/add", upload.array("images", 3), addProduct);
router.get("/", getAllProducts);
router.get("/mine", getMyProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
