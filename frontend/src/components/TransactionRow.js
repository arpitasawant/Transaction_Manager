import React from "react";

function TransactionRow({ transaction }) {
  return (
    <tr>
      <td className="border px-4 py-2">{transaction.id}</td>
      <td className="border px-4 py-2">{transaction.title}</td>
      <td className="border px-4 py-2">{transaction.description}</td>
      <td className="border px-4 py-2">{transaction.price}</td>
      <td className="border px-4 py-2">{transaction.category}</td>
      <td className="border px-4 py-2">{transaction.sold}</td>
      <td className="border px-4 py-2">
        <img src={transaction.image} alt="Transaction Image" className="w-16 h-16" />
      </td>
    </tr>
  );
}

export default TransactionRow;
