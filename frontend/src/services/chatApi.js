import { api } from './axiosInstance.js';

export const chatService = {
  sendMessage: async (message) => {
    try {
      const response = await api.post('/api/chat/send', { message });
      return response.data;
    } catch (error) {
      console.error('Send Message Error:', error);
      throw error.response?.data || { success: false, message: error.message };
    }
  },

  clearChat: async () => {
    try {
      const response = await api.post('/api/chat/clear');
      return response.data;
    } catch (error) {
      console.error('Clear Chat Error:', error);
      throw error.response?.data || { success: false, message: error.message };
    }
  }
}; 