import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { authService } from '../../services/authService';
import './ForgotPassword.css';

const ForgotPassword = ({ onClose, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('email'); // email -> otp -> newPassword
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authService.requestPasswordReset(email);
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.verifyOTP(email, otp);
      if (!response?.resetToken) {
        throw new Error('Invalid response from server');
      }
      setResetToken(response.resetToken);
      setStep('newPassword');
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError(err.message || 'Invalid OTP. Please try again.');
      setStep('otp'); // Stay on OTP step on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(resetToken, newPassword);
      setSuccess(true);
      setTimeout(() => {
        onBackToLogin();
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="forgot-password-modal-overlay">
      <div className="forgot-password-modal-content">
        <button className="forgot-password-modal-close" onClick={onClose}>×</button>
        
        <h2>Forgot Password</h2>
        <p className="forgot-password-modal-subtitle">
          {step === 'email' && 'Enter your email to receive a verification code.'}
          {step === 'otp' && 'Enter the verification code sent to your email.'}
          {step === 'newPassword' && 'Create a new password for your account.'}
        </p>

        {error && <p className="forgot-password-error-message">{error}</p>}
        {success && (
          <p className="forgot-password-success-message">
            Password has been reset successfully! Redirecting to login...
          </p>
        )}

        {step === 'email' && (
          <form onSubmit={handleRequestOTP}>
            <div className="forgot-password-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="forgot-password-submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>

            <button 
              type="button"
              className="back-to-login-button"
              onClick={onBackToLogin}
            >
              Back to Login
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP}>
            <div className="forgot-password-form-group">
              <label htmlFor="otp">Verification Code</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength="6"
                pattern="[0-9]{6}"
                required
                disabled={isLoading}
              />
              <p className="forgot-password-hint">For testing, use code: 000000</p>
            </div>

            <button 
              type="submit" 
              className="forgot-password-submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button 
              type="button"
              className="back-to-login-button"
              onClick={() => setStep('email')}
            >
              Back
            </button>
          </form>
        )}

        {step === 'newPassword' && (
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              id="email"
              value={email}
              autoComplete="username"
              style={{ display: 'none' }}
              readOnly
            />
            <div className="forgot-password-form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="forgot-password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  disabled={isLoading}
                  minLength="8"
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  className="toggle-password-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="forgot-password-form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="forgot-password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  disabled={isLoading}
                  minLength="8"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="forgot-password-submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>

            <button 
              type="button"
              className="back-to-login-button"
              onClick={() => setStep('otp')}
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
};

export default ForgotPassword; 