import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  return (
    <div className="analytics-dashboard-screen">
      <div className="analytics-dashboard-card">
        <h2>📊 Analytics Dashboard</h2>
        <p>
          View system analytics, user statistics, and trends. Interactive charts and graphs help you understand platform performance.
        </p>
        <div className="chart-area">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[ 
                { month: "Jan", users: 120 },
                { month: "Feb", users: 190 },
                { month: "Mar", users: 170 },
                { month: "Apr", users: 220 },
                { month: "May", users: 260 },
                { month: "Jun", users: 300 }
              ]}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#0ea5e9" name="Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
