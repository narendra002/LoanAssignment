import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoanList = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchAdminLoans = async () => {
      try {
        // Make an API request to fetch admin loans
        const response = await axios.get(`https://loan-assignment.vercel.app/api/admin/loans?userId=${localStorage.getItem('userId')}`);

        if (response.status === 200) {
          setLoans(response.data.loans);
        }
      } catch (error) {
        console.error('Error fetching admin loans:', error);
      }
    };

    fetchAdminLoans();
  }, []);

  const handleLoanApproval = async (loanId) => {
    try {
      // Make an API request to update the loan state to 'approved'
      const response = await axios.put(`https://loan-assignment.vercel.app/api/admin/loans/change/${loanId}`, { userId: localStorage.getItem('userId'), newState: 'APPROVED' });

      if (response.status === 200) {
        // Loan approval successful, update the state
        setLoans((prevLoans) =>
          prevLoans.map((loan) =>
            loan._id === loanId ? { ...loan, state: 'APPROVED' } : loan
          )
        );

        // Show a toast notification
        toast.success('Loan approved successfully');
      }
    } catch (error) {
      console.error('Error approving loan:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Admin Loans</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 sm:min-w-0 sm:table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loan ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loan Taker Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Term (months)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td className="px-6 py-4 whitespace-nowrap">{loan._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.customer.username}</td>
                <td className="px-6 py-4 whitespace-nowrap sm:w-1/4 md:w-1/6">${loan.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.term}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.state}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {loan.state === 'PENDING' && (
                    <button
                      onClick={() => handleLoanApproval(loan._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLoanList;
