import React from 'react';
import './ViewSlots.css';

const ViewSlots = () => {
  return (
    <div className="slots-container">
      <h2>🚗 Parking Slot Management</h2>

      <div className="slot-card-container">
        <div className="slot-section">
          <h3>📋 View All Parking Slots</h3>
          <p>Explore all available parking areas registered in the system.</p>
          <button className="action-button">View Slots</button>
        </div>

        <div className="slot-section">
          <h3>✅❌ Approve or Reject New Slots</h3>
          <p>Manage new slot registration requests from providers.</p>
          <button className="action-button">Review Requests</button>
        </div>

        <div className="full-width-center">
          <div className="slot-section">
            <h3>📜 Terms & Conditions / Privacy Policy</h3>
            <p>Update legal agreements and ensure user compliance.</p>
            <button className="action-button">Manage Policies</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Make sure this line exists
export default ViewSlots;
