import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  let user =
    (await Admin.findOne({ username })) ||
    (await Student.findOne({ userID: username }));

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Wrong password");
  }

  // Student profile check
  if (!user.role || user.role === "student") {
    if (!user.profileComplete) {
      return res.status(200).json({
        message: "Please complete you profile",
        profileComplete: user.profileComplete
      });
    }
  }

  const { password: _, ...userData } = user._doc;
  const token = generateToken(user._id, user.role || "student");

  res.cookie("token", token, {
    httpOnly: true,          // JS cannot access the token
    secure: false,           // false for localhost; true in production HTTPS
    maxAge: 60 * 60 * 1000,  // 1 hour
    sameSite: "lax",         // helps prevent CSRF
  });

  res.json({
    message: "Logged in successfully",
    user: userData
  });
  
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,   // already loaded by protect middleware
  });
});

