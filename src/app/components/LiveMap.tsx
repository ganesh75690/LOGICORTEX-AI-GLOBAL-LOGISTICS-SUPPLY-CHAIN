import { useState, useRef } from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Route {
  id: string;
  from: string;
  to: string;
  status: 'active' | 'delayed' | 'optimized';
  risk: 'low' | 'medium' | 'high';
  eta: string;
  progress: number;
  fromCoords: [number, number];
  toCoords: [number, number];
}

interface RiskZone {
  id: string;
  location: string;
  type: 'weather' | 'traffic' | 'shortage';
  severity: 'low' | 'medium' | 'high';
  lat: number;
  lng: number;
}

interface City {
  name: string;
  coords: [number, number];
  type: 'warehouse' | 'hub' | 'port' | 'terminal';
}

const indianCities: City[] = [
  { name: 'Mumbai', coords: [19.0760, 73.8771], type: 'hub' },
  { name: 'Delhi', coords: [28.6139, 77.2090], type: 'hub' },
  { name: 'Bangalore', coords: [12.9716, 77.5946], type: 'hub' },
  { name: 'Chennai', coords: [13.0827, 80.2707], type: 'port' },
  { name: 'Kolkata', coords: [22.5726, 88.3639], type: 'terminal' },
  { name: 'Hyderabad', coords: [17.3850, 78.4867], type: 'hub' },
  { name: 'Pune', coords: [18.5204, 73.8567], type: 'warehouse' },
  { name: 'Jaipur', coords: [26.9124, 75.7873], type: 'warehouse' },
];

const mockRoutes: Route[] = [
  { 
    id: 'R001', 
    from: 'Mumbai Warehouse', 
    to: 'Pune Hub', 
    status: 'active', 
    risk: 'low', 
    eta: '2h 15m', 
    progress: 65,
    fromCoords: [19.0760, 73.8771],
    toCoords: [18.5204, 73.8567]
  },
  { 
    id: 'R002', 
    from: 'Delhi Center', 
    to: 'Jaipur Client', 
    status: 'delayed', 
    risk: 'high', 
    eta: '3h 45m', 
    progress: 40,
    fromCoords: [28.6139, 77.2090],
    toCoords: [26.9124, 75.7873]
  },
  { 
    id: 'R003', 
    from: 'Chennai Port', 
    to: 'Bangalore DC', 
    status: 'optimized', 
    risk: 'low', 
    eta: '1h 30m', 
    progress: 85,
    fromCoords: [13.0827, 80.2707],
    toCoords: [12.9716, 77.5946]
  },
  { 
    id: 'R004', 
    from: 'Kolkata Terminal', 
    to: 'Hyderabad Zone', 
    status: 'active', 
    risk: 'medium', 
    eta: '4h 20m', 
    progress: 25,
    fromCoords: [22.5726, 88.3639],
    toCoords: [17.3850, 78.4867]
  },
];

const mockRiskZones: RiskZone[] = [
  { id: 'Z001', location: 'Mumbai-Pune Expressway', type: 'traffic', severity: 'high', lat: 18.7960, lng: 73.8669 },
  { id: 'Z002', location: 'Delhi NCR Region', type: 'weather', severity: 'medium', lat: 28.6139, lng: 77.2090 },
  { id: 'Z003', location: 'Bangalore Industrial Area', type: 'shortage', severity: 'low', lat: 12.9716, lng: 77.5946 },
];

export function LiveMap() {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [showRiskHeatmap, setShowRiskHeatmap] = useState(true);
  const mapRef = useRef<any>(null);

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'rgb(34, 197, 94)';
      case 'medium': return 'rgb(234, 179, 8)';
      case 'high': return 'rgb(239, 68, 68)';
    }
  };

  const getStatusColor = (status: Route['status']) => {
    switch (status) {
      case 'active': return 'text-blue-500';
      case 'delayed': return 'text-red-500';
      case 'optimized': return 'text-green-500';
    }
  };

  const handleRouteClick = (routeId: string) => {
    setActiveRoute(routeId);
    const route = mockRoutes.find(r => r.id === routeId);
    if (route && mapRef.current) {
      // Calculate the center point of the route
      const centerLat = (route.fromCoords[0] + route.toCoords[0]) / 2;
      const centerLng = (route.fromCoords[1] + route.toCoords[1]) / 2;
      
      // Fly to the route location with appropriate zoom
      mapRef.current.flyTo([centerLat, centerLng], 7, {
        duration: 1.5
      });
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">
      {/* React Leaflet Map */}
      <MapContainer
        ref={mapRef}
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Indian City Markers */}
        {indianCities.map((city) => (
          <Marker key={city.name} position={city.coords}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold text-gray-800">{city.name}</div>
                <div className="text-gray-600 capitalize">{city.type}</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route Polylines */}
        {mockRoutes.map((route) => (
          <Polyline
            key={route.id}
            positions={[route.fromCoords, route.toCoords]}
            color={getRiskColor(route.risk)}
            weight={activeRoute === route.id ? 6 : 3}
            opacity={activeRoute === route.id ? 1 : 0.8}
            dashArray={route.status === 'delayed' ? '10, 10' : undefined}
          />
        ))}

        {/* Risk Zone Circles */}
        {showRiskHeatmap && mockRiskZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={50000} // 50km radius
            fillColor={getRiskColor(zone.severity)}
            fillOpacity={0.2}
            color={getRiskColor(zone.severity)}
            weight={2}
            opacity={0.4}
          />
        ))}

        {/* Moving Vehicle Markers */}
        {mockRoutes.map((route) => {
          const progress = route.progress / 100;
          const currentLat = route.fromCoords[0] + (route.toCoords[0] - route.fromCoords[0]) * progress;
          const currentLng = route.fromCoords[1] + (route.toCoords[1] - route.fromCoords[1]) * progress;
          
          return (
            <Marker
              key={`vehicle-${route.id}`}
              position={[currentLat, currentLng]}
              icon={L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background: ${getRiskColor(route.risk)}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6]
              })}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">{route.id}</div>
                  <div className="text-gray-600">{route.from} → {route.to}</div>
                  <div className="text-gray-600">Status: {route.status}</div>
                  <div className="text-gray-600">ETA: {route.eta}</div>
                  <div className="text-gray-600">Progress: {route.progress}%</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button className="p-3 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 text-white hover:bg-slate-700/90 transition-colors" title="Analytics">
          <TrendingUp className="w-4 h-4" />
        </button>
      </div>

      {/* Below Map Sections */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Active Routes Section */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Active Routes</h3>
              <button
                onClick={() => setShowRiskHeatmap(!showRiskHeatmap)}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showRiskHeatmap ? 'Hide' : 'Show'} Risk Zones
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {mockRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => handleRouteClick(route.id)}
                  className={`w-full text-left p-2 rounded-lg transition-all ${
                    activeRoute === route.id ? 'bg-slate-700/70 ring-2 ring-blue-500' : 'bg-slate-900/40 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">{route.id}</span>
                    <span className={`text-xs ${getStatusColor(route.status)}`}>
                      {route.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mb-2">
                    {route.from} → {route.to}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">ETA: {route.eta}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${route.progress}%` }}
                        />
                      </div>
                      <span className="text-slate-400">{route.progress}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Risk Zones Section */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="text-sm font-semibold text-white">Risk Zones</h3>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {mockRiskZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40">
                  <div>
                    <div className="text-xs text-slate-300">{zone.location}</div>
                    <div className="text-xs text-slate-500 capitalize">{zone.type}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    zone.severity === 'high' ? 'bg-red-500' :
                    zone.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
