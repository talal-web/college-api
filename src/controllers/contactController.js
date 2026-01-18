import asyncHandler from "express-async-handler";
import { Contact } from "../models/Contact.js";

/**
 * @desc    Student sends a contact message
 * @route   POST /api/contact
 * @access  Private (Student)
 */
export const sendContactMessage = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  const studentId = req.user._id;

  if (!message) {
    res.status(400);
    throw new Error("Message is required");
  }

  const contact = await Contact.create({
    studentId,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: contact,
  });
});

/**
 * @desc    Admin gets all contact messages
 * @route   GET /api/admin/contacts
 * @access  Private (Admin)
 */
export const getContactMessages = asyncHandler(async (req, res) => {
  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const total = await Contact.countDocuments();

  const messages = await Contact.find()
    .populate("studentId", "name  userID department semester") // include student name & roll
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: messages,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  });
});
