import express from "express";
import upload from "../utils/upload.js";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", adminOnly, upload.single("image"), createEvent);
router.get("/", getEvents);

export default router;
