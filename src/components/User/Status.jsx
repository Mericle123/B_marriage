import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';

const Status = () => {
  // Sample status data
  const [applications, setApplications] = useState([
    {
      id: 1,
      husbandName: 'John Doe',
      wifeName: 'Jane Doe',
      status: 'Approved',
      date: '2024-11-01',
    },
    {
      id: 2,
      husbandName: 'Mark Smith',
      wifeName: 'Lucy Smith',
      status: 'Pending',
      date: '2024-11-15',
    },
    {
      id: 3,
      husbandName: 'Sam Wilson',
      wifeName: 'Emily Wilson',
      status: 'Rejected',
      date: '2024-11-10',
    },
  ]);

  useEffect(() => {
    // Fetch applications data from backend if connected (placeholder functionality)
    // Replace with actual API fetch logic
    // Example:
    // fetch('/api/status')
    //   .then((response) => response.json())
    //   .then((data) => setApplications(data))
    //   .catch((error) => console.error('Error fetching application data:', error));
  }, []);

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
        <div className="bg-white shadow-lg rounded-lg p-6">
          {applications.length > 0 ? (
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
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="p-4 border-b">{app.id}</td>
                    <td className="p-4 border-b">{app.husbandName}</td>
                    <td className="p-4 border-b">{app.wifeName}</td>
                    <td
                      className={`p-4 border-b ${
                        app.status === 'Approved'
                          ? 'text-green-600'
                          : app.status === 'Rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {app.status}
                    </td>
                    <td className="p-4 border-b">{app.date}</td>
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
  