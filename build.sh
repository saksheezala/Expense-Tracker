#!/bin/bash

# Build script for Render deployment
echo "Building Expense Tracker Frontend..."

# Navigate to frontend directory
cd frontend/expense-tracker

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Frontend build completed successfully!"
