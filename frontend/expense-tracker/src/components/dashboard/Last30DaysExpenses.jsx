import React, { useEffect } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../charts/CustomBarChart';

const Last30DaysExpenses = ({transactions}) => {
    const [chartData, setChartData] = React.useState([]);

    useEffect(() =>{
        if (transactions && transactions.length > 0) {
            const result = prepareExpenseBarChartData(transactions);
            setChartData(result);
        } else {
            setChartData([]);
        }
    }, [transactions])
  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between '>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>
    
       <CustomBarChart data={chartData}/>

    </div>
  )
}

export default Last30DaysExpenses