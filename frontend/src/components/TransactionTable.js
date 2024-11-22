const TransactionTable = ({ transactions }) => {
  if (!Array.isArray(transactions)) {
    return <div>No transactions found.</div>;
  }

  return (
    <table className="table-auto w-full">
      <thead className="bg-yellow-300">
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Description</th>
          <th className="border px-4 py-2">Price</th>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Sold</th>
          <th className="border px-4 py-2">Image</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border px-4 py-2">{transaction.id}</td>
              <td className="border px-4 py-2">{transaction.title}</td>
              <td className="border px-4 py-2">{transaction.description}</td>
              <td className="border px-4 py-2">${transaction.price}</td>
              <td className="border px-4 py-2">{transaction.category}</td>
              <td className="border px-4 py-2">{transaction.sold ? "Yes" : "No"}</td> {/* Display "Yes" or "No" */}
              <td className="border px-4 py-2">
                <img src={transaction.image} alt="Transaction Image" className="w-16 h-16" />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center py-4">No transactions available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionTable;
