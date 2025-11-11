import React from "react";
import "./ViewUserActivity.css";

const ViewUserActivity = () => {
  return (
    <div className="user-activity-screen">
      <div className="user-activity-card">
        <h2>🔄 User Activity</h2>
        <p>
          Track login times, bookings, and session history for users. Search for a user to view detailed activity logs and recent actions.
        </p>
        {/* Add your user search and activity display logic here */}
        <input type="text" placeholder="Search user by name or ID" className="activity-search" />
        <div className="activity-list">
          {/* Example activity log */}
          <div className="activity-item">User logged in at 10:05 AM</div>
          <div className="activity-item">User booked slot #23 at 10:15 AM</div>
          <div className="activity-item">User logged out at 10:30 AM</div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserActivity;
