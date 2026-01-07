import Assignment from "../models/Assignment.js";
import asyncHandler from "express-async-handler";
import { uploadToCloudinary } from "../utils/upload.js";

export const uploadAssignment = asyncHandler(async (req, res) => {
  const { subject, title, description, department, semester, dueDate } =
    req.body;

  let fileUrl = null;

  if (req.file) {
    fileUrl = await uploadToCloudinary(req.file.buffer, "assignments");
  }

  const assignment = await Assignment.create({
    subject,
    title,
    description,
    file: fileUrl,
    department,
    semester,
    dueDate,
    createdBy: req.user._id,
  });

  res.status(201).json({
    message: "Assignment uploaded successfully",
    assignment,
  });
});

export const getAssignments = asyncHandler(async (req, res) => {
  const user = req.user;
  let assignments;

  // Get today & remove time (00:00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!user.role || user.role === "student") {
    assignments = await Assignment.find({
      department: user.department,
      semester: user.semester,
      dueDate: { $gte: today }, // 👈 SHOW ONLY TODAY OR FUTURE
    }).sort({ dueDate: 1 });
  } else if (user.role === "admin") {
    const { department, semester } = req.query;

    const filter = {
      dueDate: { $gte: today }, // 👈 ADMIN ALSO SEES ONLY ACTIVE ASSIGNMENTS
    };

    if (department) filter.department = department;
    if (semester) filter.semester = Number(semester);

    assignments = await Assignment.find(filter).sort({ dueDate: 1 });
  } else {
    res.status(403);
    throw new Error("Unauthorized");
  }

  res.status(200).json(assignments);
});
