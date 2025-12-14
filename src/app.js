import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";
import { protect } from "./middlewares/authMiddleware.js"; // your JWT auth

import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import diaryRoutes from "./routes/diaryRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import productRoutes from "./routes/productRoutes.js"

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true  // important for cookies/sessions
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Optional: attach req.user before logging (only for authenticated routes)

// Morgan request logging with user info
app.use(morgan((tokens, req, res) => {
  const userId = req.user?._id || "Guest";
  const role = req.user?.role || "Guest";

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    "-",
    tokens['response-time'](req, res), "ms",
    `user:${role}:${userId}`
  ].join(' ');
}, {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", protect, adminRoutes);
app.use("/api/students", protect, studentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/diary", protect, diaryRoutes);
app.use("/api/assignments", protect,  assignmentRoutes);
app.use("/api/product", protect, productRoutes);

app.get("/", (req, res) => res.send("College Backend Running..."));

// Global error handler
app.use(errorHandler);

export default app;
