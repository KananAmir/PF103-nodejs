import api from './api';

export const productService = {
  // Get all products with query params
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/products${queryString ? `?${queryString}` : ''}`);
  },

  // Get product by ID
  getById: (id) => api.get(`/products/${id}`),

  // Create new product
  create: (formData) => {
    return api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update product
  update: (id, data) => api.put(`/products/${id}`, data),

  // Delete product
  delete: (id) => api.delete(`/products/${id}`),

  // Delete all products
  deleteAll: () => api.delete('/products'),
};