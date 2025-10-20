import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await productService.getById(id);
        setProduct(response.data.data);
        
        // Fetch related products from same category
        if (response.data.data.category) {
          try {
            const relatedResponse = await productService.getAll({
              category: response.data.data.category._id || response.data.data.category,
              limit: 4
            });
            const filtered = relatedResponse.data.data.filter(p => p._id !== id);
            setRelatedProducts(filtered);
          } catch (relatedError) {
            console.error('Error fetching related products:', relatedError);
          }
        }
        
      } catch (error) {
        setError('Məhsul tapılmadı');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{error || 'Məhsul tapılmadı'}</h3>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Məhsullara qayıt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-blue-600">Ana səhifə</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/products" className="hover:text-blue-600">Məhsullar</Link>
          </li>
          <li>/</li>
          <li className="text-gray-700">{product.title}</li>
        </ol>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {product.category?.name}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(product.createdAt).toLocaleDateString('az-AZ')}
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold text-blue-600">
            ${product.price}
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Təsvir</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Səbətə əlavə et
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
              İstək siyahısına əlavə et
            </button>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Məhsul məlumatları</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-600">Kateqoriya:</dt>
                <dd className="font-medium">{product.category?.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Əlavə edilib:</dt>
                <dd className="font-medium">{new Date(product.createdAt).toLocaleDateString('az-AZ')}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Məhsul ID:</dt>
                <dd className="font-medium text-xs">{product._id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Oxşar məhsullar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <Link to={`/products/${relatedProduct._id}`}>
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link 
                      to={`/products/${relatedProduct._id}`}
                      className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-1"
                    >
                      {relatedProduct.title}
                    </Link>
                    <span className="text-lg font-bold text-blue-600 whitespace-nowrap ml-2">
                      ${relatedProduct.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {relatedProduct.description}
                  </p>
                  <Link
                    to={`/products/${relatedProduct._id}`}
                    className="block text-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Ətraflı
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;