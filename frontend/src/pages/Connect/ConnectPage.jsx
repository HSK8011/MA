import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ConnectPage.module.css';

const initialSocialAccounts = [
  {
    id: 1,
    name: 'aimdektech',
    type: 'Twitter Profile',
    accountIcon: '/images/page2/company.png',
    platformIcon: '/images/page3/twitter@3x.png',
    connected: true,
    status: 'active'
  },
  {
    id: 2,
    name: 'aimdek-technologies',
    type: 'LinkedIn Page',
    accountIcon: '/images/page2/company.png',
    platformIcon: '/images/page3/linkedin@3x.png',
    connected: true,
    status: 'active'
  },
  {
    id: 3,
    name: 'AIMDek Technologies',
    type: 'Facebook Page',
    accountIcon: '/images/page2/company.png',
    platformIcon: '/images/page3/facebook@3x.png',
    connected: true,
    status: 'active'
  },
  {
    id: 4,
    name: 'Avakash Dekavadiya',
    type: 'Pinterest Profile',
    accountIcon: '/images/page2/company.png',
    platformIcon: '/images/page3/pinterest-seeklogo-com@3x.png',
    connected: false,
    status: 'inactive'
  }
];

const ConnectPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [socialAccounts, setSocialAccounts] = useState(initialSocialAccounts);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDisconnect = (accountId) => {
    setSocialAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id === accountId
          ? { ...account, connected: false, status: 'inactive' }
          : account
      )
    );
  };

  const handleReconnect = (accountId) => {
    setSocialAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id === accountId
          ? { ...account, connected: true, status: 'active' }
          : account
      )
    );
  };

  const handleRemove = (accountId) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to remove this account? This action cannot be undone.')) {
      setSocialAccounts(prevAccounts =>
        prevAccounts.filter(account => account.id !== accountId)
      );
    }
  };

  const handleManageQueue = (accountId) => {
    // Handle queue management
    console.log('Managing queue for account:', accountId);
  };

  // Filter accounts based on search term
  const filteredAccounts = socialAccounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.connectPage}>
      <div className={styles.header}>
        <h1>Connect to Social Network</h1>
        <Link to="/connect/new" className={styles.connectButton}>
          Connect New Channel
        </Link>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.searchBar}>
          <img src="/images/page2/search.png" alt="Search" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search social account"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className={styles.accountsList}>
          {filteredAccounts.map(account => (
            <div key={account.id} className={styles.accountCard}>
              <div className={styles.accountInfo}>
                <div className={styles.status}>
                  <img 
                    src={account.status === 'active' ? '/images/page2/active@3x.png' : '/images/page2/disconnect.png'} 
                    alt={account.status} 
                    className={styles.statusIcon}
                  />
                </div>
                <div className={styles.accountLogos}>
                  <img 
                    src={account.accountIcon} 
                    alt={`${account.name} profile`} 
                    className={styles.accountIcon}
                  />
                  <img 
                    src={account.platformIcon} 
                    alt={account.type} 
                    className={styles.platformIcon}
                  />
                </div>
                <div className={styles.accountDetails}>
                  <h3>{account.name}</h3>
                  <p>{account.type}</p>
                </div>
              </div>
              
              <div className={styles.actions}>
                {account.connected ? (
                  <>
                    <button onClick={() => handleDisconnect(account.id)} className={`${styles.actionButton} ${styles.disconnectButton}`}>
                      <img src="/images/page2/disconnect.png" alt="Disconnect" className={styles.buttonIcon} />{' '}
                      Disconnect
                    </button>
                    <button onClick={() => handleManageQueue(account.id)} className={`${styles.actionButton} ${styles.queueButton}`}>
                      <img src="/images/page2/queue.png" alt="Queue" className={styles.buttonIcon} />{' '}
                      Manage Queue Time
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleReconnect(account.id)} className={`${styles.actionButton} ${styles.reconnectButton}`}>
                    <img src="/images/page2/reconnect.png" alt="Reconnect" className={styles.buttonIcon} />{' '}
                    Reconnect
                  </button>
                )}
                <button onClick={() => handleRemove(account.id)} className={`${styles.actionButton} ${styles.removeButton}`}>
                  <img src="/images/page2/delete.png" alt="Remove" className={styles.buttonIcon} />{' '}
                  Remove Channel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectPage; 