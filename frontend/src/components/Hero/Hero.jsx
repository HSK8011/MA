import React, { useState } from 'react';
import './Hero.css';
import SignupModal from '../SignupModal/SignupModal';

const Hero = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setIsSignupModalOpen(true);
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <h1>Quicker and easier social media platform for genuine interaction</h1>
        <p className="hero-subtitle">
          With a publishing analysis and engagement platform you can trust,
          you can tell your product's narrative and develop your audience.
        </p>
        <a href="#signup" className="btn btn-primary" onClick={handleGetStarted}>
          Get Started Now
        </a>
        <p className="hero-note">
          No credit card required. Cancel anytime 14-day free trial
        </p>
      </div>
      {isSignupModalOpen && (
        <SignupModal onClose={() => setIsSignupModalOpen(false)} />
      )}
    </section>
  );
};

export default Hero; 