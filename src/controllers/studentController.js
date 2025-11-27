import Student from "../models/Student.js";
import bcrypt from "bcryptjs";

export const registerStudent = async (req, res) => {
  const { name, rollNo, department, semester, password } = req.body;

  const exists = await Student.findOne({ rollNo });
  if (exists) return res.status(400).json({ message: "Roll number exists" });

  const hash = await bcrypt.hash(password, 10);

  const student = await Student.create({
    name,
    rollNo,
    department,
    semester,
    password: hash
  });

  res.json(student);
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};
