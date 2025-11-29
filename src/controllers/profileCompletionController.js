import Student from "../models/Student.js";

// Route to update student profile
export const completeProfile = async (req, res) => {
  try {
    const { userID, name, rollNo, department, semester } = req.body;

    const student = await Student.findOne({ userID });
    if (!student) return res.status(400).json({ message: "Student not found" });

    student.name = name;
    student.rollNo = rollNo;
    student.department = department;
    student.semester = semester;

    await student.save();

    const { password: _, ...studentData } = student._doc;
    res.json({ message: "Profile updated", student: studentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
