import Assignment from "../models/Assignment.js";

export const uploadAssignment = async (req, res) => {
  const assignment = await Assignment.create({
    subject: req.body.subject,
    description: req.body.description,
    file: req.file?.filename,
    dueDate: req.body.dueDate,
  });

  res.json(assignment);
};

export const getAssignments = async (req, res) => {
  const list = await Assignment.find();
  res.json(list);
};
