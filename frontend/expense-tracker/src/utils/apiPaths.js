export const BASE_URL = "https://expense-tracker-xg2z.onrender.com";

export const API_PATHS = {
    AUTH:{
        LOGIN : "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER: "/api/v1/auth/getUser",
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard"
    },
    INCOME:{
        ADD_INCOME: "/api/v1/income/add",
        GET_INCOMES: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/download-report",
    },
    EXPENSE:{
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_EXPENSES: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/download-report",
    },
    IMAGE:{
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    }
}