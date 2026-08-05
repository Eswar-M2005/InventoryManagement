import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API calls for Products
export const productAPI = {
  // GET /api/products
  getAll: (params = {}) => api.get('/products', { params }),

  // GET /api/products/:id
  getById: (id) => api.get(`/products/${id}`),

  // POST /api/products
  create: (data) => api.post('/products', data),

  // PUT /api/products/:id
  update: (id, data) => api.put(`/products/${id}`, data),

  // DELETE /api/products/:id
  delete: (id) => api.delete(`/products/${id}`),

  // GET /api/products/search?keyword=
  search: (keyword) => api.get('/products/search', { params: { keyword } }),

  // GET /api/products/low-stock
  getLowStock: () => api.get('/products/low-stock'),
};

// API calls for Dashboard
export const dashboardAPI = {
  // GET /api/dashboard
  getStats: () => api.get('/dashboard'),
};

export default api;
