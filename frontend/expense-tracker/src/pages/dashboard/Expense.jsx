import React ,{useState}from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import ExpenseOverview from '../../components/expense/ExpenseOverview';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/expense/AddExpenseForm';
import ExpenseList from '../../components/expense/ExpenseList';
import DeleteAlert from '../../components/income/DeleteAlert';

const Expense = () => {
  useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show : false,
      data : null,
    });
      
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    //get all expense transactions
  const fetchExpenseTransactions = async () => {
    if(loading) return;
    setLoading(true);
    
    try {
     const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_EXPENSES}`)
      if(response.data.data && response.data.data.expenses){
        setExpenseData(response.data.data.expenses); 
      }
    } catch (error) {
      console.error("Error fetching expense transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  //add income transaction
  const addExpenseTransaction = async (expense) => {
    const {category, amount, date, icon} = expense;

    //validate income data
    if(!category.trim()){
      toast.error("Expense category is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Expense amount should be greater than 0");
      return;
    }

    if(!date){
      toast.error("Expense date is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
        category,
        amount,
        date,
        icon
      });

      toast.success("expense transaction added successfully");
      setOpenAddExpenseModal(false);
      fetchExpenseTransactions(); // Refresh the expense transactions list
    } catch (error) {
      console.error("Error adding expense transaction:", error);
      toast.error("Failed to add expense transaction");
    }
  }
  //delete expense transaction
  const deleteExpenseTransaction = async (id) => {
    
    if (!id || id === 'undefined') {
      toast.error("Invalid expense ID");
      setOpenDeleteAlert({show: false, data: null});
      return;
    }

    try {

      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Expense transaction deleted successfully");
      fetchExpenseTransactions();
    } catch (error) {
      toast.error("Failed to delete expense transaction");
      setOpenDeleteAlert({show: false, data: null});
    }
  }

  //handle download expense transactions
  const handleDownloadExpenseTransactions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,{
        responseType: 'blob' // Important for downloading files
      })
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense.xlsx'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); 
      toast.success("Expense transactions downloaded successfully");
    } catch (error) {
      console.error("Error downloading expense transactions:", error);
      toast.error("Failed to download expense transactions");
    }
  }

   useEffect(() => {
      fetchExpenseTransactions();
    },[])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'> 
        <div className='grid grid-cols-1  gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              console.log("ExpenseList onDelete called with ID:", id);
              setOpenDeleteAlert({show: true, data: id});
            }}
            onDownload={handleDownloadExpenseTransactions}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense Transaction"
        >
          <AddExpenseForm onAddExpense={addExpenseTransaction}/>
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense transaction?"
            onDelete={() => {
              console.log("DeleteAlert onDelete called with openDeleteAlert.data:", openDeleteAlert.data);
              deleteExpenseTransaction(openDeleteAlert.data);
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense