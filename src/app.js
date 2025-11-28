import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/diary", diaryRoutes);
app.use("/api/assignments", assignmentRoutes);

app.get("/", (req, res) => {
  res.send("College Backend Running...");
});

export default app;
