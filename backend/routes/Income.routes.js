import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    addIncome,
    getAllIncomes,
    deleteIncome,
    downloadIncomeReport,
}from "../controllers/Income.controller.js";

const router = Router();

router.route("/add").post(protect,addIncome);
router.route("/get").get(protect,getAllIncomes);
router.route("/:id").delete(protect,deleteIncome);
router.route("/download-report").get(protect,downloadIncomeReport);

export default router;