import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Truck, Settings, LogOut, Menu, X } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isAdmin = location.pathname.startsWith('/admin');

  const menuItems = isAdmin
    ? [
        { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Truck, label: 'Shuttle Management', path: '/admin/shuttle-management' },
        { icon: Settings, label: 'Settings & Configuration', path: '/admin/setting-configuration' },
      ]
    : [
        { icon: Home, label: 'Dashboard', path: '/user/dashboard' },
        { icon: Settings, label: 'Settings & Configuration', path: '/user/setting-configuration' }
      ];

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-[220px] bg-white shadow-lg z-50 transition-transform duration-300 md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">
            Campus<span className="text-yellow-500">Go</span>
          </h1>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  closeMobileMenu();
                }}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              onLogout();
              closeMobileMenu();
            }}
            className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors mt-8"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
