import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String},
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);
