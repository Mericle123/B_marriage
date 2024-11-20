import { useState, useEffect } from "react";
import Web3 from "web3"; // Import Web3
import AdminNavbar from "./AdminNavbar";
import { FaUserCircle } from "react-icons/fa"; // Icon for the default profile picture

const AdminProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [address, setAddress] = useState(""); // Store the wallet address
  const [ethBalance, setEthBalance] = useState(null); // Store the ETH balance

  useEffect(() => {
    const connectWallet = async () => {
      // Check if the browser has Ethereum (MetaMask)
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request the account address from MetaMask
          const accounts = await web3.eth.requestAccounts();
          const walletAddress = accounts[0]; // Get the first wallet address
          setAddress(walletAddress);

          // Fetch the ETH balance
          const balance = await web3.eth.getBalance(walletAddress);
          const balanceInEth = web3.utils.fromWei(balance, "ether"); // Convert from wei to ether
          setEthBalance(balanceInEth);
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        console.error("Ethereum wallet not found. Please install MetaMask.");
      }
    };

    connectWallet();
  }, []); // Empty dependency array means this will run once when the component mounts

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <AdminNavbar />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-32 h-32 text-gray-400" />
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-400">Admin Profile</h1>
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Address:
            </label>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700">
              {address || "Not Available"}
            </p>
          </div>

          {/* ETH Balance Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              ETH Balance:
            </label>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700">
              {ethBalance ? `${ethBalance} ETH` : "0 ETH"}
            </p>
          </div>

          {/* Role Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Role:
            </label>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
