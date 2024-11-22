import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TransactionStatistics() {
  const { month } = useParams();  
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthNumber = months.indexOf(month) + 1; 

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/statistics?month=${monthNumber}`);
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStatistics({
          totalSale: data.totalSaleAmount || 0,
          totalSoldItems: data.soldItems || 0,
          totalNotSoldItems: data.notSoldItems || 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [monthNumber]); 

  if (loading) {
    return <div className="text-center text-gray-600 text-xl">Loading statistics...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-8">
      <div className="w-full max-w-3xl bg-yellow-300 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Statistics - {month}
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between text-lg font-semibold text-gray-700">
            <span>Total Sale</span>
            <span className="text-xl font-bold text-green-600">{statistics.totalSale}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-gray-700">
            <span>Total Sold Items</span>
            <span className="text-xl font-bold text-blue-600">{statistics.totalSoldItems}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-gray-700">
            <span>Total Not Sold Items</span>
            <span className="text-xl font-bold text-red-600">{statistics.totalNotSoldItems}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionStatistics;
