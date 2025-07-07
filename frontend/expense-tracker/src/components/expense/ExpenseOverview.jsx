import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import {prepareIncomeLineChartData} from '../../utils/helper'
import CustomLineChart from '../charts/CustomLineChart'

const ExpenseOverview = ({transactions,onExpenseIncome}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() =>{
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    },[transactions])
  return (
    <div className='card'>
    <div className='flex items-center justify-between '>
        <div className=''>
            <h5 className='text-lg'> Expense Overview</h5>
            <p className='text-sx text-gray-400 mt-0.5'> 
                Track your spending over time and analyze your expense trends.
            </p>
        </div>

        <button className='add-btn' onClick={onExpenseIncome}>
            <LuPlus className='text-lg'/>
            Add Expense
        </button>
    </div>
      
    <div className='mt-10'>
       <CustomLineChart data={chartData}/>
    </div>
  </div>
  )
}

export default ExpenseOverview
