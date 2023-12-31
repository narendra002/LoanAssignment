// api.js
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const BASE_URL = 'https://loan-assignment.vercel.app'; // Replace with your actual API URL

// Function to make a login request
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email,
      password,
    });
    return response.data; // Assuming your server returns a token or user data
  } catch (error) {
    throw error;
  }
};

// Function to make a signup request
export const signup = async (email, username, password,isAdmin) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, {
      email,
      username,
      password,
      isAdmin
    });
    toast.success('User created successfully');
    return response.data; // Assuming your server returns a success message or user data
  } catch (error) {
    throw error;
  }
};


// Function to make a loan creation request
export const createLoan = async (loanData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/loan/create`, loanData);
    toast.success('Loan created successfully');
    return response.data; // Assuming your server returns a success message or loan data
  } catch (error) {
    throw error;
  }
};

// Function to fetch loans belonging to a customer
export const fetchCustomerLoans = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/loan/customer-loans?userId=${userId}`);
    const loans = response.data;
    // console.log(loans);
    return loans; // Assuming your server returns a list of loans
  } catch (error) {
    throw error;
  }
};

export const fetchAllCustomerLoans = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/loan/customer-loans?userId=${userId}`);
    const loans = response.data;
    // console.log(loans);
    return loans; // Assuming your server returns a list of loans
  } catch (error) {
    throw error;
  }
};