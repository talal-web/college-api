import Router from "express";
import { registerAdmin } from "../controllers/adminController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", protect, adminOnly, registerAdmin);

export default router;