import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AdminHome from './components/Admin/AdminHome';
import ApprovePage from './components/Admin/ApprovePage';
import RejectionPage from './components/Admin/RejectionPage';
import AdminProfile from './components/Admin/AdminProfile';
import UserHome from './components/User/UserHome';
import CreateCertificate from './components/User/CreateCertificate';
import UserProfile from './components/User/UserProfile';
import Login from './components/Login';
import Status from './components/User/Status'; 
import AdminStatusPage from './components/Admin/AdminStatusPage';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login setIsAdmin={setIsAdmin} setIsUser={setIsUser} />} />

        {/* Admin Routes */}
        {isAdmin ? (
          <>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/approve" element={<ApprovePage />} />
            <Route path="/admin/rejection" element={<RejectionPage />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/status" element={<AdminStatusPage />} />
          </>
        ) : null}

        {/* User Routes */}
        {isUser ? (
          <>
            <Route path="/user" element={<UserHome />} />
            <Route path="/create-certificate" element={<CreateCertificate />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/status" element={<Status />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
