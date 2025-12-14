import express from "express";
import { getMe, login } from "../controllers/authController.js";
import { completeProfile } from "../controllers/profileCompletionController.js";

const router = express.Router();

router.post("/login", login);
router.post("/profile/complete", completeProfile);
router.get("/verify", (req, res) => {
  res.json({
    success: true,
    role: req.user.role,
  });
});

router.get("/me", getMe);


export default router;
