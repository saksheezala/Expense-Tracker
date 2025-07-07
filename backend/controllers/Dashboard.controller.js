import {Expense} from '../models/Expense.model.js';
import {Income} from '../models/Income.model.js';
import { Types,isValidObjectId } from 'mongoose';
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const getDashboardData = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userObjectd = new Types.ObjectId(String(userId));

    //fetch total income and total expense
    const totalIncome = await Income.aggregate([
        {
            $match:{
                userId: userObjectd
            },
        },
        {
            $group:{
                _id: null,
                total : {$sum: "$amount"}
            }
        }
    ]);

    const totalExpense = await Expense.aggregate([
        {
            $match:{
                userId: userObjectd
            },
        },
        {
            $group:{
                _id: null,
                total : {$sum: "$amount"}
            }
        }
    ]);

    //get income transactions for the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
        userId,
        date:{
            $gte : new Date(Date.now()-60 * 24 * 60 * 60 * 1000) //last 60 days
        }
    }).sort({date: -1});

    //get total income for the last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
        (sum , transaction) => sum + transaction.amount, 0
    )

    //get expense transactions for the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
        userId,
        date:{
            $gte : new Date(Date.now()-30 * 24 * 60 * 60 * 1000) //last 30 days
        }
    }).sort({date: -1});

    //get total expense for the last 30 days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
        (sum , transaction) => sum + transaction.amount, 0
    );

    //fetch last 5 income transactions (income + expense)
    const lastTransactions = [
        ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: 'income'
            })
        ),
        ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: 'expense'
            })
        )
    ].sort((a, b) => b.date - a.date) //sort latest first

    res.status(200).json(
        new ApiResponse(200, {
           totalBalance:(totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
           totalIncome: totalIncome[0]?.total || 0,
           totalExpense: totalExpense[0]?.total || 0,
           last30DaysExpenses:{
              total: expenseLast30Days,
              transactions:last30DaysExpenseTransactions
            },
           last60DaysIncome:{
                total: incomeLast60Days,
                transactions:last60DaysIncomeTransactions
            },
            recentTransactions: lastTransactions
        }, "Dashboard data retrieved successfully")
    );
    
});

export{
    getDashboardData
}