import Diary from "../models/Diary.js";

export const addDiary = async (req, res) => {
  const diary = await Diary.create({
    studentId: req.user._id,
    content: req.body.content,
    date: new Date()
  });

  res.json(diary);
};

export const getDiary = async (req, res) => {
  const entries = await Diary.find({ studentId: req.user._id });
  res.json(entries);
};
