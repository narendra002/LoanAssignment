// routes/loan.js
const express = require('express');
const router = express.Router();
const Loan = require('../Models/Loan');

// Create a new loan
router.post('/create', async (req, res) => {
  try {
    const { amount, term, scheduledRepayments } = req.body;
    const customer = req.user._id; // Assuming you have user authentication

    const newLoan = new Loan({
      customer,
      amount,
      term,
      scheduledRepayments,
    });

    await newLoan.save();
    res.status(201).json({ message: 'Loan created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get loans belonging to the authenticated customer
router.get('/customer-loans', async (req, res) => {
  try {
    const customer = req.user._id; // Assuming you have user authentication

    const loans = await Loan.find({ customer });

    res.status(200).json({ loans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
