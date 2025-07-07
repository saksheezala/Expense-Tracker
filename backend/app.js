import express from "express"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000", 
        "https://expense-tracker.saksheezala.com", 
        process.env.CORS_ORIGIN
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}))


app.use(express.json({limit: "16kb"}))


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.error || [],
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    });
});

//routes import
import userRouter from "./routes/User.routes.js"
import incomeRouter from "./routes/Income.routes.js"
import expenseRouter from "./routes/Expense.routes.js"
import dashboardRouter from "./routes/Dashboard.routes.js"

// Use routes
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/income", incomeRouter)
app.use("/api/v1/expense", expenseRouter)
app.use("/api/v1/dashboard", dashboardRouter)

//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

app.get("/", (req, res) => {
    res.send("Expense Tracker API is running ");
  });
  

export { app }