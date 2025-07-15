import React from 'react';

const Dashboard = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/backgroundimage.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh', // full viewport height
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        position: 'relative',
        minHeight: '100vh'

      }}
    >
      {/* Overlay box */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '50px 60px',
          borderRadius: '20px',
          textAlign: 'center',
          color: 'white',
          maxWidth: '700px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(6px)',
          zIndex: 1,
          marginTop: '60px', // adjust spacing below TopBar
        }}
      >
        <h1 style={{ fontSize: '42px', marginBottom: '20px', letterSpacing: '1px' }}>
          🚀 Welcome, Admin!
        </h1>
        <p style={{ fontSize: '18px', color: '#ddd', marginBottom: '30px' }}>
          This is your powerful control center to manage everything — users, slots, payments, and system health.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
          <div style={featureCard}>
            <h3>👥 Manage Users</h3>
            <p>Add, suspend, or verify agents and users efficiently.</p>
          </div>
          <div style={featureCard}>
            <h3>📊 Monitor Analytics</h3>
            <p>Track parking trends, revenue, and slot performance.</p>
          </div>
          <div style={featureCard}>
            <h3>🔔 Handle Alerts</h3>
            <p>Instantly resolve reports, complaints, and system issues.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const featureCard = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '16px 20px',
  borderRadius: '12px',
  width: '200px',
  backdropFilter: 'blur(2px)',
  color: 'white',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
};

export default Dashboard;
