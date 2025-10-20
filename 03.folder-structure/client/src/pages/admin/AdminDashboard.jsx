import { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent products
      const productsResponse = await productService.getAll({ limit: 5, page: 1 });
      setRecentProducts(productsResponse.data.data);
      setStats(prev => ({ ...prev, totalProducts: productsResponse.data.total }));
      
      // Fetch categories
      const categoriesResponse = await categoryService.getAll();
      setStats(prev => ({ ...prev, totalCategories: categoriesResponse.data.data.length }));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-blue-100">Ümumi Məhsullar</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="text-3xl opacity-80">📦</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-green-100">Ümumi Kateqoriyalar</p>
              <p className="text-2xl font-bold">{stats.totalCategories}</p>
            </div>
            <div className="text-3xl opacity-80">📂</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-purple-100">Son Məhsullar</p>
              <p className="text-2xl font-bold">{recentProducts.length}</p>
            </div>
            <div className="text-3xl opacity-80">🆕</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-orange-100">Status</p>
              <p className="text-2xl font-bold">Aktiv</p>
            </div>
            <div className="text-3xl opacity-80">✅</div>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Son Əlavə Edilən Məhsullar</h2>
        </div>
        
        {recentProducts.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {recentProducts.map((product) => (
              <div key={product._id} className="px-6 py-4 flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-12 w-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.category?.name}</p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${product.price}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString('az-AZ')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center text-gray-500">
            Heç bir məhsul tapılmadı
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;