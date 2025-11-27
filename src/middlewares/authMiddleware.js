import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user =
      decoded.role === "admin"
        ? await Admin.findById(decoded.id).select("-password")
        : await Student.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
