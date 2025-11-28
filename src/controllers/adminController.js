import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username,
      password: hashed,
      role: "admin"
    });

    res.json({
      message: "Admin registered successfully",
      admin: newAdmin
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
