import Router from "express";
import { registerAdmin } from "../controllers/adminController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = Router();

router.post("/register", adminOnly, registerAdmin);

export default router;