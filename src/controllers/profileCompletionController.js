import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";
import { generateToken } from "../utils/generateToken.js";

// Route to update student profile
export const completeProfile = asyncHandler(async (req, res) => {
  const { userID, name, rollNo, department, semester } = req.body;

  const student = await Student.findOne({ userID });
  if (!student) {
    res.status(400);
    throw new Error("Student not found");
  }

  if (!name || !rollNo || !department || !semester) {
    res.status(400);
    throw new Error("All fields are required to complete profile");
  }

  student.name = name;
  student.rollNo = rollNo;
  student.department = department;
  student.semester = semester;
  student.profileComplete = true;

  await student.save();

  const { password: _, ...studentData } = student._doc;
  const token = generateToken(student._id, student.role || "student");

  res.cookie("token", token, {
    httpOnly: true, // JS cannot access the token
    secure: false, // false for localhost; true in production HTTPS
    maxAge: 60 * 60 * 1000, // 1 hour
    sameSite: "lax", // helps prevent CSRF
  });

  res.status(200).json({
    user: studentData,
  });
});
