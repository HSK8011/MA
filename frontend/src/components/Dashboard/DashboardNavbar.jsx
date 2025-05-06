import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import styles from './DashboardNavbar.module.css';

const DashboardNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    } else if (event.key === 'Escape' && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [isDropdownOpen, toggleDropdown]);

  const handleLogout = useCallback(() => {
    try {
      authService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [navigate]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.search}>
          <div className={styles.searchIconWrapper}>
            <img src="/images/page2/search.png" alt="Search" className={styles.searchIcon} />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <div className={styles.notificationWrapper}>
            <img src="/images/page2/bell.png" alt="Notifications" className={styles.notificationIcon} />
          </div>
        </button>

        <div className={styles.userInfoContainer}>
          <button 
            className={styles.userInfo}
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="User menu"
          >
            <img
              src="/images/page2/company.png"
              alt="User Avatar"
              className={styles.avatar}
            />
            <div className={styles.userDetails}>
              <span className={styles.companyName}>AIMDek Technologies</span>
              <span className={styles.email}>marketing@aimdek.com</span>
            </div>
            <span className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.dropdownArrowUp : ''}`} aria-hidden="true" />
          </button>

          {isDropdownOpen && (
            <div 
              className={styles.dropdown}
              role="menu"
              aria-labelledby="user-menu"
            >
              <div className={styles.dropdownHeader}>
                <img
                  src="/images/page2/company.png"
                  alt="Company Logo"
                  className={styles.dropdownLogo}
                />
                <div className={styles.dropdownHeaderText}>
                  <span className={styles.dropdownCompanyName}>AIMDek Technologies</span>
                  <span className={styles.dropdownEmail}>marketing@aimdek.com</span>
                </div>
              </div>
              
              <hr className={styles.dropdownDivider} />
              
              <Link 
                to="/settings" 
                className={styles.dropdownItem}
                role="menuitem"
              >
                <img src="/images/page2/setting.png" alt="" aria-hidden="true" />
                <span>Account & Settings</span>
              </Link>
              
              <Link 
                to="/users" 
                className={styles.dropdownItem}
                role="menuitem"
              >
                <img src="/images/page2/user.png" alt="" aria-hidden="true" />
                <span>Manage Users</span>
              </Link>
              
              <Link 
                to="/contact" 
                className={styles.dropdownItem}
                role="menuitem"
              >
                <img src="/images/page2/mails.png" alt="" aria-hidden="true" />
                <span>Contact Us</span>
              </Link>
              
              <hr className={styles.dropdownDivider} />
              
              <button 
                onClick={handleLogout} 
                className={styles.dropdownItem}
                role="menuitem"
              >
                <img src="/images/page2/logouts.png" alt="" aria-hidden="true" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 