import React, { createContext, useState, ReactNode } from 'react';

export interface Shuttle {
  id: number;
  status: boolean;
  color: string;
  driver: string;
  plate: string;
  routes: string;
}

interface ShuttleContextType {
  shuttles: Shuttle[];
  setShuttles: (shuttles: Shuttle[] | ((prev: Shuttle[]) => Shuttle[])) => void;
}

export const ShuttleContext = createContext<ShuttleContextType | undefined>(undefined);

export const ShuttleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colors = ['White', 'Blue', 'Green', 'Yellow', 'Black', 'Silver', 'Red', 'Orange'];

  const [shuttles, setShuttlesState] = React.useState<Shuttle[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      status: i % 2 === 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      driver: `Driver ${i + 1}`,
      plate: `PLATE-${i + 1}`,
      routes: 'Main Gate ↔ Campus'
    }))
  );

  const setShuttles = (value: Shuttle[] | ((prev: Shuttle[]) => Shuttle[])) => {
    if (typeof value === 'function') {
      setShuttlesState(value);
    } else {
      setShuttlesState(value);
    }
  };

  return (
    <ShuttleContext.Provider value={{ shuttles, setShuttles }}>
      {children}
    </ShuttleContext.Provider>
  );
};

export const useShuttles = () => {
  const context = React.useContext(ShuttleContext);
  if (!context) {
    throw new Error('useShuttles must be used within ShuttleProvider');
  }
  return context;
};
