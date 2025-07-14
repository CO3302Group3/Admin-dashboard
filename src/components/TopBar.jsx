import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa'; // Dashboard icon

import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="left-section">
        <FaTachometerAlt className="dashboard-icon" />
        <span className="dashboard-title">Admin Dashboard</span>
      </div>
      <div className="right-section">
        <Link to="/view-users" className="tab">Users</Link>
        <Link to="/transactions" className="tab">Transactions</Link>
        <Link to="/analytics" className="tab">Analytics</Link>
         <Link to="/view-slots" className="tab">Parking Slots</Link>
        <Link to="/notifications" className="tab">Notifications</Link>
       
      </div>
    </div>
  );
};

export default TopBar;
