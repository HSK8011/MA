import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Tools</h4>
          <nav>
            <Link to="/publishing">Publishing</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/engagement">Engagement</Link>
            <Link to="/pricing">Pricing</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <nav>
            <Link to="/customers">Customers</Link>
            <Link to="/community">Community</Link>
            <Link to="/about">About Us</Link>
            <Link to="/feature-request">Make a feature request</Link>
            <Link to="/non-profit">Non-Profit organizations</Link>
            <Link to="/professions">Professions</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <nav>
            <Link to="/support">Support</Link>
            <Link to="/tutorials">Tutorials for Webinars</Link>
            <Link to="/twitter">Follow us on Twitter</Link>
            <Link to="/covid-status">COVID-19 Assistance Status</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Free Resources</h4>
          <nav>
            <Link to="/browser-extensions">Resource center for Browser Extensions</Link>
            <Link to="/timeline">Transparency timeline for the content</Link>
            <Link to="/podcast">library remix podcast</Link>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2023, All Rights Reserved to Marketing Automation Tool</p>
      </div>
    </footer>
  );
};

export default Footer; 