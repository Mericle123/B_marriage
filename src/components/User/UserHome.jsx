import { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';

const UserHome = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);

  // Function to request account access from MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserAddress(accounts[0]);
        getEthBalance(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  };

  // Function to fetch ETH balance
  const getEthBalance = async (address) => {
    if (window.ethereum) {
      try {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        });
        setEthBalance(parseFloat(window.web3.utils.fromWei(balance, 'ether')).toFixed(4));
      } catch (error) {
        console.error('Error fetching ETH balance:', error);
      }
    }
  };

  // Automatically connect if MetaMask is already authorized
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setUserAddress(accounts[0]);
            getEthBalance(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking for authorized accounts:', error);
        }
      }
    };
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-yellow-50">
      <UserNavbar />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-pink-600 to-red-500 text-white py-20 px-6 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Your Marriage Certificate Hub</h1>
          <p className="text-lg md:text-xl mb-6">Secure, fast, and reliable online services for marriage certificates.</p>
          <button
            onClick={connectWallet}
            className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            {userAddress ? 'Wallet Connected' : 'Connect MetaMask'}
          </button>
          {userAddress && (
            <p className="mt-4 text-xl">Wallet Address: {userAddress}</p>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto p-8 space-y-12">
        {/* Connected Wallet Details */}
        {userAddress && (
          <section className="bg-white shadow-xl rounded-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Connected Wallet Details</h2>
            <div className="text-gray-800">
              <p className="mb-2">
                <strong>Wallet Address:</strong> {userAddress}
              </p>
              <p>
                <strong>ETH Balance:</strong> {ethBalance || 'Loading...'} ETH
              </p>
            </div>
          </section>
        )}

        {/* Cards Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Apply for Certificate</h3>
            <p className="text-gray-600">Start your application seamlessly with our user-friendly platform.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Track Your Application</h3>
            <p className="text-gray-600">Stay informed with real-time updates on your certificate status.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Secure Storage</h3>
            <p className="text-gray-600">Your marriage certificates are safely stored on blockchain technology.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300 hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Customer Support</h3>
            <p className="text-gray-600">Reach out to our support team for any assistance with your application.</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white shadow-xl rounded-lg p-8 text-left space-y-4 transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Connect your MetaMask wallet for secure verification.</li>
            <li>Complete the online marriage certificate application form.</li>
            <li>Submit your application and track its progress in real-time.</li>
            <li>Download your authenticated certificate upon approval.</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default UserHome;
