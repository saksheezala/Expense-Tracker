import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Income} from "../models/Income.model.js";
import xlsx from "xlsx";

const addIncome = asyncHandler(async (req , res) =>{
    const userId = req.user._id;
    const {icon, source, amount, date} = req.body;

    //validate required fields
    if(!source || !amount || !date){
        throw new ApiError(400, "Please provide all required fields");
    }

    const newIncome = await Income.create({
        userId,
        icon,
        source,
        amount,
        date: new Date(date)
    });

    await newIncome.save();

    res.status(201).json(
        new ApiResponse(201, {
            income: {
                id: newIncome._id,
                icon: newIncome.icon,
                source: newIncome.source,
                amount: newIncome.amount,
                date: newIncome.date
            }
        }, "Income added successfully")
    );
})

const getAllIncomes = asyncHandler(async (req , res) =>{
    const userId = req.user._id;

    const incomes = await Income.find({userId}).sort({date: -1});

    if(!incomes || incomes.length === 0){
        throw new ApiError(404, "No incomes found");
    }

    res.status(200).json(
        new ApiResponse(200, {
            incomes: incomes.map(income => ({
                id: income._id,
                icon: income.icon,
                source: income.source,
                amount: income.amount,
                date: income.date
            }))
        }, "Incomes retrieved successfully")
    );
})

const deleteIncome = asyncHandler(async (req , res) =>{
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json(
        new ApiResponse(200, {}, "Income deleted successfully")
    );
})

const downloadIncomeReport = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const incomes = await Income.find({ userId }).sort({ date: -1 });

    if (!incomes || incomes.length === 0) {
        throw new ApiError(404, "No incomes found");
    }

    // Prepare data
    const data = incomes.map(income => ({
        Source: income.source,
        Amount: income.amount,
        Date: income.date.toISOString().split("T")[0] // Format date nicely
    }));

    // Create workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");
    xlsx.writeFile(wb, 'income.xlsx');

    res.download('income.xlsx')
});

export {    
    addIncome,
    getAllIncomes,
    deleteIncome,
    downloadIncomeReport
};