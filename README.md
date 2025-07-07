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

## Deployment on Render

This application is configured for easy deployment on Render with both backend API and frontend static site.

### Quick Deploy (Recommended)

1. **Fork this repository** to your GitHub account
2. **Sign up/Login** to [Render](https://render.com)
3. **Connect your GitHub** account to Render
4. **Create a Blueprint** and select this repository
5. The `render.yaml` file will automatically set up:
   - Backend API service (Node.js)
   - Frontend static site
   - MongoDB database

### Manual Deployment

#### Backend API Service

1. Create a **Web Service** on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `expense-tracker-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

4. Add environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   CORS_ORIGIN=<your-frontend-url>
   ```

#### Frontend Static Site

1. Create a **Static Site** on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `expense-tracker-frontend`
   - **Build Command**: `cd frontend/expense-tracker && npm install && npm run build`
   - **Publish Directory**: `frontend/expense-tracker/dist`

4. Add environment variables:
   ```
   VITE_API_BASE_URL=<your-backend-api-url>
   ```

### Environment Variables Guide

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=8000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/saksheezala/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your values
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/expense-tracker
   cp .env.example .env
   # Edit .env with your backend URL
   npm install
   npm run dev
   ```

### API Endpoints

- `GET /api/health` - Health check
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/dashboard` - Dashboard data
- `GET /api/v1/income` - Get income records
- `POST /api/v1/income` - Add income record
- `GET /api/v1/expense` - Get expense records
- `POST /api/v1/expense` - Add expense record

