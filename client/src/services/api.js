// API Service - Xử lý các request đến backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function để lấy token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
};

// Product APIs
export const productAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  create: async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  },
};

// Cart APIs
export const cartAPI = {
  getCart: async () => {
    const response = await fetch(`${API_URL}/cart`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  addToCart: async (productId, quantity) => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },

  updateCartItem: async (productId, quantity) => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },

  removeFromCart: async (productId) => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ productId }),
    });
    return response.json();
  },
};

// Order APIs
export const orderAPI = {
  createOrder: async (orderData) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  getUserOrders: async () => {
    const response = await fetch(`${API_URL}/orders`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },
};

// User APIs
export const userAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  updateProfile: async (userData) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
};

export default {
  auth: authAPI,
  product: productAPI,
  cart: cartAPI,
  order: orderAPI,
  user: userAPI,
};
