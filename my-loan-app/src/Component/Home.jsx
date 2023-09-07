// LoanCreation.js
import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react'; // Import Next UI components
import { createLoan } from './AxiosApiCaller'; // Import the createLoan function

const LoanCreation = () => {
  const [loanData, setLoanData] = useState({
    amount: 0,
    term: 0,
    scheduledRepayments: [],
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createLoan(loanData);
      if (response.status === 201) {
        // Loan created successfully
        console.log('Loan created successfully');
      }
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 bg-white rounded-lg shadow-lg">
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
        {/* Add fields for scheduled repayments if needed */}
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
