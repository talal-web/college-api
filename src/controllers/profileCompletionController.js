import Student from "../models/Student.js";
import { generateToken } from "../utils/generateToken.js";

// Route to update student profile
export const completeProfile = async (req, res) => {
  try {
    const { userID, name, rollNo, department, semester } = req.body;

    const student = await Student.findOne({ userID });
    if (!student) return res.status(400).json({ message: "Student not found" });

    if (!name || !rollNo || !department || !semester) {
      return res.status(400).json({
        message: "All fields are required to complete profile",
        profileComplete: student.profileComplete
      });
    }

    student.name = name;
    student.rollNo = rollNo;
    student.department = department;
    student.semester = semester;
    student.profileComplete = true;

    await student.save();

    const { password: _, ...studentData } = student._doc;
    res.json({
      token: generateToken(student._id, student.role || "student"),
      student: studentData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
