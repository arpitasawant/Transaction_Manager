import React from "react";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

function SearchBar({ searchText, setSearchText, selectedMonth, setSelectedMonth }) {
  return (
    <div className="flex space-x-4 mb-8">
      <input
  type="text"
  placeholder="Search transaction"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  className="bg-yellow-400 rounded-full px-4 py-2 placeholder-black"
/>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="bg-yellow-400 rounded-full px-4 py-2"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;
