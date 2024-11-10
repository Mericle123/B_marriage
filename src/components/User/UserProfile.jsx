import UserNavbar from "./UserNavbar";
import { useState } from "react";

const UserProfile = ({ address, ethBalance }) => {
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
    <div className="min-h-screen bg-gray-100">
      <UserNavbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
            />
            <label htmlFor="profilePicInput" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
              <input
                type="file"
                id="profilePicInput"
                className="hidden"
                onChange={handleProfilePicChange}
              />
              📷
            </label>
          </div>
        </div>
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">User Profile</h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Address:</label>
          <p className="bg-gray-100 p-2 rounded">{address}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-medium">
            <strong>ETH Balance:</strong>
          </p>
          <p className="bg-gray-100 p-2 rounded">{ethBalance} ETH</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-medium">
            <strong>Role:</strong>
          </p>
          <p className="bg-gray-100 p-2 rounded">User</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
