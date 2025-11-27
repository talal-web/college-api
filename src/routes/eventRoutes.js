import express from "express";
import upload from "../utils/upload.js";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, upload.single("image"), createEvent);
router.get("/", getEvents);

export default router;
