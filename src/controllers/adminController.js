import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

export const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const exists = await Admin.findOne({ username });
  if (exists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    username,
    password: hashed,
    role: "admin"
  });

  res.status(201).json({
    message: "Admin registered successfully",
    admin: newAdmin
  });
});
