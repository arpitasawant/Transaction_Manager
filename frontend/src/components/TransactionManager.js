import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";  
import SearchBar from "./SearchBar";
import TransactionTable from "./TransactionTable";
import Pagination from "./Pagination";
import Header from "./Header";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function TransactionManager() {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const navigate = useNavigate();  

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/transactions?month=${selectedMonth}&page=${page}&perPage=${perPage}&search=${searchText}`
      );
      const data = await response.json();
      if (data.transactions) {
        setTransactions(data.transactions);
      } else {
        setTransactions([]); 
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]); 
    }
  }, [selectedMonth, page, perPage, searchText]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

 
  const handleViewStatistics = () => {
    navigate(`/statistics/${selectedMonth}`);
  };

  
  const handleViewBarChart = () => {
    navigate(`/barchart/${selectedMonth}`);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-[#EDF6F6]">
      <Header />
      
      <div className="w-full flex items-center justify-between space-x-4">
       
        <button
          onClick={handleViewStatistics}
          className="p-2 bg-yellow-500 text-white rounded-md"
        >
          View Transaction Statistics
        </button>

        <div className="flex-grow flex justify-center items-center space-x-4">
          <SearchBar
            months={months} 
            searchText={searchText}
            setSearchText={setSearchText}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>

        <button
          onClick={handleViewBarChart}
          className="p-2 bg-green-500 text-white rounded-md"
        >
          View Bar Chart
        </button>
      </div>

      <div className="mt-8">
        <TransactionTable transactions={transactions} />
      </div>

      <Pagination page={page} setPage={setPage} />
    </div>
  );
}

export default TransactionManager;
