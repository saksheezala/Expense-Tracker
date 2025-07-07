import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseReport,
}from "../controllers/Expense.controller.js";

const router = Router();

router.route("/add").post(protect,addExpense);
router.route("/get").get(protect,getAllExpenses);
router.route("/:id").delete(protect,deleteExpense);
router.route("/download-report").get(protect,downloadExpenseReport);

export default router;