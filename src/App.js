import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import TopBar from './components/TopBar';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './components/Dashboard';
import ViewUsers from './pages/ViewUsers';
import Transactions from './pages/Transactions';
import ViewSlots from './pages/ViewSlots'; // ✅ Add more pages as needed
import Analytics from './pages/Analytics';
 import Notifications from './pages/Notifications';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* ✅ Show TopBar only when logged in */}
        {isLoggedIn && <TopBar onLogout={() => setIsLoggedIn(false)} />}

        <div style={{ flex: 1 }}>
          <Routes>
            {/* ✅ LOGIN ROUTE */}
            <Route
              path="/admin/login"
              element={
                isLoggedIn
                  ? <Navigate to="/dashboard" replace />
                  : <AdminLogin onLogin={() => setIsLoggedIn(true)} />
              }
            />

            {/* ✅ PROTECTED ROUTES */}
            {isLoggedIn ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/view-users" element={<ViewUsers />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/view-slots" element={<ViewSlots />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/notifications" element={<Notifications />} />
                {/* Future Routes:
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/notifications" element={<Notifications />} /> */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/admin/login" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
