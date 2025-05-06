import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar';
import Sidebar from '../components/Dashboard/Sidebar';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <DashboardNavbar />
      <div className={styles.contentWrapper}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 