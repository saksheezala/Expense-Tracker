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

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/expense-tracker
   npm install
   ```

4. **Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your-jwt-secret-key
   CORS_ORIGIN=http://localhost:5173
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend/expense-tracker
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Dashboard
- `GET /api/dashboard` - Get dashboard analytics

### Income
- `GET /api/income` - Get all income records
- `POST /api/income` - Create new income record
- `DELETE /api/income/:id` - Delete income record
- `GET /api/income/download` - Download income report

### Expenses
- `GET /api/expenses` - Get all expense records
- `POST /api/expenses` - Create new expense record
- `DELETE /api/expenses/:id` - Delete expense record
- `GET /api/expenses/download` - Download expense report

## Features Overview

### Dashboard
- Financial overview with key metrics
- Recent transactions display
- Income vs expense charts
- Monthly expense trends

### Income Management
- Add income with source, amount, and date
- View income history with search and filter
- Download income reports as Excel files
- Visual income analytics

### Expense Management
- Categorized expense tracking
- Expense overview with charts
- Monthly expense breakdowns
- Export functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/expense-tracker](https://github.com/yourusername/expense-tracker)
