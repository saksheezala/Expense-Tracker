import React from 'react'
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ["#875CF7" , "#FA2C37" , "#FA6900"];

const FinanceOverview = ({totalBalance , totalIncome , totalExpense}) => {
    const balanceData = [
        {name :"Total Balance" , amount:totalBalance},
        {name :"Total Income" , amount:totalIncome},
        {name :"Total Expense" , amount:totalExpense},
    ]
  return (
    <div className='card'>
        <div className='flex items-center justify-between '>
            <h5 className='text-lg'>Finance Overview</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            label="Total Balance"
            colors={COLORS}
            className="mt-6"
            totalAmount={`₹${totalBalance}`}     
            showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview