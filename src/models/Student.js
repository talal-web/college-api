import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  name: { type: String},
  rollNo: { type: String},
  department: { type: String},
  semester: { type: Number},
  role: { type: String, default: "student" },
  image: { type: String },
  profileComplete: { type: Boolean, default: false}
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
