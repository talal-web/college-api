import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import { uploadToCloudinary } from "../utils/upload.js";


// ========================================
export const addProduct = asyncHandler(async (req, res) => {
  // Text fields
  const { title, description, price, category } = req.body;

  if (!title || !description || !price || !category) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Uploaded files
   const images = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );


  const product = await Product.create({
    title,
    description,
    price,
    category,
    images,
    seller: req.user.id, // from protect middleware
  });

  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});



// ========================================
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("seller", "name department semester");
  res.json(products);
});


// ========================================
export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("seller", "name department semester");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

// ========================================
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.seller.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to edit this product");
  }

  const updated = await Product.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  res.json({
    message: "Product updated successfully",
    product: updated,
  });
});

// ========================================
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.seller.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this product");
  }

  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Product deleted successfully" });
});

// ========================================
export const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ seller: req.user.id });
  res.json(products);
});
