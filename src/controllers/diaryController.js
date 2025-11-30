import Diary from "../models/Diary.js";
import asyncHandler from "express-async-handler";

export const addDiary = asyncHandler(async (req, res) => {
  const { subject, topic, outline, department, semester } = req.body;

  const diary = await Diary.create({
    subject,
    topic,
    outline,
    department,
    semester,
    createdBy: req.user._id,
  });

  res.status(201).json({ message: "Diary created successfully", diary });
});

// Get Diary
export const getDiary = asyncHandler(async (req, res) => {
  const user = req.user;
  let diaries;

  if (!user.role || user.role === "student") {
    if (!user.department || !user.semester) {
      return res.status(400).json({ message: "Student profile incomplete" });
    }

    diaries = await Diary.find({
      department: user.department,
      semester: user.semester,
    }).sort({ createdAt: -1 });
  }
  else if (user.role === "admin") {
    const { department, semester } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (semester) filter.semester = semester;

    diaries = await Diary.find(filter).sort({ createdAt: -1 });
  }
  else {
    return res.status(403).json({ message: "Unauthorized" });
  }

  res.json(diaries);
});
