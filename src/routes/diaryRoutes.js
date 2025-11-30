import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addDiary, getDiary } from "../controllers/diaryController.js";
import {adminOnly} from "../middlewares/adminMiddleware.js"

const router = express.Router();

router.post("/add", protect, adminOnly, addDiary);
router.get("/", protect, getDiary);

export default router;
