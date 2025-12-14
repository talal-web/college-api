import express from "express";
import { addDiary, getDiary } from "../controllers/diaryController.js";
import {adminOnly} from "../middlewares/adminMiddleware.js"

const router = express.Router();

router.post("/add", adminOnly, addDiary);
router.get("/", getDiary);

export default router;
