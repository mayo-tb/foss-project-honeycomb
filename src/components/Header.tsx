import React from 'react';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
  return (
    <div className="fixed top-0 left-0 md:left-[220px] right-0 h-[60px] bg-white shadow-sm z-40 flex items-center justify-between px-4 md:px-6">
      <h2 className="text-lg md:text-xl font-semibold ml-12 md:ml-0">{title}</h2>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 md:px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm md:text-base"
      >
        <LogOut size={20} />
        <span className="hidden sm:inline text-sm font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Header;
