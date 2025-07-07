import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/income/IncomeOverview'
import IncomeList from '../../components/income/IncomeList'
import DeleteAlert from '../../components/income/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/income/AddIncomeForm';
import toast from 'react-hot-toast';

const Income = () => {
  useUserAuth(); // Add this to ensure user authentication

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show : false,
    data : null,
  });
    
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //get all income transactions
  const fetchIncomeTransactions = async () => {
    if(loading) return;
    setLoading(true);
    
    try {
     const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_INCOMES}`)
      if(response.data.data && response.data.data.incomes){
        console.log("Fetched income data:", response.data.data.incomes);
        setIncomeData(response.data.data.incomes); 
      }
    } catch (error) {
      console.error("Error fetching income transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  //add income transaction
  const addIncomeTransaction = async (income) => {
    const {source, amount, date, icon} = income;

    //validate income data
    if(!source.trim()){
      toast.error("Income source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Income amount should be greater than 0");
      return;
    }

    if(!date){
      toast.error("Income date is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon
      });

      toast.success("Income transaction added successfully");
      setOpenAddIncomeModal(false);
      fetchIncomeTransactions(); // Refresh the income transactions list
    } catch (error) {
      console.error("Error adding income transaction:", error);
      toast.error("Failed to add income transaction");
    }
  }

  //delete income transaction
  const deleteIncomeTransaction = async (id) => {
    
    if (!id || id === 'undefined') {
      toast.error("Invalid income ID");
      setOpenDeleteAlert({show: false, data: null});
      return;
    }

    try {

      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income transaction deleted successfully");
      fetchIncomeTransactions();
    } catch (error) {
      console.error("Error deleting income transaction:", error);
      toast.error("Failed to delete income transaction");
      setOpenDeleteAlert({show: false, data: null});
    }
  }

  //handle download income transactions
  const handleDownloadIncomeTransactions = async () => {
     try {
          const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,{
            responseType: 'blob' // Important for downloading files
          })
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'income.xlsx'); 
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
    fetchIncomeTransactions();
  },[])

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              console.log("IncomeList onDelete called with ID:", id);
              setOpenDeleteAlert({show: true, data: id});
            }}
            onDownload={handleDownloadIncomeTransactions}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={addIncomeTransaction}/>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income transaction?"
            onDelete={() => {
              console.log("DeleteAlert onDelete called with openDeleteAlert.data:", openDeleteAlert.data);
              deleteIncomeTransaction(openDeleteAlert.data);
            }}
          />
        </Modal>
        
      </div>
      </DashboardLayout>
  )
}

export default Income