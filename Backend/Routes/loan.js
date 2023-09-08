// routes/loan.js
const express = require('express');
const router = express.Router();
const Loan = require('../Models/Loan');

// Create a new loan
router.post('/create', async (req, res) => {
  try {
    const { amount, term, userId, scheduledRepayments } = req.body;

    // Check if scheduledRepayments are provided by the user
    let finalScheduledRepayments = scheduledRepayments || [];

    // If scheduledRepayments are empty or not provided, generate them
    if (!finalScheduledRepayments.length) {
      // Calculate the installment amount (total amount divided by the term)
      const installmentAmount = (amount / term).toFixed(2);

      // Calculate the dates for each scheduled repayment
      for (let i = 0; i < term; i++) {
        const date = new Date(); // Get the current date
        date.setMonth(date.getMonth() + 7); // Add months for each installment

        // Create a scheduled repayment object
        const repayment = {
          date,
          amount: installmentAmount,
          paid: false, // Initially set as unpaid
        };

        // Push the repayment object to the array
        finalScheduledRepayments.push(repayment);
      }
    }

    // Create a new loan with the finalScheduledRepayments
    const newLoan = new Loan({
      customer: userId,
      amount,
      term,
      scheduledRepayments: finalScheduledRepayments,
    });

    await newLoan.save();
    res.status(201).json({ message: 'Loan created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Get loans belonging to the authenticated customer
// Get loans belonging to the authenticated customer
router.get('/customer-loans', async (req, res) => {
  try {
    const customer = req.query.userId; // Use req.query.userId to get the userId from the query parameter

    const loans = await Loan.find({ customer });

    res.status(200).json({ loans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Assuming you have a route for updating a loan's status, you can add this logic there.

// Import necessary modules

// Update the loan's status
router.put('/update-status/:loanId', async (req, res) => {
  try {
    const loanId = req.params.loanId;
    const { repaymentAmount } = req.body; // Get the repayment amount from the request body

    // Find the loan by ID
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    // Find the first unpaid scheduled repayment
    const unpaidRepaymentIndex = loan.scheduledRepayments.findIndex((repayment) => !repayment.paid);

    if (unpaidRepaymentIndex === -1) {
      return res.status(400).json({ error: 'All repayments are already paid' });
    }

    // Get the unpaid scheduled repayment
    const unpaidRepayment = loan.scheduledRepayments[unpaidRepaymentIndex];

    // Check if the repayment amount is greater than or equal to the unpaid amount
    if (repaymentAmount >= unpaidRepayment.amount) {
      // Mark the unpaid repayment as "PAID"
      unpaidRepayment.paid = true;

      // Subtract the paid amount from the repayment amount
      const remainingRepaymentAmount = repaymentAmount - unpaidRepayment.amount;

      // Check if there is any remaining repayment amount
      if (remainingRepaymentAmount > 0) {
        // Update the remaining amount and index for the next unpaid repayment
        for (let i = unpaidRepaymentIndex + 1; i < loan.scheduledRepayments.length; i++) {
          const nextRepayment = loan.scheduledRepayments[i];
          if (!nextRepayment.paid) {
            if (remainingRepaymentAmount >= nextRepayment.amount) {
              // Mark the next unpaid repayment as "PAID"
              nextRepayment.paid = true;
              remainingRepaymentAmount -= nextRepayment.amount;
            } else {
              // Partially pay the next unpaid repayment and update its amount
              nextRepayment.amount -= remainingRepaymentAmount;
              break;
            }
          }
        }
      }

      // Calculate the total amount paid for the loan
      const totalAmountPaid = loan.scheduledRepayments.reduce((total, repayment) => {
        if (repayment.paid) {
          return total + repayment.amount;
        }
        return total;
      }, 0);

      // Check if the total amount paid equals the loan amount
      if (totalAmountPaid === loan.amount) {
        // Mark the loan as "PAID"
        loan.state = 'PAID';
      } else {
        // Keep the loan as "PENDING"
        loan.state = 'PENDING';
      }

      // Save the updated loan status
      await loan.save();

      res.status(200).json({ message: 'Loan status updated successfully' });
    } else {
      return res.status(400).json({ error: 'Repayment amount is insufficient' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






module.exports = router;
