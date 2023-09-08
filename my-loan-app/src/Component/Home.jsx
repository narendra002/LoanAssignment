import React, { useState, useEffect } from 'react';
import { Input, Button } from '@nextui-org/react'; // Import Next UI components
import { createLoan } from './AxiosApiCaller'; // Import the createLoan function
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoanCreation = () => {
  const [loanData, setLoanData] = useState({
    amount: 0,
    term: 0,
    scheduledRepayments: [],
  });

  const [userId, setUserId] = useState(null); // Initialize userId as null

  useEffect(() => {
    // Get userId from localStorage and set it in the state
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); // Run this effect only once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure that amount and term are non-negative values
    if (name === 'amount' && parseFloat(value) < 0) {
      return;
    }

    if (name === 'term' && parseInt(value, 10) < 0) {
      return;
    }

    setLoanData({
      ...loanData,
      [name]: value,
    });
  };

  const handleScheduledRepaymentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedScheduledRepayments = [...loanData.scheduledRepayments];
    updatedScheduledRepayments[index][name] = value;
    setLoanData({
      ...loanData,
      scheduledRepayments: updatedScheduledRepayments,
    });
  };

  const addScheduledRepayment = () => {
    const updatedScheduledRepayments = [...loanData.scheduledRepayments, { date: '', amount: 0, paid: false }];
    setLoanData({
      ...loanData,
      scheduledRepayments: updatedScheduledRepayments,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include the userId in the loanData
      const loanDataWithUserId = {
        ...loanData,
        userId,
      };

      const response = await createLoan(loanDataWithUserId);
      if (response.status === 201) {
        // Loan created successfully
        toast.success('Loan created successfully');
      setLoanData({ amount: 0, term: 0, scheduledRepayments: [] });
      }
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 bg-white rounded-lg shadow-lg">
       <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Create a Loan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-600">
            Amount:
          </label>
          <Input
            type="number"
            name="amount"
            value={loanData.amount}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="term" className="block text-gray-600">
            Term (in months):
          </label>
          <Input
            type="number"
            name="term"
            value={loanData.term}
            onChange={handleInputChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Scheduled Repayments:</label>
          {loanData.scheduledRepayments.map((repayment, index) => (
            <div key={index} className="mb-2">
              <Input
                type="date"
                name="date"
                value={repayment.date}
                onChange={(e) => handleScheduledRepaymentChange(e, index)}
                className="w-1/2 mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <Input
                type="number"
                name="amount"
                value={repayment.amount}
                onChange={(e) => handleScheduledRepaymentChange(e, index)}
                className="w-1/2 mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addScheduledRepayment}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Repayment
          </button>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit Loan Request
        </Button>
      </form>
     
    </div>
  );
};

export default LoanCreation;
