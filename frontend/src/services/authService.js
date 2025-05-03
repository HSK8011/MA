const API_BASE_URL = 'http://localhost:5000/api/v1';

// Helper function to handle API errors
const handleApiError = (error, operation) => {
  console.error(`${operation} failed:`, error);
  
  if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
    throw new Error('Unable to connect to the server. Please check your internet connection.');
  }

  if (error.response) {
    throw new Error(error.response.message || `${operation} failed`);
  }

  throw error;
};

export const authService = {
  // Signup
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');
      return data;
    } catch (error) {
      return handleApiError(error, 'Signup');
    }
  },

  // Login
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error, 'Login');
    }
  },

  // Request Password Reset
  requestPasswordReset: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to request password reset');
      return data;
    } catch (error) {
      return handleApiError(error, 'Password reset request');
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid OTP');
      return data;
    } catch (error) {
      return handleApiError(error, 'OTP verification');
    }
  },

  // Reset Password
  resetPassword: async (resetToken, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to reset password');
      return data;
    } catch (error) {
      return handleApiError(error, 'Password reset');
    }
  },

  // Logout
  logout: () => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Failed to clear session data');
    }
  }
}; 