import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShuttleProvider } from './ShuttleContext';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import AdminShuttleManagement from './AdminShuttleManagement';
import SettingsConfiguration from './SettingsConfigurations';
import UserDashboard from './UserDashboard';

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <ShuttleProvider>
      <Router>
        <Routes>

          {/* Login / root */}
          <Route
            path="/"
            element={
              userRole ? (
                <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={userRole === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/shuttle-management"
            element={userRole === 'admin' ? <AdminShuttleManagement onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/setting-configuration"
            element={userRole === 'admin' ? <SettingsConfiguration role="admin" onLogout={handleLogout} /> : <Navigate to="/" />}
          />

          {/* Student routes */}
          <Route
            path="/user/dashboard"
            element={userRole === 'student' ? <UserDashboard onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/user/setting-configuration"
            element={userRole === 'student' ? <SettingsConfiguration role="user" onLogout={handleLogout} /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </ShuttleProvider>
  );
}

export default App;
