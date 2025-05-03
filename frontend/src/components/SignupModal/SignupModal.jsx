import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { authService } from '../../services/authService';
import './SignupModal.css';

const SignupModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Guest'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      // Split full name into first and last name for the API
      const [firstName, ...lastNameParts] = formData.fullName.trim().split(' ');
      const lastName = lastNameParts.join(' ') || firstName; // If no last name, use first name

      const userData = {
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      const result = await authService.signup(userData);
      
      // Store the token in localStorage
      if (result.token) {
        localStorage.setItem('token', result.token);
      }
      
      // Close the modal
      onClose();
      
      // Optionally redirect or update UI state
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-modal-overlay">
      <div className="signup-modal-content">
        <button className="signup-modal-close" onClick={onClose}>×</button>
        
        <h2>Create Account</h2>
        <p className="signup-modal-subtitle">
        Start your free trial
        </p>

        {error && <div className="signup-error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="signup-form-group">
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

          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <div className="signup-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                disabled={isLoading}
                minLength="8"
                autoComplete="new-password"
              />
              <button 
                type="button" 
                className="signup-toggle-password"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="signup-create-account"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="signup-terms">
            By clicking "Create Account", I agree to MAT's{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
            {' '}and acknowledge its{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

SignupModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default SignupModal; 