import React from "react";

function Pagination({ page, setPage }) {
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex justify-between w-full mt-4">
      <span>Page No: {page}</span>
      <div>
        <button
          onClick={handlePreviousPage}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      <span>Per Page: 10</span>
    </div>
  );
}

export default Pagination;
