import Diary from "../models/Diary.js";
import asyncHandler from "express-async-handler";

// 
export const addDiary = asyncHandler(async (req, res) => {
  const { subject, topic, outline, department, semester } = req.body;

  if (!subject || !topic || !outline || !department || !semester) {
    return res.status(400).json({ message: "All fields are required" });
  }

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
  const { startDate, endDate, department: adminDept, semester: adminSem } = req.query;

  let filter = {};

  if (user.role === "student") {
    // Restrict by student's department & semester
    if (!user.department || !user.semester) {
      return res.status(400).json({ message: "Student profile incomplete" });
    }
    filter.department = user.department;
    filter.semester = user.semester;

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate + "T00:00:00Z"),
        $lte: new Date(endDate + "T23:59:59Z"),
      };
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      filter.createdAt = { $gte: today, $lt: tomorrow };
    }

  } else if (user.role === "admin") {
    if (adminDept) filter.department = adminDept;
    if (adminSem) filter.semester = adminSem;

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate + "T00:00:00Z"),
        $lte: new Date(endDate + "T23:59:59Z"),
      };
    }
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const diaries = await Diary.find(filter).sort({ createdAt: -1 });
  res.json(diaries);
});