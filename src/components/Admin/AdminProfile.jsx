import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { FaUserCircle } from "react-icons/fa"; // Icon for the default profile picture

const AdminProfile = ({ address, ethBalance }) => {
  const [profilePic, setProfilePic] = useState(null);

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
              <FaUserCircle className="w-32 h-32 text-gray-400" />
            </div>
          </div>

          {/* User Information */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-400">Admin Profile</h1>
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
            <label className="block text-gray-700 font-medium mb-2">Role:</label>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700">Admin</p>
          </div>
  
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
