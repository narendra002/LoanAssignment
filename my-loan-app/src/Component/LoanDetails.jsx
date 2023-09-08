import React from 'react';
import { format } from 'date-fns';

const LoanDetails = ({ loan }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-0">
            <div className="text-lg font-semibold">Loan ID: {loan._id}</div>
            <p className="mt-1 text-sm text-gray-600">Customer: {loan.customer}</p>
            <p className="text-sm text-gray-600">Amount: ${loan.amount}</p>
            <p className="text-sm text-gray-600">Term (months): {loan.term}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
        <div className="ml-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            loan.state === 'PENDING' ? 'bg-yellow-500 text-yellow-900' : 'bg-green-500 text-green-900'
          }`}>
            {loan.state}
          </span>
        </div>
        <div className="mt-2">
          <h4 className="text-md font-semibold mb-2">Scheduled Payments:</h4>
          <ul>
            {loan.scheduledRepayments.map((repayment, index) => (
              <li key={repayment._id} className="mb-2">
                <p className="text-sm text-gray-600">
                  Date: {format(new Date(repayment.date), 'MM/dd/yyyy')}, Amount: ${repayment.amount}{' '}
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    repayment.paid ? 'bg-green-500 text-green-900' : 'bg-yellow-500 text-yellow-900'
                  }`}>
                    {repayment.paid ? 'PAID' : 'Not Paid'}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default LoanDetails;
