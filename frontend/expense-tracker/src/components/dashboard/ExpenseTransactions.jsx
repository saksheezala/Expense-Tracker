import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'

const ExpenseTransactions = ({transactions , onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between '>
        <h5 className='text-lg'>Expenses</h5>

        <button className='card-btn' onClick={onSeeMore}>
            See All <LuArrowRight className='text-base'/>
        </button>
        </div>
        {transactions?.slice(0,5).map((expense) => {
                return <TransactionInfoCard
                    key={expense._id}
                    title={expense.type === "expense" ? expense.category : expense.source}
                    icon={expense.icon}
                    date={moment(expense.createdAt).format('DD MMM, YYYY')}
                    amount={expense.amount}
                    type={expense.type}
                    hideDeleteBtn
                />
            })}
        <div className='mt-6'>

        </div>
    </div>
  )
}

export default ExpenseTransactions