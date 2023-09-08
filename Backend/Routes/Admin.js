// routes/admin.js
const express = require('express');
const router = express.Router();
const Loan = require('../Models/Loan');
const User = require('../Models/User'); // Import the User model


// Get all loans for a specific admin user
router.get('/loans', async (req, res) => {
  try {
    const adminUserId = req.query.userId; // Use req.query.userId to get the admin's userId from the query parameter

    // Retrieve the user record for the admin
    const adminUser = await User.findById(adminUserId);

    // Check if the user making the request is an admin
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Only admin users can access this resource.' });
    }

    // Query all loans where the 'customer' field matches the admin's userId and populate the 'customer' field to get the loan taker's customer name
    const loans = await Loan.find({ customer: adminUserId }).populate('customer', 'username');

    // Extract unique user information from loans
    const users = Array.from(new Set(loans.map((loan) => loan.customer))).map((user) => ({
     username: user.username, // Include the username in the response
    }));

    res.status(200).json({ loans, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... (rest of the code remains the same)


// Change the state of a loan (for admin)
router.put('/loans/change/:loanId', async (req, res) => {
  try {
    // Check if the user making the request is an admin
    const adminUserId = req.body.userId; // Or retrieve the admin's userId from the request, depending on your setup

    // Retrieve the user record for the admin
    const adminUser = await User.findById(adminUserId);

    // Check if the user making the request is an admin
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Only admin users can access this resource.' });
    }

    const { loanId } = req.params; // Retrieve the loanId from URL parameter
    const { newState } = req.body;

    // Find the loan by its ID and update its state
    const loan = await Loan.findByIdAndUpdate(loanId, { state: newState }, { new: true });

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.status(200).json({ loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
