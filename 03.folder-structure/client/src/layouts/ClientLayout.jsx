import { Outlet, Link, useLocation } from 'react-router-dom';

const ClientLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Client Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              E-Commerce
            </Link>
            <nav className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-gray-600 hover:text-gray-800 ${location.pathname === '/' ? 'text-blue-600 font-medium' : ''}`}
              >
                Ana Səhifə
              </Link>
              <Link 
                to="/products" 
                className={`text-gray-600 hover:text-gray-800 ${location.pathname.includes('/products') ? 'text-blue-600 font-medium' : ''}`}
              >
                Məhsullar
              </Link>
              <Link 
                to="/admin" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Admin Panel
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>&copy; 2025 E-Commerce. Bütün hüquqlar qorunur.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;