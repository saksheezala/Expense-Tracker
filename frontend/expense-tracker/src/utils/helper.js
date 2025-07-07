import moment from "moment";

export const validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const getInitials = (name) =>{
    if(!name) return "";

    const words = name.split(" ");

    let initials = "";

    for(let i =0 ;i<Math.min(words.length, 2); i++){
        initials += words[i].charAt(0).toUpperCase();
    }
    return initials;
}

export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, decimalPart] = num.toString().split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}

export const prepareExpenseBarChartData = (data = []) =>{
    const chartData = data.map((item) =>({
        category : item.category,
        amount : item.amount
    }))

    return chartData;
}

export const prepareIncomeBarChartData = (data = []) =>{
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        category : moment(item?.date).format('DD MMM'),
        amount : item?.amount,
        source : item?.source
    }));

    return chartData;
}

export const prepareIncomeLineChartData = (data = []) => {
   const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

   const chartData = sortedData.map((item) => ({
       month: moment(item?.date).format('DD MMM'),
       category: item?.category,
       amount: item?.amount
   }));

   return chartData;
}