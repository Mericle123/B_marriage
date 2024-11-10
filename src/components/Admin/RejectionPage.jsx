import AdminNavbar from './AdminNavbar';
import { useState, useEffect } from 'react';

const RejectionPage = () => {
  const [rejectedCertificates, setRejectedCertificates] = useState([]);

  // Simulate fetching data from localStorage (or a server)
  useEffect(() => {
    const storedRejectedCertificates = JSON.parse(localStorage.getItem('rejectedCertificates')) || [];
    setRejectedCertificates(storedRejectedCertificates);
  }, []);

  const handleRemoveCertificate = (index) => {
    const updatedCertificates = rejectedCertificates.filter((_, i) => i !== index);
    setRejectedCertificates(updatedCertificates);
    localStorage.setItem('rejectedCertificates', JSON.stringify(updatedCertificates));
    alert('Certificate removed from the rejected list.');
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Rejected Certificates</h2>
          {rejectedCertificates.length > 0 ? (
            rejectedCertificates.map((certificate, index) => (
              <div key={index} className="bg-gray-50 p-4 mb-4 rounded-md shadow-md">
                {/* Husband's Information */}
                <div className="mb-4 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">Husband's Information</h3>
                  <p><strong>Name:</strong> {certificate.husbandName}</p>
                  <p><strong>Address:</strong> {certificate.husbandAddress}</p>
                  <p><strong>DOB:</strong> {certificate.husbandDOB}</p>
                  <p><strong>CID:</strong> {certificate.husbandCID}</p>
                </div>

                {/* Wife's Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Wife's Information</h3>
                  <p><strong>Name:</strong> {certificate.wifeName}</p>
                  <p><strong>Address:</strong> {certificate.wifeAddress}</p>
                  <p><strong>DOB:</strong> {certificate.wifeDOB}</p>
                  <p><strong>CID:</strong> {certificate.wifeCID}</p>
                </div>

                {/* Remove Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleRemoveCertificate(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No rejected certificates available for review.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RejectionPage;
