import express from "express";
import upload from "../utils/upload.js";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, upload.single("image"), createEvent);
router.get("/", getEvents);

export default router;
