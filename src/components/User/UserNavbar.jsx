// src/components/UserNavbar.jsx
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <nav className="bg-pink-600 p-4 text-white shadow-md flex justify-between items-center rounded-lg">
      <Link
        to="/user"
        className="text-2xl font-bold tracking-wide hover:text-pink-200 transition duration-300"
      >
        BM User
      </Link>
      <div className="space-x-4 flex items-center">
        <Link 
          to="/create-certificate" 
          className="relative group text-lg font-medium transition duration-300 hover:text-pink-200"
        >
          Create Certificate
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-200 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link 
          to="/user/profile" 
          className="relative group text-lg font-medium transition duration-300 hover:text-pink-200"
        >
          Profile
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-200 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link 
          to="/" 
          className="relative group text-lg font-medium transition duration-300 hover:text-pink-200"
        >
          Logout
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-200 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
};

export default UserNavbar;
