// src/components/LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Loan App</h1>
      </div>
      <div className="space-x-4">
        <Link to="/signup" className="bg-blue-500 hover:bg-blue-7">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          User
        </button></Link>
        <Link to="/login" className="bg-blue-500 hover:bg-blue-7">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Admin
        </button></Link>
      </div>
    </div>
  );
};

export default LandingPage;
