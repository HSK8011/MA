import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollLock from '../../hooks/useScrollLock';
import SignupModal from '../SignupModal/SignupModal';
import LoginModal from '../LoginModal/LoginModal';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Use the custom hook for mobile menu
  useScrollLock(isMobileMenuOpen);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setIsSignupModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLink = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleMobileLink}>
          <img src="/images/page1/logo.png" alt="Marketing Automation Tools" />
        </Link>

        <button 
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-items">
            <Link to="/tools" onClick={handleMobileLink}>Tools</Link>
            <Link to="/pricing" onClick={handleMobileLink}>Pricing</Link>
            <Link to="/resources" onClick={handleMobileLink}>Resources</Link>
            <Link to="/about" onClick={handleMobileLink}>About</Link>
            <Link to="/customers" onClick={handleMobileLink}>Customers</Link>
          </div>
          <div className="navbar-buttons">
              <a href="#login" className="btn btn-secondary" onClick={handleLogin}>
                Login
              </a>
            <a href="#signup" className="btn btn-primary" onClick={handleGetStarted}>
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </nav>

      {isSignupModalOpen && (
        <SignupModal onClose={() => setIsSignupModalOpen(false)} />
      )}

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </>
  );
};

export default Navbar; 