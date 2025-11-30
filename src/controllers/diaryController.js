import Diary from "../models/Diary.js";

export const addDiary = async (req, res) => {
  try {
    const { subject, topic, outline, department, semester } = req.body;

    const diary = await Diary.create({
      subject,
      topic,
      outline,
      department,
      semester,
      createdBy: req.user._id
    });

    res.status(201).json({ message: "Diary created successfully", diary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDiary = async (req, res) => {
  try {
    const student = req.user; // from student JWT middleware

    // Only diaries for student's department + semester
    const diaries = await Diary.find({
      department: student.department,
      semester: student.semester
    }).sort({ createdAt: -1 });

    res.json(diaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

