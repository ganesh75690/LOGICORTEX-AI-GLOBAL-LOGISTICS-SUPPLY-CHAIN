import { useState, useRef } from 'react';
import { Navigation, AlertTriangle, TrendingUp, Package, Truck, Warehouse, ExternalLink } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SupplierWarehouse {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  totalStock: number;
  capacity: number;
  utilizationRate: number;
  type: 'primary' | 'secondary' | 'distribution';
}

interface SupplierRoute {
  id: string;
  from: string;
  to: string;
  fromWarehouse: string;
  toWarehouse: string;
  status: 'active' | 'delayed' | 'completed' | 'pending';
  risk: 'low' | 'medium' | 'high';
  eta: string;
  progress: number;
  fromCoords: { lat: number; lng: number };
  toCoords: { lat: number; lng: number };
  productType: string;
  quantity: number;
}

interface RiskZone {
  id: string;
  location: string;
  type: 'weather' | 'traffic' | 'shortage';
  severity: 'low' | 'medium' | 'high';
  lat: number;
  lng: number;
  description: string;
}

// Supplier's warehouses (only their locations)
const supplierWarehouses: SupplierWarehouse[] = [
  {
    id: 'WH001',
    name: 'North Warehouse',
    location: 'Chicago, IL',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    totalStock: 7500,
    capacity: 10000,
    utilizationRate: 75,
    type: 'primary'
  },
  {
    id: 'WH002',
    name: 'South Warehouse',
    location: 'Austin, TX',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    totalStock: 6200,
    capacity: 8000,
    utilizationRate: 77.5,
    type: 'secondary'
  },
  {
    id: 'WH003',
    name: 'West Warehouse',
    location: 'Los Angeles, CA',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    totalStock: 9800,
    capacity: 12000,
    utilizationRate: 81.7,
    type: 'distribution'
  },
  {
    id: 'WH004',
    name: 'East Warehouse',
    location: 'New York, NY',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    totalStock: 5400,
    capacity: 9000,
    utilizationRate: 60,
    type: 'secondary'
  }
];

// Supplier's active routes (only their shipments)
const supplierRoutes: SupplierRoute[] = [
  {
    id: 'SR001',
    from: 'WH001',
    to: 'WH002',
    fromWarehouse: 'North Warehouse',
    toWarehouse: 'South Warehouse',
    status: 'active',
    risk: 'low',
    eta: '2h 15m',
    progress: 65,
    fromCoords: { lat: 41.8781, lng: -87.6298 },
    toCoords: { lat: 30.2672, lng: -97.7431 },
    productType: 'Electronics',
    quantity: 500
  },
  {
    id: 'SR002',
    from: 'WH003',
    to: 'WH004',
    fromWarehouse: 'West Warehouse',
    toWarehouse: 'East Warehouse',
    status: 'delayed',
    risk: 'high',
    eta: '3h 45m',
    progress: 40,
    fromCoords: { lat: 34.0522, lng: -118.2437 },
    toCoords: { lat: 40.7128, lng: -74.0060 },
    productType: 'Circuit Boards',
    quantity: 1200
  },
  {
    id: 'SR003',
    from: 'WH002',
    to: 'WH001',
    fromWarehouse: 'South Warehouse',
    toWarehouse: 'North Warehouse',
    status: 'completed',
    risk: 'low',
    eta: 'Delivered',
    progress: 100,
    fromCoords: { lat: 30.2672, lng: -97.7431 },
    toCoords: { lat: 41.8781, lng: -87.6298 },
    productType: 'LED Bulbs',
    quantity: 800
  }
];

// Risk zones affecting supplier's routes
const supplierRiskZones: RiskZone[] = [
  {
    id: 'RZ001',
    location: 'I-80 Corridor',
    type: 'traffic',
    severity: 'high',
    lat: 41.5,
    lng: -88.0,
    description: 'Heavy traffic causing delays'
  },
  {
    id: 'RZ002',
    location: 'Austin Area',
    type: 'weather',
    severity: 'medium',
    lat: 30.2672,
    lng: -97.7431,
    description: 'Storm warnings affecting shipments'
  }
];

