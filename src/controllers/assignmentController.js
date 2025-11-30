import Assignment from "../models/Assignment.js";

export const uploadAssignment = async (req, res) => {
  try {
    const { subject, title, description, department, semester, dueDate } = req.body;

    // Assuming you have admin info in req.user from auth middleware
    const assignment = await Assignment.create({
      subject,
      title,
      description,
      file: req.file?.filename, // multer file
      department,
      semester,
      dueDate,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Assignment uploaded successfully", assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const user = req.user;

    let assignments;

    if (!user.role || user.role === "student") {
      
      assignments = await Assignment.find({
        department: user.department,
        semester: user.semester
      }).sort({ dueDate: 1 });

    } else if (user.role === "admin") {
      const { department, semester } = req.query;
      const filter = {};
      if (department) filter.department = department;
      if (semester) filter.semester = Number(semester);

      assignments = await Assignment.find(filter).sort({ dueDate: 1 });
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
