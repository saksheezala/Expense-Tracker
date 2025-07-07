import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getDashboardData } from "../controllers/Dashboard.controller.js";

const router = Router();

router.route("/").get(protect,getDashboardData);

export default router;