export function SupplierMap() {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [showRiskHeatmap, setShowRiskHeatmap] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const mapRef = useRef<any>(null);

  const getRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'rgb(34, 197, 94)';
      case 'medium': return 'rgb(234, 179, 8)';
      case 'high': return 'rgb(239, 68, 68)';
    }
  };

  const getStatusColor = (status: SupplierRoute['status']) => {
    switch (status) {
      case 'active': return 'text-blue-500';
      case 'delayed': return 'text-red-500';
      case 'completed': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
    }
  };

  const getWarehouseTypeColor = (type: SupplierWarehouse['type']) => {
    switch (type) {
      case 'primary': return '#00F5C4';
      case 'secondary': return '#f59e0b';
      case 'distribution': return '#3b82f6';
    }
  };

  const handleRouteClick = (routeId: string) => {
    setActiveRoute(routeId);
    const route = supplierRoutes.find(r => r.id === routeId);
    if (route && mapRef.current) {
      const centerLat = (route.fromCoords.lat + route.toCoords.lat) / 2;
      const centerLng = (route.fromCoords.lng + route.toCoords.lng) / 2;
      
      mapRef.current.flyTo([centerLat, centerLng], 6, {
        duration: 1.5
      });
    }
  };

  const handleWarehouseClick = (warehouseId: string) => {
    setSelectedWarehouse(warehouseId);
    const warehouse = supplierWarehouses.find(wh => wh.id === warehouseId);
    if (warehouse && mapRef.current) {
      mapRef.current.flyTo([warehouse.coordinates.lat, warehouse.coordinates.lng], 8, {
        duration: 1.5
      });
    }
  };

  const openGoogleMaps = (warehouse: SupplierWarehouse) => {
    const { lat, lng } = warehouse.coordinates;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  // Filter warehouses based on selection
  const filteredWarehouses = selectedWarehouse === 'all' 
    ? supplierWarehouses 
    : supplierWarehouses.filter(wh => wh.id === selectedWarehouse);

  // Filter routes based on selected warehouse
  const filteredRoutes = selectedWarehouse === 'all'
    ? supplierRoutes
    : supplierRoutes.filter(route => route.from === selectedWarehouse || route.to === selectedWarehouse);

  // Calculate center point for map (center of supplier's warehouses)
  const centerLat = supplierWarehouses.reduce((sum, wh) => sum + wh.coordinates.lat, 0) / supplierWarehouses.length;
  const centerLng = supplierWarehouses.reduce((sum, wh) => sum + wh.coordinates.lng, 0) / supplierWarehouses.length;

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden flex flex-col">
      {/* Scrollable Map Container */}
      <div className="flex-1 relative overflow-hidden">
        <MapContainer
          ref={mapRef}
          center={[centerLat, centerLng]}
          zoom={4}
          style={{ height: '600px', width: '100%' }}
          className="z-0"
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Supplier Warehouse Markers */}
        {filteredWarehouses.map((warehouse) => (
          <Marker 
            key={warehouse.id} 
            position={warehouse.coordinates}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background: ${getWarehouseTypeColor(warehouse.type)}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            })}
          >
            <Popup>
              <div className="text-sm p-2">
                <div className="font-semibold text-gray-800 mb-2">{warehouse.name}</div>
                <div className="text-gray-600 mb-1">{warehouse.location}</div>
                <div className="text-gray-600 mb-1 capitalize">Type: {warehouse.type}</div>
                <div className="text-gray-600 mb-1">Stock: {warehouse.totalStock.toLocaleString()} / {warehouse.capacity.toLocaleString()}</div>
                <div className="text-gray-600">Utilization: {warehouse.utilizationRate}%</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Supplier Route Polylines */}
        {filteredRoutes.map((route) => (
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
        {showRiskHeatmap && supplierRiskZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={80000} // 80km radius
            fillColor={getRiskColor(zone.severity)}
            fillOpacity={0.2}
            color={getRiskColor(zone.severity)}
            weight={2}
            opacity={0.4}
          />
        ))}

        {/* Moving Vehicle Markers */}
        {filteredRoutes.map((route) => {
          if (route.status === 'completed') return null;
          
          const progress = route.progress / 100;
          const currentLat = route.fromCoords.lat + (route.toCoords.lat - route.fromCoords.lat) * progress;
          const currentLng = route.fromCoords.lng + (route.toCoords.lng - route.fromCoords.lng) * progress;
          
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
                <div className="text-sm p-2">
                  <div className="font-semibold text-gray-800 mb-1">Shipment {route.id}</div>
                  <div className="text-gray-600 mb-1">{route.fromWarehouse} → {route.toWarehouse}</div>
                  <div className="text-gray-600 mb-1">Product: {route.productType}</div>
                  <div className="text-gray-600 mb-1">Quantity: {route.quantity.toLocaleString()}</div>
                  <div className="text-gray-600 mb-1">Status: <span className={getStatusColor(route.status)}>{route.status}</span></div>
                  <div className="text-gray-600 mb-1">ETA: {route.eta}</div>
                  <div className="text-gray-600">Progress: {route.progress}%</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        </MapContainer>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 p-3">
          <div className="text-xs text-slate-400 mb-2 font-medium">Select Warehouse</div>
          <select
            value={selectedWarehouse}
            onChange={(e) => handleWarehouseClick(e.target.value)}
            className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent"
            aria-label="Select warehouse to view on map"
            title="Select warehouse to view on map"
          >
            <option value="all">All Warehouses</option>
            {supplierWarehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button className="p-3 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 text-white hover:bg-slate-700/90 transition-colors" title="Analytics">
          <TrendingUp className="w-4 h-4" />
        </button>
        <button className="p-3 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 text-white hover:bg-slate-700/90 transition-colors" title="Navigation">
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Detailed Information Section */}
      <div className="bg-slate-800/95 backdrop-blur-md border-t border-slate-700/50 p-6 overflow-y-auto max-h-[400px]">
        {/* Supplier Operations Overview */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-[#00F5C4]" />
            <h3 className="text-sm font-semibold text-white">Your Warehouse Operations</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {supplierWarehouses.map((warehouse) => (
              <div key={warehouse.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <div className="text-sm font-semibold text-white mb-2">{warehouse.name.split(' ')[0]}</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stock:</span>
                    <span className="text-blue-400 font-medium">{warehouse.totalStock.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capacity:</span>
                    <span className="text-purple-400 font-medium">{warehouse.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Usage:</span>
                    <span className={`${warehouse.utilizationRate >= 80 ? 'text-red-400' : 'text-green-400'} font-medium`}>
                      {warehouse.utilizationRate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Active Shipments Section */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Your Active Shipments</h3>
              <button
                onClick={() => setShowRiskHeatmap(!showRiskHeatmap)}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showRiskHeatmap ? 'Hide' : 'Show'} Risk Zones
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {filteredRoutes.map((route) => (
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
                    {route.fromWarehouse} → {route.toWarehouse}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{route.productType} ({route.quantity})</span>
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
              <h3 className="text-sm font-semibold text-white">Risk Zones Affecting Your Routes</h3>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {supplierRiskZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/40">
                  <div>
                    <div className="text-xs text-slate-300">{zone.location}</div>
                    <div className="text-xs text-slate-500">{zone.description}</div>
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

        {/* Detailed Warehouse Information */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#00F5C4]" />
            Detailed Warehouse Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWarehouses.map((warehouse) => (
              <div key={warehouse.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold">{warehouse.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      warehouse.type === 'primary' ? 'bg-[#00F5C4]/20 text-[#00F5C4]' :
                      warehouse.type === 'secondary' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {warehouse.type.toUpperCase()}
                    </span>
                    <button
                      onClick={() => openGoogleMaps(warehouse)}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/30 transition-colors flex items-center gap-1"
                      title="View in Google Maps"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View in Maps
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Location:</span>
                    <span className="text-white text-sm">{warehouse.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Coordinates:</span>
                    <span className="text-white text-sm">{warehouse.coordinates.lat.toFixed(4)}, {warehouse.coordinates.lng.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Current Stock:</span>
                    <span className="text-blue-400 font-medium">{warehouse.totalStock.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Total Capacity:</span>
                    <span className="text-purple-400 font-medium">{warehouse.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Utilization Rate:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            warehouse.utilizationRate >= 80 ? 'bg-red-500' :
                            warehouse.utilizationRate >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${warehouse.utilizationRate}%` }}
                        />
                      </div>
                      <span className={`font-medium ${
                        warehouse.utilizationRate >= 80 ? 'text-red-400' :
                        warehouse.utilizationRate >= 60 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {warehouse.utilizationRate}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Available Space:</span>
                    <span className="text-green-400 font-medium">
                      {(warehouse.capacity - warehouse.totalStock).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Shipments Information */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-400" />
            Detailed Shipment Information
          </h3>
          <div className="space-y-3">
            {filteredRoutes.map((route) => (
              <div key={route.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      route.status === 'active' ? 'bg-blue-500' :
                      route.status === 'delayed' ? 'bg-red-500' :
                      route.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <h4 className="text-white font-semibold">Shipment {route.id}</h4>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      route.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                      route.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {route.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${getStatusColor(route.status)}`}>
                    {route.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-slate-400 text-xs">From:</span>
                    <div className="text-white text-sm font-medium">{route.fromWarehouse}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">To:</span>
                    <div className="text-white text-sm font-medium">{route.toWarehouse}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Product:</span>
                    <div className="text-white text-sm font-medium">{route.productType}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Quantity:</span>
                    <div className="text-white text-sm font-medium">{route.quantity.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">ETA:</span>
                    <div className="text-white text-sm font-medium">{route.eta}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Progress:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${route.progress}%` }}
                        />
                      </div>
                      <span className="text-white text-sm font-medium">{route.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Route Distance:</span>
                    <div className="text-white text-sm font-medium">~{Math.floor(Math.random() * 500 + 200)} km</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Estimated Cost:</span>
                    <div className="text-green-400 text-sm font-medium">${(Math.random() * 5000 + 1000).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
