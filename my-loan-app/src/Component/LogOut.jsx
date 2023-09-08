import React from 'react';

function LogOut() {
  const handleLogout = () => {
    // Clear the relevant items from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');

    // You can also perform any other necessary logout actions here
    // For example, redirecting the user to the login page
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      >
        Log Out
      </button>
    </div>
  );
}

export default LogOut;
