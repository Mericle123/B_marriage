import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <AdminNavbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-10 rounded-md shadow-lg">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-lg">Manage and monitor all marriage certificate applications efficiently.</p>
      </div>

      {/* Admin Dashboard Content */}
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/admin/status" className="bg-white shadow-xl rounded-lg p-8 text-center hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold text-blue-600">All Applications</h2>
            <p className="mt-2 text-gray-600">View and manage all marriage certificate applications.</p>
          </Link>

          <Link to="/admin/approve" className="bg-white shadow-xl rounded-lg p-8 text-center hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold text-blue-600">Approve Certificates</h2>
            <p className="mt-2 text-gray-600">Approve or reject marriage certificates with a few clicks.</p>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
