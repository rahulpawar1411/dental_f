/**
 * API Service Wrapper (MVC Ready)
 * Configured for real backend integration.
 * Toggle USE_MOCK to true to fall back to browser localStorage.
 */

const USE_MOCK = false;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiService = {
  /**
   * Generic GET request wrapper
   */
  get: async (endpoint, mockController, mockMethodName, mockArgs = []) => {
    if (USE_MOCK) {
      if (mockController && mockController[mockMethodName]) {
        return mockController[mockMethodName](...mockArgs);
      }
      throw new Error(`Mock method ${mockMethodName} not found on controller.`);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`API GET request failed on endpoint ${endpoint}`);
      }
      return await response.json();
    } catch (e) {
      console.warn("Backend unavailable, falling back to local mocks...", e);
      if (mockController && mockController[mockMethodName]) {
        return mockController[mockMethodName](...mockArgs);
      }
      throw e;
    }
  },

  /**
   * Generic POST request wrapper
   */
  post: async (endpoint, data, mockController, mockMethodName) => {
    if (USE_MOCK) {
      if (mockController && mockController[mockMethodName]) {
        return mockController[mockMethodName](data);
      }
      throw new Error(`Mock method ${mockMethodName} not found on controller.`);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const resData = await response.json().catch(() => ({}));
      if (!response.ok) {
        return { 
          success: false, 
          errors: resData.errors || { global: 'Network request rejected by server' } 
        };
      }
      return resData;
    } catch (e) {
      console.warn("Backend unavailable, falling back to local mock submit...", e);
      if (mockController && mockController[mockMethodName]) {
        return mockController[mockMethodName](data);
      }
      return {
        success: false,
        errors: { global: "Failed to establish server connection. Verify your backend is running." }
      };
    }
  }
};
export default apiService;
