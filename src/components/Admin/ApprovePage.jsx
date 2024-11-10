import AdminNavbar from './AdminNavbar';
import { useState, useEffect } from 'react';

const ApprovePage = () => {
  const [certificateData, setCertificateData] = useState(null);

  // Simulate fetching data from localStorage (or a server)
  useEffect(() => {
    const storedCertificate = JSON.parse(localStorage.getItem('certificateData'));
    if (storedCertificate) {
      setCertificateData(storedCertificate);
    }
  }, []);

  const handleApprove = () => {
    alert('Certificate approved.');
    // Logic for handling approval
    localStorage.removeItem('certificateData');
    setCertificateData(null); // Clear the displayed data after approval
  };

  const handleDecline = () => {
    alert('Certificate declined.');
    // Logic for handling decline
    localStorage.removeItem('certificateData');
    setCertificateData(null); // Clear the displayed data after decline
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Certificate Approval</h2>
          {certificateData ? (
            <div className="bg-gray-50 p-4 rounded-md shadow-md">
              {/* Husband's Information */}
              <div className="mb-4 border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">Husband's Information</h3>
                <p><strong>Name:</strong> {certificateData.husbandName}</p>
                <p><strong>Address:</strong> {certificateData.husbandAddress}</p>
                <p><strong>DOB:</strong> {certificateData.husbandDOB}</p>
                <p><strong>CID:</strong> {certificateData.husbandCID}</p>
              </div>

              {/* Wife's Information */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Wife's Information</h3>
                <p><strong>Name:</strong> {certificateData.wifeName}</p>
                <p><strong>Address:</strong> {certificateData.wifeAddress}</p>
                <p><strong>DOB:</strong> {certificateData.wifeDOB}</p>
                <p><strong>CID:</strong> {certificateData.wifeCID}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end">
                <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 mr-2 rounded transition hover:bg-green-600">
                  Approve
                </button>
                <button onClick={handleDecline} className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600">
                  Decline
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No certificate data available for review.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovePage;
