import express from "express";
import { getMe, login } from "../controllers/authController.js";
import { completeProfile } from "../controllers/profileCompletionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/profile/complete", completeProfile);
router.get("/verify", (req, res) => {
  res.json({
    success: true,
    role: req.user.role,
  });
});

router.get("/me", protect, getMe);


export default router;
