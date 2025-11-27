import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  let user =
    (await Admin.findOne({ username })) ||
    (await Student.findOne({ rollNo: username }));

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  res.json({
    token: generateToken(user._id, user.role || "student"),
    user
  });
};
