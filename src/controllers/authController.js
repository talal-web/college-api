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
        message: "Please complete your profile",
        profileComplete: false
      });
    }
  }

  const { password: _, ...userData } = user._doc;

  res.json({
    token: generateToken(user._id, user.role || "student"),
    user: userData
  });
});
