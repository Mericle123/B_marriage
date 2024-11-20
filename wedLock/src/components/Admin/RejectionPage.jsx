import AdminNavbar from "./AdminNavbar";
import { useState, useEffect } from "react";
import axios from "axios";

const RejectionPage = () => {
  const [rejectedCertificates, setRejectedCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch rejected certificates
  useEffect(() => {
    const fetchRejectedCertificates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://chainscholarbackend.onrender.com/api/wedLock/getByStatus/rejected"
        );
        setRejectedCertificates(response.data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch rejected certificates.");
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedCertificates();
  }, []);

  const handleRemoveCertificate = async (certificateId) => {
    try {
      await axios.delete(
        `https://chainscholarbackend.onrender.com/api/wedLock/delete/${certificateId}`
      );
      setRejectedCertificates((prev) =>
        prev.filter((certificate) => certificate._id !== certificateId)
      );
      alert("Certificate removed from the rejected list.");
    } catch (err) {
      alert("Failed to remove certificate: " + err.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
        <AdminNavbar />
        <div className="p-6 flex justify-center">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Rejected Certificates
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : rejectedCertificates.length === 0 ? (
              <p className="text-center text-gray-500">
                No rejected certificates available for review.
              </p>
            ) : (
              rejectedCertificates.map((certificate) => (
                <div
                  key={certificate._id}
                  className="bg-gray-50 p-4 mb-4 rounded-md shadow-md"
                >
                  {/* Husband's Information */}
                  <div className="mb-4 border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">
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

                  {/* Wife's Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
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

                  {/* Remove Button */}
                  {/* <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleRemoveCertificate(certificate._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div> */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionPage;
