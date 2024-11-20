import Navbar from './Navbar';

const Layout = ({ children, isAdmin }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAdmin={isAdmin} />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
