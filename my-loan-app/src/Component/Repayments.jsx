import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RepaymentForm = ({ loanId, scheduledRepayments }) => {
  const [repaymentAmount, setRepaymentAmount] = useState('');

  const handleRepaymentChange = (e) => {
    setRepaymentAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(repaymentAmount);

    if (!isNaN(amount) && amount >= 0) {
      const repayment = {
        date: new Date().toISOString(),
        amount,
        paid: true,
      };

      const updatedRepayments = [...scheduledRepayments, repayment];

      try {
        const response = await axios.put(`https://loan-assignment.vercel.app/api/loan/update-status/${loanId}`, { repaymentAmount: amount });

        if (response.status === 200) {
         toast.success('Repayment submitted successfully');
          setRepaymentAmount('');

          // Display a success toast notification
         
        } else {
          console.error('Error adding repayment:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding repayment:', error);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-semibold mb-4">Make a Repayment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="repaymentAmount" className="block text-gray-600">
            Repayment Amount:
          </label>
          <Input
            type="number"
            id="repaymentAmount"
            name="repaymentAmount"
            value={repaymentAmount}
            onChange={handleRepaymentChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit Repayment
        </Button>
      </form>
    </div>
  );
};

export default RepaymentForm;
