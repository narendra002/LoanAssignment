import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoanDetails from './LoanDetails';
import RepaymentForm from './Repayments';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const fetchLoans = async () => {
    try {
      const response = await axios.get(`https://loan-assignment.vercel.app/api/loan/customer-loans?userId=${userId}`);

      if (response.status === 200) {
        setLoans(response.data.loans);
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  useEffect(() => {
    // Fetch loans initially
    fetchLoans();

    // Poll for updates every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchLoans, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Loans</h2>
      {loans.map((loan) => (
        <div key={loan._id} className="mb-6">
          <LoanDetails loan={loan} />
          <RepaymentForm
            loanId={loan._id}
            scheduledRepayments={loan.scheduledRepayments}
          />
        </div>
      ))}
    </div>
  );
};

export default LoanList;
