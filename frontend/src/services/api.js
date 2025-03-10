import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const packageService = {
  addPackage: async (packageData) => {
    try {
      const response = await api.post('/api/package/add', packageData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPackagesByStatus: async (status) => {
    try {
      const response = await api.get(`/api/package/status/${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
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
      throw error.response?.data || error.message;
    }
  }
}; 