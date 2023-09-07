import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav from './Component/Nav';
import LandingPage from './Component/LandingPage';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Home from './Component/Home';
import LoanCreation from './Component/Home';
import LoanList from './Component/LoanList';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUp setIsLoggedIn={setIsLoggedIn} />}
        />
         {/* <Route path="/create-loan" element={<LoanCreation/>} /> */}
          <Route path="/view-loans" element={<LoanList/>} />
      </Routes>
    </Router>
  );
}

export default App;
