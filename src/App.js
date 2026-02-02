import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard';
import ViewUsers from './pages/ViewUsers';
import Transactions from './pages/Transactions';
import ViewSlots from './pages/ViewSlots';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import TopBar from './components/TopBar';
import ViewAllUsers from './pages/ViewAllUsers';
import VerifyParkingSlots from './pages/VerifyParkingSlots';
import SuspendUser from './pages/SuspendUser';
import ViewUserActivity from './pages/ViewUserActivity';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AllParkingSlots from './pages/AllParkingSlots';
import ViewComplaints from './pages/ViewComplaints';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Show TopBar and Main Content only when logged in */}
        {isLoggedIn && <TopBar />}

        <div style={{ flex: 1 }}>
          <Routes>
            {/* LOGIN ROUTE */}
            <Route
              path="/admin/login"
              element={
                isLoggedIn
                  ? <Navigate to="/dashboard" replace />
                  : <AdminLogin onLogin={() => setIsLoggedIn(true)} />
              }
            />

            {/* SIGNUP ROUTE */}
            <Route path="/admin/signup" element={<Signup />} />

            {/* PROTECTED ROUTES */}
            {isLoggedIn ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/view-users" element={<ViewUsers />} />
                <Route path="/viewall-users" element={<ViewAllUsers />} />
                <Route path="/verifyagent" element={<VerifyParkingSlots />} />
                <Route path="/suspend-user" element={<SuspendUser />} />
                <Route path="/view-user-activity" element={<ViewUserActivity />} />
                <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />

                <Route path="/transactions" element={<Transactions />} />
                <Route path="/view-slots" element={<ViewSlots />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/notifications" element={<Notifications />} />
                {/* Remove duplicate Notifications route */}
                <Route path="/view-all-slots" element={<AllParkingSlots />} />
                <Route path="/view-complaints" element={<ViewComplaints />} />
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
