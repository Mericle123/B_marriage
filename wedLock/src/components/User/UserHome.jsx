import { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar";
import { Link } from "react-router-dom";
import Web3 from "web3";

const UserHome = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [web3, setWeb3] = useState(null);

  // Function to connect wallet and fetch account details
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setUserAddress(accounts[0]);
        setWeb3(web3Instance);
        fetchEthBalance(accounts[0], web3Instance);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };
  // Automatically connect if MetaMask is already authorized
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          setWeb3(web3Instance);
          fetchEthBalance(accounts[0], web3Instance);
        }
      }
    };
    checkIfWalletIsConnected();
  }, []);

  // Function to fetch ETH balance using Web3
  const fetchEthBalance = async (address, web3Instance) => {
    try {
      const balance = await web3Instance.eth.getBalance(address);
      setEthBalance(
        parseFloat(web3Instance.utils.fromWei(balance, "ether")).toFixed(4)
      );
    } catch (error) {
      console.error("Error fetching ETH balance:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-yellow-50">
      <UserNavbar />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-pink-600 to-red-500 text-white py-20 px-6 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Your Marriage Certificate Hub
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Secure, fast, and reliable online services for marriage
            certificates.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto p-8 space-y-12">
        {/* Connected Wallet Details */}
        {userAddress && (
          <section className="bg-white shadow-xl rounded-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">
              Connected Wallet Details
            </h2>
            <div className="text-gray-800">
              <p className="mb-2">
                <strong>Wallet Address:</strong> {userAddress}
              </p>
              <p>
                <strong>ETH Balance:</strong> {ethBalance || "Loading..."} ETH
              </p>
            </div>
          </section>
        )}

        {/* Cards Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <Link
            to="/create-certificate"
            className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-pink-600 mb-2">
              Apply for Certificate
            </h3>
            <p className="text-gray-600">
              Start your application seamlessly with our user-friendly platform.
            </p>
          </Link>
          <Link
            to="/user/status"
            className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300 hover:shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-pink-600 mb-2">
              Track Your Application
            </h3>
            <p className="text-gray-600">
              Stay informed with real-time updates on your certificate status.
            </p>
          </Link>
        </section>

        {/* How It Works */}
        <section className="bg-white shadow-xl rounded-lg p-8 text-left space-y-4 transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">
            How It Works
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Connect your MetaMask wallet for secure verification.</li>
            <li>Complete the online marriage certificate application form.</li>
            <li>
              Submit your application and track its progress in real-time.
            </li>
            <li>Download your authenticated certificate upon approval.</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default UserHome;
