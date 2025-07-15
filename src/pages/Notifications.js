import React from 'react';

const Notifications = () => {
  return (
    <div
      style={{
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #1e1e2f, #2c2c3e)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <h2
        style={{
          fontSize: '38px',
          color: '#00f5d4',
          marginBottom: '40px',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        🔔 Notification Center
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        {/* Broadcast Notifications */}
        <div style={cardStyle}>
          <h3>📣 Broadcast Notifications</h3>
          <p>Send messages to all users or specific roles (admins, agents).</p>
          <button style={btnStyle}>Send Broadcast</button>
        </div>

        {/* Push OTA Firmware Updates */}
        <div style={cardStyle}>
          <h3>🛠️ Push OTA Firmware Updates</h3>
          <p>Remotely trigger over-the-air software or firmware updates.</p>
          <button style={btnStyle}>Push Update</button>
        </div>

        {/* Take Action */}
        <div style={cardStyle}>
          <h3>⚙️ Take Action</h3>
          <p>Review reported issues and take direct action from here.</p>
          <button style={btnStyle}>Review Reports</button>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  padding: '30px 25px',
  borderRadius: '18px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(6px)',
  color: '#e0f2f1',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const btnStyle = {
  backgroundColor: '#00c8aa',
  color: 'white',
  padding: '10px 18px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(0, 200, 170, 0.5)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  marginTop: '16px',
};

export default Notifications;
