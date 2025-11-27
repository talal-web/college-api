import express from "express";
import { registerStudent, getStudents } from "../controllers/studentController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", protect, adminOnly, registerStudent);
router.get("/", protect, adminOnly, getStudents);

export default router;
