// models/Loan.js
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the customer
  },
  amount: {
    type: Number,
    required: true,
  },
  term: {
    type: Number,
    required: true,
  },
  scheduledRepayments: [
    {
      date: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      paid: {
        type: Boolean,
        default: false,
      },
    },
  ],
  state: {
    type: String,
    default: 'PENDING',
  },
});

module.exports = mongoose.model('Loan', loanSchema);
