import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LiveMap from './components/LiveMap';
import { useShuttles } from './ShuttleContext';

interface UserDashboardProps {
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onLogout }) => {
  const { shuttles } = useShuttles();
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 md:ml-[220px] pt-[60px] overflow-auto">
        <Header title="Hello, James." onLogout={onLogout} />

        <div className="p-4 md:p-6 mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Live Map */}
          <div className="lg:col-span-3 border border-gray-300 rounded-lg p-4 md:p-6 bg-white h-[300px] md:h-[500px]">
            <LiveMap shuttles={shuttles} />
          </div>

          {/* Available Shuttles */}
          <div className="lg:col-span-1 w-full bg-white rounded-lg p-4 md:p-6 shadow-sm h-[300px] md:h-[500px] overflow-y-auto">
            <h3 className="font-bold mb-4">Available Shuttles</h3>
            {shuttles.map((shuttle) => (
              <div key={shuttle.id} className="border border-gray-300 rounded-lg p-3 mb-3 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="text-sm">
                  <strong className="block">Shuttle {String(shuttle.id).padStart(3, '0')}</strong>
                  <span className="text-xs text-gray-600">Plate: {shuttle.plate}</span><br />
                  <span className="text-xs text-gray-600">Route: {shuttle.routes}</span><br />
                  <span className="text-xs text-gray-600">ETA: 2 min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;