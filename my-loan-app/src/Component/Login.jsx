// Login.js
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { login } from "./AxiosApiCaller"; // Import the login function

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation example (you can add more complex validation)
    const newErrors = {};

    if (!user.email) {
      newErrors.email = 'Email is required';
    }

    if (!user.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Make the login request
        const response = await login(user.email, user.password);
        console.log("User Data:", response);
        // Handle the response (e.g., store the token or user data)
      } catch (error) {
        console.error("Login error:", error);
        // Handle login error (e.g., show an error message to the user)
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="grid w-full max-w-md gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={user.email}
          onChange={handleInputChange}
          error={errors.email} // Display the error message
        />
     
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={user.password}
          onChange={handleInputChange}
          error={errors.password} // Display the error message
        />
        <Button type="submit" fullWidth>Login in</Button>
        <p className="text-center text-gray-500 mt-4">
          Create an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
