import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Expense} from "../models/Expense.model.js";
import xlsx from "xlsx";

const addExpense = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {icon, category, amount, date} = req.body;

    // Validate required fields
    if (!category || !amount || !date) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const newExpense = await Expense.create({
        userId,
        icon,
        category,
        amount,
        date: new Date(date)
    });

    await newExpense.save();

    res.status(201).json(
        new ApiResponse(201, {
            expense: {
                id: newExpense._id,
                icon: newExpense.icon,
                category: newExpense.category,
                amount: newExpense.amount,
                date: newExpense.date
            }
        }, "Expense added successfully")
    );
});

const getAllExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const expenses = await Expense.find({userId}).sort({date: -1});

    if (!expenses || expenses.length === 0) {
        throw new ApiError(404, "No expenses found");
    }

    res.status(200).json(
        new ApiResponse(200, {
            expenses: expenses.map(expense => ({
                id: expense._id,
                icon: expense.icon,
                category: expense.category,
                amount: expense.amount,
                date: expense.date
            }))
        }, "Expenses retrieved successfully")
    );
});

const deleteExpense = asyncHandler(async (req, res) => {
     await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json(
            new ApiResponse(200, {}, "Expense deleted successfully")
    );
});

const downloadExpenseReport = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    if (!expenses || expenses.length === 0) {
        throw new ApiError(404, "No expenses found");
    }

    // Prepare data
    const data = expenses.map((expenses) => ({
        Source: expenses.category,
        Amount: expenses.amount,
        Date: expenses.date.toISOString().split("T")[0] 
    }));

    // Create workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expenses");
    xlsx.writeFile(wb, 'expense.xlsx');

    res.download('expense.xlsx')
});

export {
    addExpense,
    getAllExpenses,
    deleteExpense,
    downloadExpenseReport
};