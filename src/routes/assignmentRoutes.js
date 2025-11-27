import express from "express";
import upload from "../utils/upload.js";
import { uploadAssignment, getAssignments } from "../controllers/assignmentController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, adminOnly, upload.single("file"), uploadAssignment);
router.get("/", protect, getAssignments);

export default router;
