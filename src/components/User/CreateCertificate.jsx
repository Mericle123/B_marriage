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
    wifeCID: ''
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
    <div>
      <UserNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Create Marriage Certificate</h2>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded">
          {/* Husband's Information */}
          <h3 className="text-xl font-semibold mb-2">Husband's Information</h3>
          <input name="husbandName" type="text" placeholder="Husband Name" onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <input name="husbandAddress" type="text" placeholder="Husband Address" onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <input name="husbandDOB" type="date" onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <input name="husbandCID" type="text" placeholder="Husband CID" onChange={handleChange} className="border p-2 mb-2 w-full" required />
          
          {/* Wife's Information */}
          <h3 className="text-xl font-semibold mb-2">Wife's Information</h3>
          <input name="wifeName" type="text" placeholder="Wife Name" onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <input name="wifeAddress" type="text" placeholder="Wife Address" onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <input name="wifeDOB" type="date" onChange={handleChange} className="border p-2 mb-2 w-full" required />
          <input name="wifeCID" type="text" placeholder="Wife CID" onChange={handleChange} className="border p-2 mb-2 w-full" required />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCertificate;
