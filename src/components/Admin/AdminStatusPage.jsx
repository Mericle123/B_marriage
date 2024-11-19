import { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';

const AdminStatusPage = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Simulate fetching data from localStorage (or a server)
    const storedCertificates = JSON.parse(localStorage.getItem('certificates')) || [];
    setCertificates(storedCertificates);
  }, []);

  const handleApprove = (index) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index].status = 'Approved';
    setCertificates(updatedCertificates);
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
  };

  const handleReject = (index) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index].status = 'Rejected';
    setCertificates(updatedCertificates);
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
  };

  return (
    <div>
       <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <AdminNavbar />
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Certificate Status</h2>
          {certificates.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Husband's Name</th>
                  <th className="py-2">Wife's Name</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((certificate, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{certificate.husbandName}</td>
                    <td className="border px-4 py-2">{certificate.wifeName}</td>
                    <td className="border px-4 py-2">{certificate.status}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleApprove(index)}
                        className="bg-green-500 text-white px-4 py-2 mr-2 rounded transition hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No certificates available for review.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminStatusPage;
