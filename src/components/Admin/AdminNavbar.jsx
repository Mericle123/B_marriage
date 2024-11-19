import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 text-white shadow-md flex justify-between items-center ">
      <Link 
        to="/admin"
        className="text-2xl font-bold tracking-wide hover:text-blue-200 transition duration-300"
      >
        Marriage Certificate Portal
      </Link>
      <div className="space-x-4 flex items-center">
        <Link 
          to="/admin/status"
          className="relative group text-lg font-medium transition duration-300 hover:text-blue-200"
        >
          Status
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link 
          to="/admin/approve"
          className="relative group text-lg font-medium transition duration-300 hover:text-blue-200"
        >
          Approve
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link 
          to="/admin/rejection" 
          className="relative group text-lg font-medium transition duration-300 hover:text-blue-200"
        >
          Rejections
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link 
          to="/admin/profile" 
          className="relative group text-lg font-medium transition duration-300 hover:text-blue-200"
        >
          Profile
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link 
          to="/" 
          className="relative group text-lg font-medium transition duration-300 hover:text-blue-200"
        >
          Logout
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
