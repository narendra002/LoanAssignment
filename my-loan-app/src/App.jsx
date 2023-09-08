import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav from './Component/Nav';
import LandingPage from './Component/LandingPage';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Home from './Component/Home';
import LoanCreation from './Component/Home'; // Corrected the import
import LoanList from './Component/LoanList';
import AdminLoanList from './Component/AdminLoanList';
import RepaymentForm from './Component/Repayments'; // Corrected the import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogOut from './Component/LogOut';

function App() {
  const isLoggedIn = !!localStorage.getItem('userId');
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check if the user is an admin

  return (
    <Router>
      <ToastContainer />
      <Nav />

      <Routes>
      <Route
  path="/"
  element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
/>
      <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/create-loan"
          element={isLoggedIn ? <LoanCreation /> : <Navigate to="/login" />}
        />
        <Route path="/view-loans" element={<LoanList />} />
        {isAdmin && (
          <Route
            path="/admin"
            element={isAdmin ? <AdminLoanList /> : <Navigate to="/login" />}
          />
        )}
        <Route
          path="/payment-loan"
          element={isLoggedIn ? <RepaymentForm /> : <Navigate to="/login" />}
        />
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </Router>
  );
}

export default App;
