import api from './api';

export const categoryService = {
  // Get all categories
  getAll: () => api.get('/categories'),

  // Get category by ID
  getById: (id) => api.get(`/categories/${id}`),

  // Create new category
  create: (data) => api.post('/categories', data),

  // Update category
  update: (id, data) => api.put(`/categories/${id}`, data),

  // Delete category
  delete: (id) => api.delete(`/categories/${id}`),
};