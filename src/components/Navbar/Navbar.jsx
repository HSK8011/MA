import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignupModal from '../SignupModal/SignupModal';
import './Navbar.css';

const Navbar = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Handle body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setIsSignupModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu when opening modal
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLink = () => {
    setIsMobileMenuOpen(false);
  };

  const handleModalClose = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={handleMobileLink}>
            <img src="/images/logo.png" alt="Marketing Automation Tools" />
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
            <Link to="/tools" onClick={handleMobileLink}>Tools</Link>
            <Link to="/pricing" onClick={handleMobileLink}>Pricing</Link>
            <Link to="/resources" onClick={handleMobileLink}>Resources</Link>
            <Link to="/about" onClick={handleMobileLink}>About</Link>
            <Link to="/customers" onClick={handleMobileLink}>Customers</Link>
          </div>

          <div className={`navbar-buttons ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#signup" className="btn btn-primary" onClick={handleGetStarted}>
              Get Started Now
            </a>
            <Link to="/login" className="btn btn-outline" onClick={handleMobileLink}>
              Login
            </Link>
          </div>
        </div>
      </nav>

      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Navbar; 