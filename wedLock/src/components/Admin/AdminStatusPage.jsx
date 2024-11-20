import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const AdminStatusPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch certificates from the backend
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://chainscholarbackend.onrender.com/api/wedLock/getAllCertificates" // Replace with your API endpoint
        );
        setCertificates(response.data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch certificates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-600 font-bold";
      case "rejected":
        return "text-red-600 font-bold";
      case "pending":
        return "text-yellow-500 font-bold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
        <AdminNavbar />
        <div className="p-6 flex justify-center">
          <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              All Certificates
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : certificates.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 border">Husband's Name</th>
                    <th className="py-2 border">Wife's Name</th>
                    <th className="py-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((certificate) => (
                    <tr key={certificate._id}>
                      <td className="border px-4 py-2">
                        {certificate.husbandName}
                      </td>
                      <td className="border px-4 py-2">
                        {certificate.wifeName}
                      </td>
                      <td
                        className={`border px-4 py-2 ${getStatusClass(
                          certificate.status
                        )}`}
                      >
                        {certificate.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">
                No certificates available for review.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatusPage;
