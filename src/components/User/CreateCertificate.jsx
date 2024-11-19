import UserNavbar from './UserNavbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCertificate = ({ setCertificateData }) => {
  const [formData, setFormData] = useState({
    husbandName: '',
    husbandAddress: '',
    husbandDOB: '',
    husbandCID: '',
    wifeName: '',
    wifeAddress: '',
    wifeDOB: '',
    wifeCID: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCertificateData(formData);
    navigate('/user/profile'); // Redirect to user's profile or confirm submission page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-yellow-50">
      <UserNavbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Create Marriage Certificate
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Fill in the details below to generate your marriage certificate.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Husband's Information */}
            <h3 className="text-xl font-semibold text-pink-600 mb-4">
              Husband's Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  name="husbandName"
                  type="text"
                  placeholder="Husband Name"
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring focus:ring-pink-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <input
                  name="husbandAddress"
                  type="text"
                  placeholder="Husband Address"
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring focus:ring-pink-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  name="husbandDOB"
                  type="date"
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring focus:ring-pink-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  CID
                </label>
                <input
                  name="husbandCID"
                  type="text"
                  placeholder="Husband CID"
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring focus:ring-pink-300"
                  required
                />
              </div>
            </div>

            {/* Wife's Information */}
            <h3 className="text-xl font-semibold text-pink-600 mt-8 mb-4">
              Wife's Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  name="wifeName"
                  type="text"
                  placeholder="Wife Name"
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring focus:ring-pink-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <input
                  name="wifeAddress"
                  type="text"
                  placeholder="Wife Address"
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring focus:ring-pink-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  name="wifeDOB"
                  type="date"
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring focus:ring-pink-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  CID
                </label>
                <input
                  name="wifeCID"
                  type="text"
                  placeholder="Wife CID"
                  onChange={handleChange}
                  className="border p-3 w-full rounded focus:ring focus:ring-pink-300"
                  required
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-pink-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-pink-700 transition duration-300"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate;
