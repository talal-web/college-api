import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user =
      decoded.role === "admin"
        ? await Admin.findById(decoded.id).select("-password")
        : await Student.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    next();
  } catch (err) {
    res.status(401);
    throw new Error("Invalid token");
  }
});
