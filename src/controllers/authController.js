import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    let user =
      (await Admin.findOne({ username })) ||
      (await Student.findOne({ userID: username }));

    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    // For students: check if all info is filled
    if (!user.role || user.role === "student") {
      if (!user.profileComplete) {
        return res.status(200).json({
          message: "Please complete your profile",
          profileComplete: user.profileComplete
        });
      }
    }

    // Send token and user info
    const { password: _, ...userData } = user._doc;
    res.json({
      token: generateToken(user._id, user.role || "student"),
      user: userData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
