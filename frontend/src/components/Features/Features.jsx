import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignupModal from '../SignupModal/SignupModal';
import './Features.css';

const Features = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setIsSignupModalOpen(true);
  };

  return (
    <>
      <section className="features">
        <h2>Media platform tools designed specifically for small business</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/page1/icon-content.png" alt="Content Creation" />
            </div>
            <h3>Put your content out there</h3>
            <p>Create eye-catching material for your social media networks, and take use of the most up-to-date Instagram capabilities.</p>
            <a href="#signup" className="btn btn-primary" onClick={handleGetStarted}>Get Started Now</a>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/page1/icon-content2.png" alt="Analytics" />
            </div>
            <h3>Examine your marketing tectics</h3>
            <p>To increase reach, endangerment, and sales, track your progress, create reports and gain insights.</p>
            <a href="#signup" className="btn btn-primary" onClick={handleGetStarted}>Get Started Now</a>
          </div>
        </div>

        <div className="features-detailed">
          <div className="feature-detailed">
            <div className="feature-content">
              <h3>Publish</h3>
              <p>Plan and arrange your social media initiatives visually, Co-ordinate creative efforts to increase social media engagement.</p>
              <Link to="/learn-more" className="feature-link">View More →</Link>
            </div>
            <div className="feature-image">
              <img src="/images/page1/img.png" alt="Publishing Feature" />
            </div>
          </div>

          <div className="feature-detailed analyze-section">
            <div className="feature-image">
              <img src="/images/page1/group-139.png" alt="Analytics Feature" />
            </div>
            <div className="feature-content">
              <h3>Analyze</h3>
              <p>Your content's performance should be measured and reported on. Gain in-depth knowledge to help you expand you reach revenue & engagement.</p>
              <Link to="/learn-more" className="feature-link">View More →</Link>
            </div>
          </div>

          <div className="feature-detailed">
            <div className="feature-content">
              <h3>Engage</h3>
              <p>Make connections with your audience. Engage with the most important comments faster and gain customer trust.</p>
              <Link to="/learn-more" className="feature-link">View More →</Link>
            </div>
            <div className="feature-image">
              <img src="/images/page1/group-185.png" alt="Engagement Feature" />
            </div>
          </div>
        </div>
      </section>

      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </>
  );
};

export default Features; 

