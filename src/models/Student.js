import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  name: { type: String},
  rollNo: { type: String},
  department: { type: String},
  semester: { type: Number},
  image: { type: String },
  password: { type: String, required: true},
  profileComplete: { type: Boolean, default: false}
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
