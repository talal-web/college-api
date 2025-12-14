import express from "express";
import upload from "../utils/upload.js";
import { uploadAssignment, getAssignments } from "../controllers/assignmentController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.post("/upload", adminOnly, upload.single("file"), uploadAssignment);
router.get("/", getAssignments);

export default router;
