import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAdmin, setIsUser }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      // Show loading animation for 3-4 seconds after determining role
      setIsLoading(true);
      setTimeout(() => {
        if (role === 'admin') {
          console.log('Redirecting to admin...');
          setIsAdmin(true);
          setIsUser(false);
          navigate('/admin'); // Redirect to Admin page
        } else if (role === 'user') {
          console.log('Redirecting to user...');
          setIsAdmin(false);
          setIsUser(true);
          navigate('/user'); // Redirect to User page
        }
        setIsLoading(false); // Stop loading animation
      }, 3000); // Show for 3 seconds
    }
  }, [role, navigate, setIsAdmin, setIsUser]);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        setWalletAddress(userAddress);

        // Define the single admin address
        const adminAddress = "0xdc0c315cD645F31994f6d00DB7549648d9A6A3E"; // Replace with actual admin address

        // Check if user is admin or regular user
        if (userAddress.toLowerCase() === adminAddress.toLowerCase()) {
          setRole('admin');
        } else {
          setRole('user');
        }
      } catch (error) {
        console.error('MetaMask connection error:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to continue.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700">
      {isLoading ? (
        // Loading Animation
        <div
          className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
        >
          <span
            className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
          ></span>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            {role === 'admin'
              ? 'Welcome, Admin!'
              : role === 'user'
              ? 'Welcome, User!'
              : 'Connect with MetaMask'}
          </h2>
          {walletAddress ? (
            <p className="text-center text-lg text-gray-700 mb-4">Connected as: {walletAddress}</p>
          ) : (
            <button
              onClick={connectMetaMask}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Connect MetaMask
            </button>
          )}
          {walletAddress && (
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                {role === 'admin' ? 'You have admin access' : 'You have user access'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
