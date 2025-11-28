import express from "express";
import { registerStudent, getStudents } from "../controllers/studentController.js";
import { protect} from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";


const router = express.Router();

router.post("/register", protect, adminOnly, registerStudent);
router.get("/", protect, adminOnly, getStudents);

export default router;
