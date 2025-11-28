import express from "express";
import upload from "../utils/upload.js";
import { uploadAssignment, getAssignments } from "../controllers/assignmentController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.post("/upload", protect, adminOnly, upload.single("file"), uploadAssignment);
router.get("/", protect, getAssignments);

export default router;
