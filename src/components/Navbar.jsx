import { Link } from 'react-router-dom';

const Navbar = ({ isAdmin }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">WedLock</div>
        <div>
          {isAdmin ? (
            <>
              <Link to="/admin" className="text-white px-4 hover:underline">Admin Home</Link>
              <Link to="/admin/approve" className="text-white px-4 hover:underline">Approve Certificates</Link>
              <Link to="/admin/rejection" className="text-white px-4 hover:underline">Rejected Applications</Link>
              <Link to="/admin/profile" className="text-white px-4 hover:underline">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-white px-4 hover:underline">Home</Link>
              <Link to="/create-certificate" className="text-white px-4 hover:underline">Create Certificate</Link>
              <Link to="/user/profile" className="text-white px-4 hover:underline">Profile</Link>
            </>
          )}
          <Link to="/" className="text-white px-4 hover:underline">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
