import express from "express";
import {
  getContactMessages,
  sendContactMessage,
} from "../controllers/contactController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", sendContactMessage);
router.get("/view", adminOnly, getContactMessages);

export default router;
