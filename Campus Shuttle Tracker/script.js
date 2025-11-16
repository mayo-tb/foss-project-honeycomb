// Initialize the map
const map = L.map('map').setView([6.8936, 7.8575], 14); // Default to University of Nigeria coordinates

// Add tile layer (using OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  className: 'dark-map'
}).addTo(map);

// Sample shuttle data (in a real app, this would come from an API)
const shuttles = [
  {
    id: 1,
    name: "Shuttle A",
    route: "Main Campus ↔ Hostel Area",
    position: [6.8950, 7.8580],
    status: "moving",
    capacity: "12/20",
    eta: "5 min"
  },
  {
    id: 2,
    name: "Shuttle B",
    route: "Science Park ↔ Library",
    position: [6.8920, 7.8560],
    status: "stopped",
    capacity: "8/20",
    eta: "12 min"
  },
  {
    id: 3,
    name: "Shuttle C",
    route: "Medical ↔ Engineering",
    position: [6.8940, 7.8540],
    status: "moving",
    capacity: "18/20",
    eta: "3 min"
  }
];

// Store shuttle markers
const shuttleMarkers = {};

// Function to create shuttle marker
function createShuttleMarker(shuttle) {
  const icon = L.divIcon({
    className: 'shuttle-marker',
    html: `<div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                <i data-feather="truck" class="text-white text-xs"></i>
              </div>
              <div class="mt-1 text-xs font-semibold bg-black bg-opacity-70 px-1 rounded">${shuttle.name}</div>
            </div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40]
  });
  
  return L.marker(shuttle.position, { icon: icon });
}

// Function to update shuttle positions
function updateShuttlePositions() {
  shuttles.forEach(shuttle => {
    if (shuttleMarkers[shuttle.id]) {
      shuttleMarkers[shuttle.id].setLatLng(shuttle.position);
    } else {
      const marker = createShuttleMarker(shuttle);
      marker.addTo(map);
      shuttleMarkers[shuttle.id] = marker;
      
      // Add popup
      marker.bindPopup(`
        <div class="font-semibold">${shuttle.name}</div>
        <div class="text-sm">${shuttle.route}</div>
        <div class="flex items-center mt-1">
          <span class="status-indicator ${shuttle.status === 'moving' ? 'status-moving' : 'status-stopped'}"></span>
          <span>${shuttle.status === 'moving' ? 'Moving' : 'Stopped'}</span>
        </div>
        <div class="text-sm mt-1">Capacity: ${shuttle.capacity}</div>
      `);
    }
  });
  
  // Refresh feather icons
  feather.replace();
}

// Function to populate shuttle list
function populateShuttleList() {
  const shuttleList = document.getElementById('shuttle-list');
  shuttleList.innerHTML = '';
  
  shuttles.forEach(shuttle => {
    const shuttleEl = document.createElement('div');
    shuttleEl.className = 'shuttle-card bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600';
    shuttleEl.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-bold">${shuttle.name}</h3>
          <p class="text-sm text-gray-300">${shuttle.route}</p>
        </div>
        <span class="status-indicator ${shuttle.status === 'moving' ? 'status-moving' : 'status-stopped'}"></span>
      </div>
      <div class="flex justify-between mt-3 text-sm">
        <span>Capacity: ${shuttle.capacity}</span>
        <span class="${shuttle.status === 'moving' ? 'text-green-400' : 'text-red-400'}">
          ${shuttle.status === 'moving' ? 'Moving' : 'Stopped'}
        </span>
      </div>
    `;
    
    shuttleEl.addEventListener('click', () => {
      map.setView(shuttle.position, 16);
      shuttleMarkers[shuttle.id].openPopup();
    });
    
    shuttleList.appendChild(shuttleEl);
  });
}

// Function to populate arrival list
function populateArrivalList() {
  const arrivalList = document.getElementById('arrival-list');
  arrivalList.innerHTML = '';
  
  shuttles
    .filter(shuttle => shuttle.status === 'moving')
    .sort((a, b) => parseInt(a.eta) - parseInt(b.eta))
    .forEach(shuttle => {
      const arrivalEl = document.createElement('div');
      arrivalEl.className = 'arrival-item py-2 border-b border-gray-700 last:border-0';
      arrivalEl.innerHTML = `
        <div class="flex justify-between">
          <span class="font-medium">${shuttle.name}</span>
          <span class="text-blue-400">${shuttle.eta}</span>
        </div>
        <div class="text-sm text-gray-400">${shuttle.route.split('↔')[0]}</div>
      `;
      arrivalList.appendChild(arrivalEl);
    });
}

// Initial population
document.addEventListener('DOMContentLoaded', () => {
  updateShuttlePositions();
  populateShuttleList();
  populateArrivalList();
  
  // Update positions every 10 seconds (simulating real-time updates)
  setInterval(() => {
    // In a real app, fetch new positions from API
    // For demo, we'll slightly move the shuttles
    shuttles.forEach(shuttle => {
      if (shuttle.status === 'moving') {
        shuttle.position[0] += (Math.random() - 0.5) * 0.001;
        shuttle.position[1] += (Math.random() - 0.5) * 0.001;
      }
    });
    
    updateShuttlePositions();
    populateArrivalList();
  }, 10000);
});