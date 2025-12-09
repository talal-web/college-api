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

  // Check if userID already exists
  const exists = await Student.findOne({ userID });
  if (exists) {
    res.status(400);
    throw new Error("Student already exists");
  }

  // Hash the password
  const hash = await bcrypt.hash(password, 10);

  // Create new student
  const student = await Student.create({
    userID,
    name,
    rollNo,
    department,
    semester,
    password: hash
  });
  
  // Update profileComplete if all info exists
  if (name && rollNo && department && semester) {
    await Student.findOneAndUpdate(
      { userID },               // <-- Correct query
      { profileComplete: true }
    );
  }

  res.status(201).json({
    message: "Student registered successfully",
    student
  });
});

// Get all students
export const getStudents = asyncHandler(async (req, res) => {
  const { search, department, semester } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { userID: { $regex: search, $options: "i" } },
      { rollNo: { $regex: search, $options: "i" } },
    ];
  }

  if (department) query.department = department;
  if (semester) query.semester = semester;

  const students = await Student.find(query).sort({ userID: 1 });

  const safeStudents = students.map((s) => ({
    userID: s.userID,
    name: s.name,
    rollNo: s.rollNo,
    department: s.department,
    semester: s.semester,
    profileComplete: s.profileComplete
  }));

  res.status(200).json(safeStudents);
});