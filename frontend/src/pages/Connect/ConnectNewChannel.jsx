import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ConnectNewChannel.module.css';

const socialPlatforms = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: '/images/page3/twitter@3x.png',
    description: 'Connect your Twitter profile to schedule tweets and track engagement'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/images/page3/linkedin@3x.png',
    description: 'Share professional content and engage with your network'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: '/images/page3/pinterest-seeklogo-com@3x.png',
    description: 'Schedule pins and manage your Pinterest presence'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '/images/page3/facebook@3x.png',
    description: 'Connect your Facebook pages and profiles'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '/images/page3/insta.png',
    description: 'Schedule posts and manage your Instagram presence'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: '/images/page3/shopify.png',
    description: 'Connect your Shopify store to sync products and content'
  }
];

const ConnectNewChannel = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/connect');
  };

  const handleConnect = (platformId) => {
    // Handle platform connection
    console.log('Connecting to:', platformId);
  };

  return (
    <div className={styles.connectNewPage}>
      <h1 className={styles.mainHeading}>CONNECT TO SOCIAL NETWORK</h1>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <h2 className={styles.blueTitle}>Connect New Channel</h2>
              <p className={styles.description}>
                Looking for step-by-step instructions? Visit our Help Center to read our Getting Started guides and learn about supported channel types.
              </p>
            </div>
            <button onClick={handleBack} className={styles.backButton}>
              <svg 
                className={styles.backArrow} 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M15 8H1M1 8L8 15M1 8L8 1" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              Back To Channels
            </button>
          </div>

          <div className={styles.platformGrid}>
            {socialPlatforms.map(platform => (
              <div key={platform.id} className={styles.platformCard}>
                <div className={styles.platformIcon}>
                  <img src={platform.icon} alt={platform.name} />
                </div>
                <div className={styles.platformInfo}>
                  <h3>{platform.name}</h3>
                  <p>{platform.description}</p>
                </div>
                <button 
                  onClick={() => handleConnect(platform.id)}
                  className={styles.connectButton}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sidePanel}>
          <div className={styles.planInfo}>
            <div className={styles.trialWarning}>
              Your trial will expire in 5 days
            </div>
            <div className={styles.giftIcon}>
              <img src="/images/page3/gift.png" alt="Current Plan" />
            </div>
            <h2>CURRENT PLAN</h2>
            <h3>FREE PLAN</h3>
            <p>You've hit your plan limit of 3 connected channels.</p>
            <button className={styles.upgradeNowButton}>
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectNewChannel; 