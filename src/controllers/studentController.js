import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";

// Register a new student
export const registerStudent = asyncHandler(async (req, res) => {
  const { userID, name, rollNo, department, semester, password } = req.body;

  if (!userID || !password) {
    res.status(400);
    throw new Error("userID and password are required");
  }

  const exists = await Student.findOne({ userID });
  if (exists) {
    res.status(400);
    throw new Error("Student already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const student = await Student.create({
    userID,
    name,
    rollNo,
    department,
    semester,
    password: hash
  });

  res.status(201).json({
    message: "Student registered successfully",
    student
  });
});

// Get all students
export const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().sort({ userID: 1 });
  res.status(200).json(students);
});
