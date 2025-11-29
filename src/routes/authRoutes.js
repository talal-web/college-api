import express from "express";
import { login } from "../controllers/authController.js";
import { completeProfile } from "../controllers/profileCompletionController.js";

const router = express.Router();

router.post("/login", login);
router.post("/profile/complete", completeProfile);

export default router;
