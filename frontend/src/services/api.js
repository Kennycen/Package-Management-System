import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('Response Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error('Network Error:', error.request);
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Package service functions
export const packageService = {
  addPackage: async (packageData) => {
    try {
      const response = await api.post('/api/package/add', packageData);
      return response.data;
    } catch (error) {
      console.error('Add Package Error:', error);
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  getPackagesByStatus: async (status) => {
    try {
      const response = await api.get(`/api/package/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Get Packages Error:', error);
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  updatePackageStatus: async (packageId, newStatus) => {
    try {
      const response = await api.put(`/api/package/status/${packageId}`, { 
        status: newStatus,
        date: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Update Status Error:', error);
      throw error.response?.data || { success: false, message: error.message };
    }
  }
}; 