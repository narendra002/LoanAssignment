// api.js
import axios from 'axios';

const BASE_URL = 'https://3000-narendra002-loanassignm-xvn12h9tipd.ws-us104.gitpod.io'; // Replace with your actual API URL

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
export const signup = async (email, username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, {
      email,
      username,
      password,
    });
    return response.data; // Assuming your server returns a success message or user data
  } catch (error) {
    throw error;
  }
};


// Function to make a loan creation request
export const createLoan = async (loanData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/loan/create`, loanData);
    return response.data; // Assuming your server returns a success message or loan data
  } catch (error) {
    throw error;
  }
};

// Function to fetch loans belonging to a customer
export const fetchCustomerLoans = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/loan/customer-loans`);
    return response.data; // Assuming your server returns a list of loans
  } catch (error) {
    throw error;
  }
};
