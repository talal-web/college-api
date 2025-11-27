import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  image: { type: String },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
