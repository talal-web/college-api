import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  content: String,
  date: Date
}, { timestamps: true });

export default mongoose.model("Diary", diarySchema);
