import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch featured products (latest 6)
      const productsResponse = await productService.getAll({ limit: 6, page: 1 });
      setFeaturedProducts(productsResponse.data.data);
      
      // Fetch categories
      const categoriesResponse = await categoryService.getAll();
      setCategories(categoriesResponse.data.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hoş Gəlmisiniz
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Ən yaxşı məhsulları kəşf edin
          </p>
          <Link
            to="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Məhsullara Bax
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Kateqoriyalar</h2>
          
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category._id}`}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-4xl mb-4">📂</div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Heç bir kateqoriya tapılmadı</div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Seçilmiş Məhsullar</h2>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Hamısına Bax →
            </Link>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Link 
                        to={`/products/${product._id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                      >
                        {product.title}
                      </Link>
                      <span className="text-lg font-bold text-blue-600">
                        ${product.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category?.name}
                      </span>
                      <Link
                        to={`/products/${product._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                      >
                        Ətraflı
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Heç bir məhsul tapılmadı</div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Daha çox məhsul kəşf edin</h2>
          <p className="text-xl mb-8 opacity-90">
            Geniş məhsul çeşidimizə baxın və sizə uyğun olanı tapın
          </p>
          <Link
            to="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Bütün Məhsullar
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;