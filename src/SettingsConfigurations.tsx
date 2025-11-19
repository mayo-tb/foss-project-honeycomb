import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SettingsForm from './components/SettingForm';
import AdminSettingsForm from './components/AdminSettingsForm';

interface SettingsConfigurationProps {
  onLogout: () => void;
  role: 'admin' | 'user';
}

const SettingsConfiguration: React.FC<SettingsConfigurationProps> = ({ onLogout, role }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={onLogout} />

      <div className="flex-1 md:ml-[220px] pt-[60px] overflow-auto">
        <Header title="Settings & Configuration." onLogout={onLogout} />

        <div className="mt-4 md:mt-6 p-4 md:p-6">
          {role === 'admin' ? <AdminSettingsForm /> : <SettingsForm />}
        </div>
      </div>
    </div>
  );
};

export default SettingsConfiguration;
