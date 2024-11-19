import UserNavbar from "./UserNavbar";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Icon for the default profile picture

const UserProfile = ({ address, ethBalance }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-yellow-50">
      <UserNavbar />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {/* Default Profile Picture (FaUserCircle Icon) */}
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
            <label className="block text-gray-700 font-medium mb-2">Role:</label>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700">User</p>
          </div>

          {/* Edit Profile Button */}
          <div className="text-center mt-8">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700 transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;