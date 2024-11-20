import AdminNavbar from "./AdminNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import WedLockABI from "../../contract/WebLock.json";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";

const ApprovePage = () => {
  const [pendingCertificates, setPendingCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploaderAddress, setUploaderAddress] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [wedLockContract, setWedLockContract] = useState(null);

  const contractAddress = "0x79135dA99c966c1e5947286730F95bFf88b093AA"; // Replace with your contract address

  // Initialize Web3 and Contract
  const initializeWeb3 = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed. Please install it to continue.");
      return;
    }
    try {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3Instance.eth.getAccounts();
      setUploaderAddress(accounts[0]);
      const contractInstance = new web3Instance.eth.Contract(
        WedLockABI.abi,
        contractAddress
      );
      setWeb3(web3Instance);
      setWedLockContract(contractInstance);
      // toast.success("Web3 and Contract initialized successfully.");
    } catch (err) {
      toast.error("Failed to initialize Web3: " + err.message);
    }
  };

  // Fetch certificates with 'pending' status
  useEffect(() => {
    const fetchPendingCertificates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://chainscholarbackend.onrender.com/api/wedLock/getByStatus/pending"
        );
        setPendingCertificates(response.data.data || []);
        // toast.success("Pending certificates fetched successfully.");
      } catch (err) {
        setError(err.message || "Failed to fetch pending certificates");
        toast.error("Error fetching pending certificates: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeWeb3();
    fetchPendingCertificates();
  }, []);

  const handleApprove = async (certificate) => {
    if (!wedLockContract) {
      toast.error("Web3 or Contract is not initialized.");
      return;
    }

    const {
      husbandAddress,
      wifeAddress,
      husbandName,
      wifeName,
      husbandDOB,
      wifeDOB,
      husbandCID,
      wifeCID,
    } = certificate;

    try {
      setLoading(true);

      const currentDate = new Date().toISOString();
      const checksumHusbandAddress =
        web3.utils.toChecksumAddress(husbandAddress);
      const checksumWifeAddress = web3.utils.toChecksumAddress(wifeAddress);

      const certificateData = {
        husbandName,
        wifeName,
        husbandAddress: checksumHusbandAddress,
        wifeAddress: checksumWifeAddress,
        husbandDOB,
        wifeDOB,
        husbandCID,
        wifeCID,
        uploaderAddress,
        approvalDate: currentDate,
      };

      const jsonData = JSON.stringify(certificateData);
      const formData = new FormData();
      const timestamp = new Date().toISOString();
      const dynamicFileName =
        `${husbandName}_${wifeName}_${uploaderAddress}_${timestamp}.json`.replace(
          /[\s:]/g,
          "_"
        );
      formData.append(
        "file",
        new Blob([jsonData], { type: "application/json" }),
        dynamicFileName
      );

      const pinataResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const ipfsHash = pinataResponse.data.IpfsHash;
      if (!ipfsHash)
        throw new Error("Failed to upload certificate data to IPFS");

      const metadataURI = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      toast.success("Metadata uploaded to IPFS successfully.");

      const gasEstimate = await wedLockContract.methods
        .awardCertificate(
          checksumHusbandAddress,
          checksumWifeAddress,
          metadataURI
        )
        .estimateGas({ from: uploaderAddress });

      const mintTransaction = await wedLockContract.methods
        .awardCertificate(
          checksumHusbandAddress,
          checksumWifeAddress,
          metadataURI
        )
        .send({ from: uploaderAddress, gas: gasEstimate + 5000 });

      toast.success("NFT Minted Successfully!");

      await axios.put(
        `https://chainscholarbackend.onrender.com/api/wedLock/updateStatus/${certificate._id}`,
        { status: "accepted" }
      );

      toast.success("Certificate approved and status updated successfully!");

      setPendingCertificates((prev) =>
        prev.filter((cert) => cert._id !== certificate._id)
      );
    } catch (err) {
      toast.error("Error approving certificate: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (certificateId) => {
    try {
      await axios.put(
        `https://chainscholarbackend.onrender.com/api/wedLock/updateStatus/${certificateId}`,
        { status: "rejected" }
      );
      toast.success("Certificate declined.");
      setPendingCertificates((prev) =>
        prev.filter((certificate) => certificate._id !== certificateId)
      );
    } catch (err) {
      toast.error("Failed to decline certificate: " + err.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
        <AdminNavbar />
        <div className="p-6 flex justify-center">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Pending Certificate Approval
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-black-500">
                No pending certificates available for review.
              </p>
            ) : pendingCertificates.length === 0 ? (
              <p className="text-center text-gray-500">
                No pending certificates available for review.
              </p>
            ) : (
              pendingCertificates.map((certificate) => (
                <div
                  key={certificate._id}
                  className="bg-gray-50 p-4 rounded-md shadow-md mb-6"
                >
                  {/* Certificate Information */}
                  <div className="mb-4 border-b pb-4">
                    <h3 className="text-lg font-semibold">
                      Husband's Information
                    </h3>
                    <p>
                      <strong>Name:</strong> {certificate.husbandName}
                    </p>
                    <p>
                      <strong>Address:</strong> {certificate.husbandAddress}
                    </p>
                    <p>
                      <strong>DOB:</strong> {certificate.husbandDOB}
                    </p>
                    <p>
                      <strong>CID:</strong> {certificate.husbandCID}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Wife's Information
                    </h3>
                    <p>
                      <strong>Name:</strong> {certificate.wifeName}
                    </p>
                    <p>
                      <strong>Address:</strong> {certificate.wifeAddress}
                    </p>
                    <p>
                      <strong>DOB:</strong> {certificate.wifeDOB}
                    </p>
                    <p>
                      <strong>CID:</strong> {certificate.wifeCID}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => handleApprove(certificate)}
                      className="bg-green-500 text-white px-4 py-2 mr-2 rounded transition hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(certificate._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default ApprovePage;
