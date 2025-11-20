import React, { useState, useEffect } from 'react';
import { useShuttles } from '../ShuttleContext';

interface ShuttleMarker {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const LiveMap: React.FC = () => {
  const { shuttles } = useShuttles();
  const [markers, setMarkers] = useState<ShuttleMarker[]>([]);

  // Initialize markers with random positions and velocities
  useEffect(() => {
    const newMarkers = shuttles.map(shuttle => ({
      id: shuttle.id,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: shuttle.color
    }));
    setMarkers(newMarkers);
  }, [shuttles]);

  // Animate shuttle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkers(prevMarkers =>
        prevMarkers.map(marker => {
          let newX = marker.x + marker.vx;
          let newY = marker.y + marker.vy;
          let newVx = marker.vx;
          let newVy = marker.vy;

          // Bounce off edges
          if (newX < 5 || newX > 95) {
            newVx = -marker.vx;
            newX = Math.max(5, Math.min(95, newX));
          }
          if (newY < 5 || newY > 95) {
            newVy = -marker.vy;
            newY = Math.max(5, Math.min(95, newY));
          }

          return {
            ...marker,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Color mapping for shuttle colors
  const getColorHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'White': '#F5F5F5',
      'Blue': '#3B82F6',
      'Green': '#10B981',
      'Yellow': '#FBBF24',
      'Black': '#1F2937',
      'Silver': '#D1D5DB',
      'Red': '#EF4444',
      'Orange': '#F97316'
    };
    return colorMap[colorName] || '#999';
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
      {/* Babcock University Map Background */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Background */}
          <rect width="100" height="100" fill="#E8F5E9" />
          
          {/* Roads/Paths */}
          <path d="M 50 0 L 50 100" stroke="#999" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
          <path d="M 0 50 L 100 50" stroke="#999" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
          <path d="M 20 20 L 80 80" stroke="#999" strokeWidth="1" fill="none" strokeDasharray="2,2" />
          <path d="M 80 20 L 20 80" stroke="#999" strokeWidth="1" fill="none" strokeDasharray="2,2" />
          
          {/* Buildings */}
          <rect x="10" y="10" width="12" height="12" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.5" />
          <text x="13" y="17" fontSize="2" textAnchor="middle" fill="#333">Admin</text>
          
          <rect x="28" y="8" width="10" height="10" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.5" />
          <text x="33" y="14" fontSize="1.5" textAnchor="middle" fill="#333">LAB</text>
          
          <rect x="62" y="12" width="14" height="14" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.5" />
          <text x="69" y="20" fontSize="2" textAnchor="middle" fill="#333">Library</text>
          
          <rect x="78" y="30" width="12" height="12" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.5" />
          <text x="84" y="37" fontSize="1.5" textAnchor="middle" fill="#333">Sport</text>
          
          <rect x="8" y="45" width="13" height="13" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.5" />
          <text x="15" y="52" fontSize="2" textAnchor="middle" fill="#333">Hostel</text>
          
          <rect x="40" y="60" width="12" height="12" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.5" />
          <text x="46" y="67" fontSize="1.5" textAnchor="middle" fill="#333">Cafe</text>
          
          <rect x="70" y="75" width="12" height="12" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.5" />
          <text x="76" y="82" fontSize="1.5" textAnchor="middle" fill="#333">Gate</text>
          
          {/* Parking area */}
          <rect x="25" y="75" width="18" height="15" fill="#C5E1A5" stroke="#827717" strokeWidth="0.5" strokeDasharray="1,1" />
          <text x="34" y="84" fontSize="1.5" textAnchor="middle" fill="#333">Parking</text>
          
          {/* Map title */}
          <text x="50" y="5" fontSize="3" fontWeight="bold" textAnchor="middle" fill="#1976D2">Babcock University Campus</text>
        </svg>
      </div>

      {/* Shuttle Markers */}
      {markers.map(marker => (
        <div
          key={marker.id}
          className="absolute transition-all"
          style={{
            left: `${marker.x}%`,
            top: `${marker.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
        >
          {/* Shuttle Icon */}
          <div
            className="relative group"
            title={`Shuttle ${String(marker.id).padStart(3, '0')}`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={getColorHex(marker.color)}
              stroke="#333"
              strokeWidth="1.5"
              className="drop-shadow-lg hover:drop-shadow-xl transition-all"
            >
              {/* Shuttle bus shape */}
              <rect x="4" y="7" width="16" height="10" rx="2" />
              <circle cx="7" cy="17" r="1.5" />
              <circle cx="17" cy="17" r="1.5" />
              <rect x="4" y="6" width="16" height="2" rx="1" />
            </svg>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Shuttle {String(marker.id).padStart(3, '0')}
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-md text-xs">
        <div className="font-semibold mb-2">Active Shuttles:</div>
        <div className="space-y-1">
          {shuttles.map(shuttle => (
            <div key={shuttle.id} className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill={getColorHex(shuttle.color)}>
                <rect x="4" y="7" width="16" height="10" rx="2" />
                <circle cx="7" cy="17" r="1.5" />
                <circle cx="17" cy="17" r="1.5" />
              </svg>
              <span>
                Shuttle {String(shuttle.id).padStart(3, '0')} 
                <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs ${shuttle.status ? 'bg-green-500' : 'bg-red-500'}`}>
                  {shuttle.status ? 'Active' : 'Inactive'}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-md text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold">Live Tracking</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
