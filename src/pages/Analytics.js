import React from 'react';
import { Link } from 'react-router-dom';
import './Analytics.css';

const Analytics = () => {
  return (
    <div className="analytics-container">
      <h2>📊 Analytics Dashboard</h2>

      {/* Row 1 - Two cards */}
      <div className="analytics-row">
        <div className="analytics-card">
          <h3>📉 View Analytics and Dashboard</h3>
          <p>Track system usage, growth, and key performance indicators.</p>
          <Link to="/analytics-dashboard">
            <button className="action-button">Open Dashboard</button>
          </Link>
        </div>

        <div className="analytics-card">
          <h3>🕵️‍♂️ Monitor Slot Performance</h3>
          <p>Get insights into each parking slot’s usage, revenue, and ratings.</p>
          <button className="action-button">View Performance</button>
        </div>
      </div>

    

      {/* Row 3 - Full width centered card */}
      <div className="analytics-row-center">
        <div className="analytics-card large">
          <h3>🚓 View Theft Report</h3>
          <p>Monitor any suspicious or theft-related incidents reported.</p>
          <button className="action-button">Check Theft Logs</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
