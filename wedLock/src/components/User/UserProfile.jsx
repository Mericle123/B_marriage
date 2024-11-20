import UserNavbar from "./UserNavbar";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // Icon for the default profile picture
import Web3 from "web3";
import WedLockABI from "../../contract/WebLock.json";
import axios from "axios";

const UserProfile = () => {
  const [address, setAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [userCertificates, setUserCertificates] = useState([]);

  const contractAddress = "0x79135dA99c966c1e5947286730F95bFf88b093AA"; // Replace with your contract address

  useEffect(() => {
    const loadWalletInfo = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const accounts = await web3.eth.getAccounts();
          const balance = await web3.eth.getBalance(accounts[0]);

          // Set user address and ETH balance
          setAddress(accounts[0]);
          setEthBalance(web3.utils.fromWei(balance, "ether"));

          // Initialize contract
          const wedLockContract = new web3.eth.Contract(
            WedLockABI.abi,
            contractAddress
          );

          // Fetch user's certificates
          await fetchUserCertificates(wedLockContract, accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
        }
      } else {
        alert("Please install MetaMask to use this feature.");
      }
    };

    const fetchUserCertificates = async (contract, userAddress) => {
      try {
        const certificates = [];

        // Step 1: Fetch NFTs owned by the user
        const balance = await contract.methods.balanceOf(userAddress).call();
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.methods
            .tokenOfOwnerByIndex(userAddress, i)
            .call();
          const tokenURI = await contract.methods.tokenURI(tokenId).call();

          // Fetch certificate data from IPFS
          const response = await axios.get(tokenURI);
          certificates.push(response.data);
        }

        // Step 2: Check for NFTs where tokenId matches user address (but user isn't the owner)
        const tokenIdMatch = userAddress; // Convert user address to uint256
        console.log(tokenIdMatch);
        try {
          const tokenOwner = await contract.methods
            .ownerOf(tokenIdMatch)
            .call();
          if (tokenOwner.toLowerCase() !== userAddress.toLowerCase()) {
            const tokenURI = await contract.methods
              .tokenURI(tokenIdMatch)
              .call();

            // Fetch certificate data from IPFS
            const response = await axios.get(tokenURI);
            const matchedCertificate = response.data;
            console.log(matchedCertificate);
            matchedCertificate.isMatchedWithAddress = true;
            certificates.push(matchedCertificate);
          }
        } catch (error) {
          console.warn("No NFT found for tokenId matching user address.");
        }

        setUserCertificates(certificates);
      } catch (error) {
        console.error("Error fetching certificates", error);
      }
    };

    loadWalletInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-yellow-50">
      <UserNavbar />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <FaUserCircle className="w-32 h-32 text-gray-400" />
            </div>
          </div>

          {/* User Information */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-pink-600">User Profile</h1>
            <p className="text-gray-600">Manage your account details here.</p>
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
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700">User</p>
          </div>

          {/* Owned Certificates Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-center mb-4">
              Owned Certificates
            </h2>
            {userCertificates.length === 0 ? (
              <p className="text-center text-gray-500">
                No certificates owned.
              </p>
            ) : (
              userCertificates.map((cert, index) => (
                <div
                  key={index}
                  className={`bg-white shadow-lg rounded-lg p-6 mb-6 ${
                    cert.isMatchedWithAddress ? "border-4 border-blue-400" : ""
                  }`}
                >
                  <div className="bg-gray-50 p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-2">
                      Husband's Information
                    </h3>
                    <p>
                      <strong>Name:</strong> {cert.husbandName}
                    </p>
                    <p>
                      <strong>Address:</strong> {cert.husbandAddress}
                    </p>

                    <h3 className="text-lg font-semibold mt-4 mb-2">
                      Wife's Information
                    </h3>
                    <p>
                      <strong>Name:</strong> {cert.wifeName}
                    </p>
                    <p>
                      <strong>Address:</strong> {cert.wifeAddress}
                    </p>

                    {/* Highlight if tokenId matches user's address but they're not the owner */}
                    {/* {cert.isMatchedWithAddress && (
                      <p className="text-blue-600 font-bold mt-4">
                        This certificate matches your address but you're not the
                        owner.
                      </p>
                    )} */}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
