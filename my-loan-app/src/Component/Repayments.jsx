// DisplayRepayments.js

import React from 'react';

const DisplayRepayments = ({ repayments }) => {
  return (
    <div>
      <h2>Scheduled Repayments</h2>
      <ul>
        {repayments.map((repayment, index) => (
          <li key={index}>
            {repayment.date}: ${repayment.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayRepayments;
