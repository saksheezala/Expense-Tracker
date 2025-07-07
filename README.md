# Expense Tracker

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB. Track your income and expenses with beautiful charts and analytics.

## Features

- 📊 **Dashboard Analytics**: Visual overview of your financial data with charts
- 💰 **Income Tracking**: Add, view, and manage income sources
- 💸 **Expense Management**: Track and categorize your expenses
- 📈 **Data Visualization**: Interactive charts using Recharts
- 📱 **Responsive Design**: Beautiful UI built with Tailwind CSS
- 📄 **Export Reports**: Download income/expense reports as Excel files
- 🔐 **User Authentication**: Secure login and registration
- 🖼️ **Profile Management**: Upload and manage profile pictures

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **XLSX** - Excel file generation
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Project Structure

```
expense-tracker/
├── backend/                    # Node.js backend
│   ├── controllers/           # Route handlers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middlewares/          # Custom middleware
│   ├── db/                   # Database configuration
│   └── utils/                # Utility functions
├── frontend/expense-tracker/  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
└── README.md
```

