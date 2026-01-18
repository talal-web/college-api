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
