import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BarChart() {
    const { month } = useParams();  
    const [data, setData] = useState({});

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthNumber = months.indexOf(month) + 1; 

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/chart/bar-chart?month=${monthNumber}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [monthNumber]); 

    const ranges = [
        '0-100', '101-200', '201-300', '301-400', '401-500', 
        '501-600', '601-700', '701-800', '801-900', '901+'
    ];

    return (
        <div className="p-8 bg-[#e0f7f9]">
            <h1 className="text-3xl font-bold mb-2">Bar Chart Stats - {month}</h1>
            <p className="text-gray-600 mb-4">(Showing data for {month})</p>

            {/* Bar chart container */}
            <div className="flex items-end h-64 space-x-4 relative">
                {/* Y-axis */}
                <div className="absolute left-0 top-0 flex flex-col justify-between h-full">
                    <div className="text-sm text-gray-600">10</div>
                    <div className="text-sm text-gray-600">8</div>
                    <div className="text-sm text-gray-600">6</div>
                    <div className="text-sm text-gray-600">4</div>
                    <div className="text-sm text-gray-600">2</div>
                    <div className="text-sm text-gray-600">0</div>
                </div>

                {ranges.map((range, index) => {
                    const barHeight = data[range] || 0; 
                    const scaledHeight = (barHeight / 1000) * 10 * 50; 
                    const height = scaledHeight > 0 ? scaledHeight : 10; 
                    
                    return (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className="bar bg-teal-400"
                                style={{
                                    height: `${height}px`, 
                                    width: '50px',
                                    margin: '0 10px'
                                }}
                            ></div>
                            <span className="mt-2 text-sm">{range}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BarChart;


