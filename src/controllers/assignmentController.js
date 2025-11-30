import Assignment from "../models/Assignment.js";
import asyncHandler from "express-async-handler";

export const uploadAssignment = asyncHandler(async (req, res) => {
  const { subject, title, description, department, semester, dueDate } = req.body;

  const assignment = await Assignment.create({
    subject,
    title,
    description,
    file: req.file?.filename,
    department,
    semester,
    dueDate,
    createdBy: req.user._id,
  });

  res.status(201).json({
    message: "Assignment uploaded successfully",
    assignment
  });
});

export const getAssignments = asyncHandler(async (req, res) => {
  const user = req.user;
  let assignments;

  if (!user.role || user.role === "student") {
    assignments = await Assignment.find({
      department: user.department,
      semester: user.semester
    }).sort({ dueDate: 1 });

  } else if (user.role === "admin") {
    const { department, semester } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (semester) filter.semester = Number(semester);

    assignments = await Assignment.find(filter).sort({ dueDate: 1 });

  } else {
    res.status(403);
    throw new Error("Unauthorized");
  }

  res.status(200).json(assignments);
});