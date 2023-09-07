// LoanList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchCustomerLoans } from './AxiosApiCaller'; // Import the fetchCustomerLoans function

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetchCustomerLoans();

        if (response.status === 200) {
          setLoans(response.data.loans);
        }
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Loans</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loan ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Term (months)
              </th>
              {/* Add headers for other loan details as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td className="px-6 py-4 whitespace-nowrap">{loan._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">${loan.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.term}</td>
                {/* Add td elements for other loan details as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanList;
