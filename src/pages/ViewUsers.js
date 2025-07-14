// src/pages/ViewUsers.js
import React from 'react';
import './ViewUsers.css';

const ViewUsers = () => {
  return (
    <div className="users-container">
      <h2>👥 User Management</h2>

      <div className="user-card-container">
        <div className="user-card">
          <h3>✅ View All Users</h3>
          <p>List all registered users in the system with filters and search.</p>
          <button>Open</button>
        </div>

        <div className="user-card">
          <h3>👮 Verify New Agent Requests</h3>
          <p>Approve or reject agents requesting to register.</p>
          <button>Open</button>
        </div>

        <div className="user-card">
          <h3>🛑 Suspend or Ban User</h3>
          <p>Block users who violate system policies.</p>
          <button>Suspend User</button>
        </div>

        <div className="user-card">
          <h3>🔄 View User Activity</h3>
          <p>Track login times, bookings, and session history.</p>
          <button>View Activity</button>
        </div>

        <div className="user-card">
          <h3>🗣️ Monitor User Complaints</h3>
          <p>Handle user-reported issues or feedback.</p>
          <button>View Complaints</button>
        </div>

        <div className="user-card">
          <h3>📱 View Connected Devices</h3>
          <p>Check which devices are linked to the user account.</p>
          <button>View Devices</button>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
