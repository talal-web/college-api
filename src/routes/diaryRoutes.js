import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addDiary, getDiary } from "../controllers/diaryController.js";

const router = express.Router();

router.post("/add", protect, addDiary);
router.get("/", protect, getDiary);

export default router;
