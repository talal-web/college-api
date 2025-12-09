import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  outline: { type: [String], required: true }, // array of main points/headlines
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }
}, { timestamps: true });

export default mongoose.model("Diary", diarySchema);
