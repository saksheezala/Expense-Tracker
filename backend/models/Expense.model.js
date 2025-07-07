import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        icon:{
            type: String
        },
        category:{
            type: String,
            required: true,
        },//ex: Food, Transport, etc.
        amount:{
            type: Number,
            required: true, 
        },
        date:{
            type: Date,
            default: Date.now,
        }
    },{timestamps: true}
)

export const Expense = mongoose.model("Expense", expenseSchema);