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
  res.status(200).json({
    token: generateToken(student._id, student.role || "student"),
    student: studentData
  });
});
