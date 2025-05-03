import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { authService } from '../../services/authService';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import './LoginModal.css';

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authService.login(formData);
      
      // Close the modal
      onClose();
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  if (showForgotPassword) {
    return <ForgotPassword onClose={onClose} onBackToLogin={handleBackToLogin} />;
  }

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <button className="login-modal-close" onClick={onClose}>×</button>
        
        <h2>Welcome Back</h2>
        <p className="login-modal-subtitle">
          Log in to your account to continue
        </p>

        {error && <div className="login-error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <div className="login-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="login-toggle-password"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button 
            type="button" 
            className="login-forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>

          <button 
            type="submit" 
            className="login-submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default LoginModal; 