import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking localStorage for a token
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    // console.log('Token:', token);
    // console.log('User Data:', userData);
    // console.log('User Data:', userData);


    if (token) {
      if (userData && userData !== 'undefined') {
        try {
          // Safely parse the user data
          const parsedUserData = JSON.parse(userData);
          // console.log('Parsed User Data:', parsedUserData);
          
          // Validate that parsedUserData is not null/undefined
          if (parsedUserData && typeof parsedUserData === 'object') {
            setIsAuthenticated(true);
            setUser(parsedUserData);
          } else {
            console.error("Invalid user data structure:", parsedUserData);
            // Clear invalid data
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error("Failed to parse user data:", error);
          // Handle the error by clearing invalid data
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      } else {
        // Token exists but no user data - this shouldn't happen in normal flow
        console.warn("Token exists but no valid user data found");
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false); // Set loading to false after checking
  }, []);

  const login = (token, userData) => {
    console.log('Login called with:', { token, userData });
    
    // Validate inputs
    if (!token) {
      console.error('No token provided to login function');
      return;
    }
    
    if (!userData) {
      console.error('No userData provided to login function');
      return;
    }

    // Store in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Update state
    setIsAuthenticated(true);
    setUser(userData);
    
    // Navigate to home
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/signin');
  };

  // Don't render children until we've checked authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};