import { api } from './axiosInstance.js'

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
  },

  deletePackage: async (packageId) => {
    try {
      const response = await api.delete(`/api/package/${packageId}`);
      return response.data;
    } catch (error) {
      console.error('Delete Package Error:', error);
      throw error.response?.data || { success: false, message: error.message };
    }
  }
}; 