import React, { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import UserNavbar from "./UserNavbar";

const Status = () => {
  const [applications, setApplications] = useState([]);
  const [connectedWallet, setConnectedWallet] = useState(null); // Store the connected wallet address
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading status

  // Automatically connect wallet and retrieve address on component mount
  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          setConnectedWallet(accounts[0]); // Set the connected wallet address
        } else {
          setError("No Ethereum wallet detected. Please install MetaMask.");
        }
      } catch (err) {
        console.error("Error connecting wallet:", err);
        setError("Failed to connect wallet. Try again.");
      }
    };

    connectWallet();
  }, []); // Run once when component mounts

  // Fetch Certificates for the Connected Wallet
  useEffect(() => {
    const fetchCertificates = async () => {
      if (connectedWallet) {
        setLoading(true); // Set loading state to true before making the API call
        setError(""); // Reset previous errors

        try {
          const response = await axios.get(
            `https://chainscholarbackend.onrender.com/api/wedLock/getByWalletAddress/${connectedWallet}`
          );

          if (response.data && response.data.length > 0) {
            setApplications(response.data); // Set the fetched applications
          } else {
            setApplications([]); // No certificates found
            setError("No certificates found for the provided wallet address.");
          }
        } catch (err) {
          console.error("Error fetching certificates:", err);
          setError("Failed to fetch certificates. Please try again.");
        } finally {
          setLoading(false); // Set loading state to false after the API call
        }
      }
    };

    if (connectedWallet) {
      fetchCertificates(); // Fetch certificates once wallet is connected
    }
  }, [connectedWallet]);

  // Helper function to format the createdAt date
  function formatDate(dateString) {
    const date = new Date(dateString); // Convert to Date object
    return date.toLocaleDateString(); // Format to a readable date (e.g., "MM/DD/YYYY")
  }

  // Helper function to determine the text color for the status
  function getStatusColor(status) {
    if (status === "accepted") return "text-green-600"; // Accepted: Green
    if (status === "rejected") return "text-red-600"; // Rejected: Red
    if (status === "pending") return "text-yellow-600"; // Pending: Orange
    return "text-gray-600"; // Default for any other status
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-yellow-50">
      <UserNavbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Application Status
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Stay informed with real-time updates on your certificate status.
        </p>

        {/* Applications Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading certificates...</p>
          ) : applications.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-pink-200 text-pink-800">
                  <th className="p-4 border-b">#</th>
                  <th className="p-4 border-b">Husband Name</th>
                  <th className="p-4 border-b">Wife Name</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr
                    key={app.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="p-4 border-b">{index + 1}</td>
                    <td className="p-4 border-b">{app.husbandName}</td>
                    <td className="p-4 border-b">{app.wifeName}</td>
                    <td
                      className={`p-4 border-b ${getStatusColor(app.status)}`}
                    >
                      {app.status}
                    </td>
                    <td className="p-4 border-b">
                      {formatDate(app.createdAt)}
                    </td>{" "}
                    {/* Display only the date */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center">
              No updates available at the moment. Check back later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Status;
