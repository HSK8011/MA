import React, { useState } from 'react';
import './About.css';
import SignupModal from '../../components/SignupModal/SignupModal';

const About = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setIsSignupModalOpen(true);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About</h1>
          <p>With a publishing analysis and engagement platform you can trust,<br />you can tell your product's narrative and develop your audience.</p>
        </div>
      </section>

      {/* About MAT Section */}
      <section className="about-mat-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/page1/city.png" alt="City view with street signs" />
            </div>
            <div className="about-content">
              <h2>About MAT</h2>
              <p>
                Marketing Automation Tool (MAT) is a comprehensive platform designed to help businesses streamline their social media presence and enhance their digital marketing efforts. Our platform serves over 140,000 users monthly, helping them build and maintain their brand presence across social media channels.
              </p>
              <p>
                We provide cutting-edge tools for content scheduling, analytics tracking, and engagement monitoring, all through an intuitive and user-friendly interface. Our mission is to simplify the complex world of social media management while delivering powerful results for our users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Team Section */}
      <section className="about-team-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/page1/city.png" alt="City view showing urban landscape" />
            </div>
            <div className="about-content">
              <h2>About Team</h2>
              <p>
                Our team consists of passionate individuals dedicated to revolutionizing social media management. With diverse expertise in social media, marketing, and technology, we work together to deliver innovative solutions that help our users succeed in their digital marketing endeavors.
              </p>
              <p>
                We believe in continuous improvement and staying ahead of social media trends to provide our users with the most effective tools for their marketing needs. Our commitment to excellence drives us to constantly enhance our platform and provide exceptional support to our growing user base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="get-started-section">
        <div className="about-container text-center">
          <h2>140,000+ people like you use MAT to build<br />their brand on social media every month</h2>
          <button className="btn btn-primary" onClick={handleGetStarted}>
            Get Started Now
          </button>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="about-container">
          <h2 className="text-center">A few of the amazing brands who trust MAT</h2>
          <div className="brands-grid">
            <div className="brand-logo">
              <img src="/images/page1/mono.png" alt="Monogram" />
            </div>
            <div className="brand-logo">
              <img src="/images/page1/mono.png" alt="Monogram" />
            </div>
            <div className="brand-logo">
              <img src="/images/page1/mono.png" alt="Monogram" />
            </div>
            <div className="brand-logo">
              <img src="/images/page1/mono.png" alt="Monogram" />
            </div>
          </div>
        </div>
      </section>

      {isSignupModalOpen && (
        <SignupModal onClose={() => setIsSignupModalOpen(false)} />
      )}
    </div>
  );
};

export default About; 