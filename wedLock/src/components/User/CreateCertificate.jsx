import UserNavbar from "./UserNavbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const CreateCertificate = () => {
  const [formData, setFormData] = useState({
    husbandName: "",
    husbandAddress: "",
    husbandDOB: "",
    husbandCID: "",
    wifeName: "",
    wifeAddress: "",
    wifeDOB: "",
    wifeCID: "",
    approvalAuthority: "0x27c68FEdCB4A9D331cf41a7b8aacc97a90Bc12eDe", // Pre-defined approval authority value
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createCertificate = async () => {
    setLoading(true);

    const {
      husbandName,
      husbandAddress,
      husbandDOB,
      husbandCID,
      wifeName,
      wifeAddress,
      wifeDOB,
      wifeCID,
      approvalAuthority,
    } = formData;

    if (
      !husbandName ||
      !husbandAddress ||
      !husbandDOB ||
      !husbandCID ||
      !wifeName ||
      !wifeAddress ||
      !wifeDOB ||
      !wifeCID ||
      !approvalAuthority
    ) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://chainscholarbackend.onrender.com/api/wedLock/create",
        {
          husbandName,
          husbandAddress,
          husbandDOB,
          husbandCID,
          wifeName,
          wifeAddress,
          wifeDOB,
          wifeCID,
          approvalAuthority, // Pass the approval authority field
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.status === "success") {
        toast.success("Marriage certificate created successfully");
        setTimeout(() => navigate("/user/profile"), 3000); // Redirect after notification
      } else {
        toast.error(response.data.message || "Failed to create certificate");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCertificate();
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

            {/* Approval Authority */}
            <h3 className="text-xl font-semibold text-pink-600 mt-8 mb-4">
              Approval Authority
            </h3>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Authority Address
              </label>
              <input
                name="approvalAuthority"
                type="text"
                value={formData.approvalAuthority}
                readOnly
                className="border p-3 w-full bg-gray-100 rounded focus:ring focus:ring-pink-300"
              />
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-pink-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-pink-700 transition duration-300"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toastify Notification Container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default CreateCertificate;
