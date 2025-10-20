import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <nav className="space-x-4">
              <Link 
                to="/admin" 
                className={`px-4 py-2 rounded ${location.pathname === '/admin' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/products" 
                className={`px-4 py-2 rounded ${location.pathname.includes('/admin/products') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              >
                Products
              </Link>
              <Link 
                to="/admin/categories" 
                className={`px-4 py-2 rounded ${location.pathname.includes('/admin/categories') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              >
                Categories
              </Link>
              <Link 
                to="/" 
                className="px-4 py-2 rounded hover:bg-blue-700"
              >
                Client View
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Sidebar & Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Management</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/admin/products" 
                    className={`block px-4 py-2 rounded ${location.pathname.includes('/admin/products') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    📦 Products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/categories" 
                    className={`block px-4 py-2 rounded ${location.pathname.includes('/admin/categories') ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    📂 Categories
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-9">
            <div className="bg-white rounded-lg shadow">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;