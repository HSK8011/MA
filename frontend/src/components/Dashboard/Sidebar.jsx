import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const menuItems = [
  { 
    icon: '/images/page2/noun-dashboard-1359727@3x.png',
    text: 'Dashboard',
    path: '/dashboard'
  },
  { 
    icon: '/images/page2/noun-chain-2988965@3x.png',
    text: 'Connect',
    path: '/connect'
  },
  { 
    icon: '/images/page2/noun-paper-plane-2249333@3x.png',
    text: 'Publish',
    path: '/publish'
  },
  { 
    icon: '/images/page2/noun-chat-5056751@3x.png',
    text: 'Engage',
    path: '/engage'
  },
  { 
    icon: '/images/page2/noun-like-3323422@3x.png',
    text: 'Promote', 
    path: '/promote',
    badge: 'PRO'
  },
  { 
    icon: '/images/page2/noun-analytics-1018764@3x.png',
    text: 'Analyze', 
    path: '/analyze',
    badge: 'PRO'
  }
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/images/page1/logo.png" alt="Marketing Automation Tools" />
        <div className={styles.logoText}>
        </div>
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <img src={item.icon} alt={item.text} className={styles.icon} />
            <span className={styles.text}>{item.text}</span>
            {item.badge && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 