import express from "express";
import { registerStudent, getStudents } from "../controllers/studentController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";


const router = express.Router();

router.post("/register", adminOnly, registerStudent);
router.get("/", adminOnly, getStudents);

export default router;
