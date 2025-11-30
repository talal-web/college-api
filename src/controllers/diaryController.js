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
    const user = req.user; // from JWT middleware

    let diaries;

    if (!user.role || user.role === "student") {
      // Student: only get diaries for their department + semester
      if (!user.department || !user.semester) {
        return res.status(400).json({ message: "Student profile incomplete" });
      }

      diaries = await Diary.find({
        department: user.department,
        semester: user.semester
      }).sort({ createdAt: -1 });

    } else if (user.role === "admin") {
      // Admin: get all diaries or filter by query params
      const { department, semester } = req.query; // optional filters
      const filter = {};

      if (department) filter.department = department;
      if (semester) filter.semester = semester;

      diaries = await Diary.find(filter).sort({ createdAt: -1 });
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(diaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

