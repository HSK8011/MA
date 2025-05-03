import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignupModal from '../SignupModal/SignupModal';
import useScrollLock from '../../hooks/useScrollLock';
import './Navbar.css';

const Navbar = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use the custom hook for both modal and mobile menu
  useScrollLock(isMobileMenuOpen || isSignupModalOpen);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setIsSignupModalOpen(true);
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
            <img src="images/page1/logo.png" alt="Marketing Automation Tools" />
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

          <div 
            className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="nav-items">
              <Link to="/tools" onClick={handleMobileLink}>Tools</Link>
              <Link to="/pricing" onClick={handleMobileLink}>Pricing</Link>
              <Link to="/resources" onClick={handleMobileLink}>Resources</Link>
              <Link to="/about" onClick={handleMobileLink}>About</Link>
              <Link to="/customers" onClick={handleMobileLink}>Customers</Link>
            </div>
            <div className="navbar-buttons">
              <a href="#signup" className="btn btn-primary" onClick={handleGetStarted}>Get Started Now</a>
              <Link to="/login" className="btn btn-outline" onClick={handleMobileLink}>Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </>
  );
};

export default Navbar; 