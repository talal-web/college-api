import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  subject: String,
  description: String,
  file: String,
  dueDate: Date
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
