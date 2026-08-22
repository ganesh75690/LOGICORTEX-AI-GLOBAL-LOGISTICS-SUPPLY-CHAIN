import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LiveMap } from './LiveMap';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
import { 
  Truck, 
  MapPin, 
  Gauge, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Clock, 
  Fuel, 
  Shield, 
  FileText, 
  Settings, 
  Navigation, 
  User, 
  BarChart3,
  ArrowLeft,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle,
  Wrench,
  Battery,
  Droplet,
  FileCheck,
  Brain,
  Thermometer,
  Phone,
  Star,
  Package,
  Search,
  MessageSquare,
  Map,
  Play,
  Pause,
  RefreshCw,
  Download,
  Upload,
  Plus,
  Bell,
  Filter,
  Grid,
  List
} from 'lucide-react';

interface VehicleDetail {
  id: string;
  registrationNumber: string;
  vehicleType: 'truck' | 'van' | 'bike';
  brand: string;
  model: string;
  capacity: {
    weight: number; // kg
    volume: number; // cubic meters
  };
  fuelType: 'diesel' | 'electric' | 'cng';
  status: 'active' | 'inactive' | 'maintenance';
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  assignedDriver: {
    id: string;
    name: string;
    phone: string;
    licenseNumber: string;
  };
  assignedRoute: string;
  currentSpeed: number; // km/h
  impactScore?: number; // percentage
  efficiency?: string; // grade rating
  performance: {
    totalTrips: number;
    totalDistance: number; // km
    fuelEfficiency: number; // km/litre
    averageDeliveryTime: number; // minutes
    onTimeDeliveryRate: number; // percentage
  };
  maintenance: {
    lastServiceDate: string;
    nextServiceDue: string;
    insuranceExpiry: string;
    pollutionCertificateExpiry: string;
    breakdownHistory: Array<{
      date: string;
      issue: string;
      cost: number;
      daysDowntime: number;
    }>;
  };
  aiInsights: {
    predictedMaintenanceAlert: boolean;
    fuelConsumptionAnomaly: boolean;
    riskScore: number; // 0-100
    recommendations: string[];
  };
}

// Driver-specific live map component
function DriverLiveMap({ driver }: { driver: any }) {
  const mapRef = useRef<any>(null);

  // Parse route coordinates (simplified for demo)
  const getRouteCoordinates = (route: string) => {
    // This would normally come from your backend API
    const routeCoords: { [key: string]: { from: [number, number]; to: [number, number] } } = {
      'Mumbai → Delhi': { from: [19.0760, 73.8771], to: [28.6139, 77.2090] },
      'Chennai → Bangalore': { from: [13.0827, 80.2707], to: [12.9716, 77.5946] },
      'Kolkata → Hyderabad': { from: [22.5726, 88.3639], to: [17.3850, 78.4867] },
      'Pune → Mumbai': { from: [18.5204, 73.8567], to: [19.0760, 73.8771] },
      'Jaipur → Delhi': { from: [26.9124, 75.7873], to: [28.6139, 77.2090] },
      'Ahmedabad → Surat': { from: [23.0225, 72.5714], to: [21.1702, 72.8311] },
      'Coimbatore → Chennai': { from: [10.9674, 76.9655], to: [13.0827, 80.2707] },
      'Nagpur → Pune': { from: [21.1458, 79.0882], to: [18.5204, 73.8567] },
      'Visakhapatnam → Vijayawada': { from: [17.6868, 83.2185], to: [16.5062, 80.6480] },
      'Local - Delhi': { from: [28.6139, 77.2090], to: [28.7041, 77.1025] }
    };
    
    return routeCoords[route] || { from: [28.6139, 77.2090], to: [28.7041, 77.1025] };
  };

  const route = getRouteCoordinates(driver.route);
  const progress = driver.status === 'Active' ? 0.6 : driver.status === 'Loading' ? 0.2 : 0.8;
  
  // Calculate current position based on progress
  const currentLat = route.from[0] + (route.to[0] - route.from[0]) * progress;
  const currentLng = route.from[1] + (route.to[1] - route.from[1]) * progress;

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([currentLat, currentLng], 8, {
        duration: 1.5
      });
    }
  }, [currentLat, currentLng]);

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">
      <MapContainer
        ref={mapRef}
        center={[currentLat, currentLng]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Route Line */}
        <Polyline
          positions={[route.from, route.to]}
          color={driver.status === 'Active' ? 'rgb(34, 197, 94)' : 
                 driver.status === 'Delayed' ? 'rgb(239, 68, 68)' : 
                 'rgb(59, 130, 246)'}
          weight={4}
          opacity={0.8}
          dashArray={driver.status === 'Delayed' ? '10, 10' : undefined}
        />

        {/* Start Point */}
        <Marker
          position={route.from}
          icon={L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })}
        >
          <Popup>
            <div className="text-sm p-2">
              <div className="font-semibold text-gray-800">Start Point</div>
              <div className="text-gray-600">Route Origin</div>
            </div>
          </Popup>
        </Marker>

        {/* End Point */}
        <Marker
          position={route.to}
          icon={L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })}
        >
          <Popup>
            <div className="text-sm p-2">
              <div className="font-semibold text-gray-800">Destination</div>
              <div className="text-gray-600">Route End</div>
            </div>
          </Popup>
        </Marker>

        {/* Current Vehicle Position */}
        <Marker
          position={[currentLat, currentLng]}
          icon={L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background: #8b5cf6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); animation: pulse 2s infinite;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })}
        >
          <Popup>
            <div className="text-sm p-3">
              <div className="font-semibold text-gray-800 mb-2">{driver.name}</div>
              <div className="text-gray-600 mb-1">Vehicle: {driver.vehicle}</div>
              <div className="text-gray-600 mb-1">Route: {driver.route}</div>
              <div className="text-gray-600 mb-1">Status: <span className={
                driver.status === 'Active' ? 'text-green-500' :
                driver.status === 'Delayed' ? 'text-red-500' :
                'text-blue-500'
              }>{driver.status}</span></div>
              <div className="text-gray-600 mb-1">ETA: {driver.eta}</div>
              <div className="text-gray-600 mb-1">Current Location: {driver.currentLocation}</div>
              <div className="text-gray-600 mb-1">Fuel: {driver.fuelLevel}</div>
              <div className="text-gray-600">Speed: {Math.floor(Math.random() * 40 + 40)} km/h</div>
            </div>
          </Popup>
        </Marker>

        {/* Driver Info Badge */}
        <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 p-3 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold">{driver.name}</div>
              <div className="text-slate-400 text-sm">{driver.vehicle}</div>
            </div>
          </div>
        </div>

        {/* Route Info Badge */}
        <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700/50 p-3 z-10">
          <div className="text-white text-sm">
            <div className="font-semibold mb-1">{driver.route}</div>
            <div className="text-slate-400 text-xs">ETA: {driver.eta}</div>
            <div className="text-slate-400 text-xs">Status: {driver.status}</div>
          </div>
        </div>
      </MapContainer>
    </div>
  );
}

export function VehicleDetailPage({ vehicle, onBack }: { vehicle: VehicleDetail; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'maintenance' | 'ai-insights'>('overview');
  const [showMaintenanceAlert, setShowMaintenanceAlert] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>('all');
  const [showAddDriverForm, setShowAddDriverForm] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [formData, setFormData] = useState({
    // Section 1 - Personal Info
    fullName: '',
    profilePhoto: null,
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    alternatePhone: '',
    email: '',
    bloodGroup: '',
    address: '',
    
    // Section 2 - License & Documents
    licenseNumber: '',
    licenseType: '',
    licenseExpiry: '',
    licensePhoto: null,
    aadharNumber: '',
    aadharPhoto: null,
    policeVerification: null,
    medicalCertificate: null,
    
    // Section 3 - Assignment Details
    assignedVehicle: '',
    assignedZone: '',
    assignedWarehouse: '',
    shiftTiming: '',
    employmentType: '',
    joiningDate: '',
    
    // Section 4 - Login Credentials
    phoneBasedLogin: true,
    temporaryPassword: '',
    sendCredentialsSMS: true,
    
    // Section 5 - Emergency Contact
    emergencyContactName: '',
    emergencyRelationship: '',
    emergencyPhone: ''
  });

  // Driver data
  const driversData = [
    {
      id: 1,
      name: 'John Smith',
      vehicle: 'Truck-TR001',
      vehicleType: 'truck',
      stockType: 'Electronics',
      quantity: '450 units',
      route: 'Mumbai → Delhi',
      status: 'Active',
      eta: '2h 30m',
      currentLocation: 'Near Nashik, Maharashtra',
      fuelLevel: '75%',
      temperature: '22°C',
      lastUpdate: '5 mins ago',
      contact: '+91-98765-43210',
      license: 'DL-01-2021-000123',
      experience: '5 years',
      tripsToday: 3,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      vehicle: 'Van-VN002',
      vehicleType: 'van',
      stockType: 'Medical Supplies',
      quantity: '280 units',
      route: 'Chennai → Bangalore',
      status: 'Active',
      eta: '4h 15m',
      currentLocation: 'Vellore, Tamil Nadu',
      fuelLevel: '60%',
      temperature: '18°C',
      lastUpdate: '12 mins ago',
      contact: '+91-87654-32109',
      license: 'DL-02-2019-000456',
      experience: '7 years',
      tripsToday: 2,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Mike Wilson',
      vehicle: 'Truck-TR003',
      vehicleType: 'truck',
      stockType: 'Food Products',
      quantity: '1,200 kg',
      route: 'Kolkata → Hyderabad',
      status: 'Loading',
      eta: '6h 00m',
      currentLocation: 'Kolkata Warehouse',
      fuelLevel: '90%',
      temperature: '25°C',
      lastUpdate: '2 mins ago',
      contact: '+91-76543-21098',
      license: 'DL-03-2020-000789',
      experience: '3 years',
      tripsToday: 1,
      rating: 4.6
    },
    {
      id: 4,
      name: 'Emily Davis',
      vehicle: 'Bike-BK004',
      vehicleType: 'bike',
      stockType: 'Documents',
      quantity: '45 packages',
      route: 'Pune → Mumbai',
      status: 'Active',
      eta: '1h 45m',
      currentLocation: 'Lonavala, Maharashtra',
      fuelLevel: '85%',
      temperature: '28°C',
      lastUpdate: '8 mins ago',
      contact: '+91-65432-10987',
      license: 'DL-04-2022-000012',
      experience: '2 years',
      tripsToday: 8,
      rating: 4.7
    },
    {
      id: 5,
      name: 'Robert Brown',
      vehicle: 'Truck-TR005',
      vehicleType: 'truck',
      stockType: 'Textiles',
      quantity: '800 units',
      route: 'Jaipur → Delhi',
      status: 'Active',
      eta: '3h 20m',
      currentLocation: 'Near Gurgaon, Haryana',
      fuelLevel: '45%',
      temperature: '30°C',
      lastUpdate: '3 mins ago',
      contact: '+91-54321-09876',
      license: 'DL-05-2018-000345',
      experience: '8 years',
      tripsToday: 4,
      rating: 4.9
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      vehicle: 'Van-VN006',
      vehicleType: 'van',
      stockType: 'Pharmaceuticals',
      quantity: '350 units',
      route: 'Ahmedabad → Surat',
      status: 'Delayed',
      eta: '5h 30m',
      currentLocation: 'Vadodara, Gujarat',
      fuelLevel: '30%',
      temperature: '20°C',
      lastUpdate: '25 mins ago',
      contact: '+91-43210-98765',
      license: 'DL-06-2017-000678',
      experience: '6 years',
      tripsToday: 2,
      rating: 4.5
    },
    {
      id: 7,
      name: 'David Martinez',
      vehicle: 'Truck-TR007',
      vehicleType: 'truck',
      stockType: 'Construction Materials',
      quantity: '2,500 kg',
      route: 'Coimbatore → Chennai',
      status: 'Active',
      eta: '7h 15m',
      currentLocation: 'Salem, Tamil Nadu',
      fuelLevel: '80%',
      temperature: '32°C',
      lastUpdate: '15 mins ago',
      contact: '+91-32109-87654',
      license: 'DL-07-2016-000901',
      experience: '10 years',
      tripsToday: 1,
      rating: 4.8
    },
    {
      id: 8,
      name: 'Jennifer Taylor',
      vehicle: 'Bike-BK008',
      vehicleType: 'bike',
      stockType: 'Food Delivery',
      quantity: '120 orders',
      route: 'Local - Delhi',
      status: 'Active',
      eta: '45m',
      currentLocation: 'Connaught Place, Delhi',
      fuelLevel: '95%',
      temperature: '35°C',
      lastUpdate: '1 min ago',
      contact: '+91-21098-76543',
      license: 'DL-08-2023-000234',
      experience: '1 year',
      tripsToday: 15,
      rating: 4.4
    },
    {
      id: 9,
      name: 'James Thomas',
      vehicle: 'Van-VN009',
      vehicleType: 'van',
      stockType: 'Automobile Parts',
      quantity: '550 units',
      route: 'Nagpur → Pune',
      status: 'Maintenance',
      eta: '-',
      currentLocation: 'Service Center, Nagpur',
      fuelLevel: '50%',
      temperature: '26°C',
      lastUpdate: '2 hours ago',
      contact: '+91-10987-65432',
      license: 'DL-09-2015-000567',
      experience: '12 years',
      tripsToday: 0,
      rating: 4.7
    },
    {
      id: 10,
      name: 'Maria Garcia',
      vehicle: 'Truck-TR010',
      vehicleType: 'truck',
      stockType: 'Chemicals',
      quantity: '900 liters',
      route: 'Visakhapatnam → Vijayawada',
      status: 'Active',
      eta: '8h 45m',
      currentLocation: 'Rajahmundry, Andhra Pradesh',
      fuelLevel: '70%',
      temperature: '29°C',
      lastUpdate: '10 mins ago',
      contact: '+91-09876-54321',
      license: 'DL-10-2014-000890',
      experience: '9 years',
      tripsToday: 2,
      rating: 4.9
    }
  ];

  useEffect(() => {
    // Show maintenance alert if due soon
    const nextServiceDate = new Date(vehicle.maintenance.nextServiceDue);
    const today = new Date();
    const daysUntilService = Math.ceil((nextServiceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilService <= 7 && daysUntilService > 0) {
      setShowMaintenanceAlert(true);
    }
  }, [vehicle]);

  // Filter drivers based on search and filters
  const filteredDrivers = driversData.filter(driver => {
    const matchesSearch = searchTerm === '' || 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.stockType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    const matchesVehicleType = vehicleTypeFilter === 'all' || driver.vehicleType === vehicleTypeFilter;
    
    return matchesSearch && matchesStatus && matchesVehicleType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'inactive': return 'text-red-400 bg-red-500/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400 bg-red-500/20';
    if (score >= 40) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  const getFuelIcon = (type: string) => {
    switch (type) {
      case 'diesel': return <Droplet className="w-5 h-5" />;
      case 'electric': return <Battery className="w-5 h-5" />;
      case 'cng': return <Zap className="w-5 h-5" />;
      default: return <Fuel className="w-5 h-5" />;
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'truck': return <Truck className="w-6 h-6" />;
      case 'van': return <Navigation className="w-6 h-6" />;
      case 'bike': return <Activity className="w-6 h-6" />;
      default: return <Truck className="w-6 h-6" />;
    }
  };

  const handleExportData = () => {
    console.log('Export button clicked, vehicle data:', vehicle);
    
    try {
      const exportData = {
        vehicle: {
          id: vehicle.id,
          registrationNumber: vehicle.registrationNumber,
          vehicleType: vehicle.vehicleType,
          brand: vehicle.brand,
          model: vehicle.model,
          capacity: vehicle.capacity,
          fuelType: vehicle.fuelType,
          status: vehicle.status,
          currentLocation: vehicle.currentLocation,
          assignedDriver: vehicle.assignedDriver,
          assignedRoute: vehicle.assignedRoute,
          currentSpeed: vehicle.currentSpeed,
          impactScore: vehicle.impactScore,
          efficiency: vehicle.efficiency,
          performance: vehicle.performance,
          maintenance: vehicle.maintenance
        },
        aiInsights: {
          predictedMaintenanceAlert: vehicle.aiInsights.predictedMaintenanceAlert,
          fuelConsumptionAnomaly: vehicle.aiInsights.fuelConsumptionAnomaly,
          riskScore: vehicle.aiInsights.riskScore,
          recommendations: vehicle.aiInsights.recommendations
        },
        exportTimestamp: new Date().toISOString(),
        exportedBy: 'Fleet Management System'
      };

      console.log('Export data prepared:', exportData);

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = `vehicle-${vehicle.registrationNumber}-${new Date().toISOString().split('T')[0]}.json`;
      link.download = fileName;
      
      console.log('Downloading file:', fileName);
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('Export completed successfully');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Fleet
              </button>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="flex items-center gap-3">
                <Truck className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Fleet Management</h1>
                  <p className="text-slate-400">Driver & Vehicle Overview</p>
                </div>
              </div>
            </div>
            
            {/* Header Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddDriverForm(true)}
                className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors"
                title="Add new driver"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Driver</span>
              </button>
              
              <button
                onClick={() => {/* Notifications */}}
                className="flex items-center gap-2 px-3 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition-colors relative"
                title="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Alerts</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></span>
              </button>
              
              <button
                onClick={() => handleExportData()}
                className="flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                title="Export vehicle data"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Alert */}
      <AnimatePresence>
        {showMaintenanceAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 mt-4"
          >
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div className="flex-1">
                  <p className="text-yellow-400 font-medium">Maintenance Due Soon</p>
                  <p className="text-sm text-yellow-300">
                    Next service scheduled for {vehicle.maintenance.nextServiceDue}
                  </p>
                </div>
                <button
                  onClick={() => setShowMaintenanceAlert(false)}
                  className="text-yellow-400 hover:text-yellow-300"
                  aria-label="Close maintenance alert"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Driver-Vehicle Stock Table */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4 lg:mb-0">
              <Truck className="w-5 h-5 text-blue-400" />
              Fleet Stock Overview
            </h3>
            
            {/* Global Action Buttons and Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Side - Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {/* Refresh Data */}}
                  className="flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                  title="Refresh data"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                
                                
                                
                              </div>
              
              {/* Right Side - Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search drivers, vehicles, routes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 pl-10 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                </div>
                
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  title="Filter by driver status"
                  className="px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Loading">Loading</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
                
                {/* Vehicle Type Filter */}
                <select
                  value={vehicleTypeFilter}
                  onChange={(e) => setVehicleTypeFilter(e.target.value)}
                  title="Filter by vehicle type"
                  className="px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="all">All Vehicles</option>
                  <option value="truck">Trucks</option>
                  <option value="van">Vans</option>
                  <option value="bike">Bikes</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium w-16">Sr No.</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Driver</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Vehicle</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Stock Type</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Quantity</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Route</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">ETA</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.length > 0 ? (
                  filteredDrivers.map((driver, index) => (
                  <tr 
                    key={driver.id}
                    className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors cursor-pointer ${
                      selectedDriver?.id === driver.id ? 'bg-blue-500/10' : ''
                    }`}
                    onClick={() => setSelectedDriver(driver)}
                  >
                    <td className="py-3 px-4 text-white font-medium">{index + 1}</td>
                    <td className="py-3 px-4 text-white font-medium">{driver.name}</td>
                    <td className="py-3 px-4 text-slate-300">{driver.vehicle}</td>
                    <td className="py-3 px-4 text-slate-300">{driver.stockType}</td>
                    <td className="py-3 px-4 text-slate-300">{driver.quantity}</td>
                    <td className="py-3 px-4 text-slate-300">{driver.route}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        driver.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        driver.status === 'Loading' ? 'bg-yellow-500/20 text-yellow-400' :
                        driver.status === 'Delayed' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{driver.eta}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {/* Contact Driver */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`tel:${driver.contact}`);
                          }}
                          className="p-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                          title="Call driver"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Send Message */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Message functionality
                          }}
                          className="p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                          title="Send message"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Live Tracking */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowLiveTracking(true);
                          }}
                          className="p-1.5 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 transition-colors"
                          title="Live tracking"
                        >
                          <Map className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* More Actions Dropdown */}
                        <div className="relative group">
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 bg-slate-600/20 text-slate-300 rounded hover:bg-slate-600/30 transition-colors"
                            title="More actions"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>
                          
                          {/* Dropdown Menu */}
                          <div className="absolute right-0 top-full mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Generate report
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
                              >
                                <FileText className="w-4 h-4" />
                                Generate Report
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Request maintenance
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
                              >
                                <Wrench className="w-4 h-4" />
                                Request Maintenance
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Fuel request
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
                              >
                                <Fuel className="w-4 h-4" />
                                Fuel Request
                              </button>
                              
                              {driver.status === 'Active' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Pause trip
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
                                >
                                  <Pause className="w-4 h-4" />
                                  Pause Trip
                                </button>
                              )}
                              
                              {driver.status === 'Loading' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Start trip
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
                                >
                                  <Play className="w-4 h-4" />
                                  Start Trip
                                </button>
                              )}
                              
                              <hr className="border-slate-700 my-1" />
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Emergency alert
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-slate-700 transition-colors flex items-center gap-2"
                              >
                                <AlertTriangle className="w-4 h-4" />
                                Emergency Alert
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Search className="w-12 h-12 text-slate-600 mb-4" />
                        <p className="text-slate-400">No drivers found matching your criteria</p>
                        <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Driver Details */}
        {selectedDriver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                Driver Details: {selectedDriver.name}
              </h3>
              <button
                onClick={() => setSelectedDriver(null)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close driver details"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-400 text-sm">Vehicle</span>
                </div>
                <p className="text-white font-medium">{selectedDriver.vehicle}</p>
                <p className="text-slate-400 text-xs capitalize">{selectedDriver.vehicleType}</p>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span className="text-slate-400 text-sm">Current Location</span>
                </div>
                <p className="text-white font-medium">{selectedDriver.currentLocation}</p>
                <p className="text-slate-400 text-xs">Updated {selectedDriver.lastUpdate}</p>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Fuel className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-400 text-sm">Fuel Level</span>
                </div>
                <p className="text-white font-medium">{selectedDriver.fuelLevel}</p>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${parseInt(selectedDriver.fuelLevel)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-400 text-sm">Temperature</span>
                </div>
                <p className="text-white font-medium">{selectedDriver.temperature}</p>
                <p className="text-slate-400 text-xs">Cargo Area</p>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400 text-sm">Contact</span>
                </div>
                <p className="text-white font-medium">{selectedDriver.contact}</p>
                <p className="text-slate-400 text-xs">Mobile</p>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-400 text-sm">License</span>
                </div>
                <p className="text-white font-medium">{selectedDriver.license}</p>
                <p className="text-slate-400 text-xs">Valid</p>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-400 text-sm">Experience</span>
                </div>
                <p className="text-white font-medium">{selectedDriver.experience}</p>
                <p className="text-slate-400 text-xs">Driving</p>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-400 text-sm">Performance</span>
                </div>
                <p className="text-white font-medium">{selectedDriver.rating}/5.0 ⭐</p>
                <p className="text-slate-400 text-xs">{selectedDriver.tripsToday} trips today</p>
              </div>
            </div>
            
            {/* Track Location Button */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-blue-400" />
                      Live Location Tracking
                    </h4>
                    <p className="text-slate-300 text-sm">
                      Track {selectedDriver.name}'s real-time location on interactive map
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm">Live</span>
                      </div>
                      <div className="text-slate-400 text-sm">
                        Last updated: {selectedDriver.lastUpdate}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLocationModal(true)}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium"
                  >
                    <Map className="w-5 h-5" />
                    Track Location
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-400" />
                  Cargo Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Type:</span>
                    <span className="text-white">{selectedDriver.stockType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Quantity:</span>
                    <span className="text-white">{selectedDriver.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Route:</span>
                    <span className="text-white">{selectedDriver.route}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  Trip Status
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedDriver.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                      selectedDriver.status === 'Loading' ? 'bg-yellow-500/20 text-yellow-400' :
                      selectedDriver.status === 'Delayed' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {selectedDriver.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ETA:</span>
                    <span className="text-white">{selectedDriver.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Update:</span>
                    <span className="text-white">{selectedDriver.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl">
          <div className="flex border-b border-slate-700/50">
            {[
              { id: 'overview', name: 'Overview', icon: Truck },
              { id: 'performance', name: 'Performance', icon: BarChart3 },
              { id: 'maintenance', name: 'Maintenance', icon: Wrench },
              { id: 'ai-insights', name: 'AI Insights', icon: Brain }
            ].map((tab) => (
              <button
                key={tab.id}
                title={`View ${tab.name} tab`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {selectedDriver ? (
                    <>
                      {/* Basic Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b border-slate-700/30">
                              <span className="text-slate-400">Driver Name</span>
                              <span className="text-white font-medium">{selectedDriver.name}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-slate-700/30">
                              <span className="text-slate-400">Vehicle</span>
                              <span className="text-white font-medium">{selectedDriver.vehicle}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-slate-700/30">
                              <span className="text-slate-400">Vehicle Type</span>
                              <span className="text-white font-medium capitalize">{selectedDriver.vehicleType}</span>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b border-slate-700/30">
                              <span className="text-slate-400">Contact Number</span>
                              <span className="text-white font-medium">{selectedDriver.contact}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-slate-700/30">
                              <span className="text-slate-400">License Number</span>
                              <span className="text-white font-medium">{selectedDriver.license}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-slate-700/30">
                              <span className="text-slate-400">Experience</span>
                              <span className="text-white font-medium">{selectedDriver.experience}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Current Status */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Current Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Trip Status</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedDriver.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                                  selectedDriver.status === 'Loading' ? 'bg-yellow-500/20 text-yellow-400' :
                                  selectedDriver.status === 'Delayed' ? 'bg-red-500/20 text-red-400' :
                                  'bg-blue-500/20 text-blue-400'
                                }`}>
                                  {selectedDriver.status}
                                </span>
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Current Location</span>
                                <span className="text-white font-medium text-sm">{selectedDriver.currentLocation}</span>
                              </div>
                              <p className="text-sm text-slate-500">Updated {selectedDriver.lastUpdate}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Assigned Route</span>
                                <span className="text-white font-medium">{selectedDriver.route}</span>
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Performance Rating</span>
                                <span className="text-white font-medium">{selectedDriver.rating}/5.0 ⭐</span>
                              </div>
                              <p className="text-sm text-slate-500">{selectedDriver.tripsToday} trips today</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <User className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Select a driver from the table above to view their details</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'performance' && (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {selectedDriver ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Today's Trips</span>
                            <TrendingUp className="w-5 h-5 text-green-400" />
                          </div>
                          <p className="text-3xl font-bold text-white">{selectedDriver.tripsToday}</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Performance Rating</span>
                            <Star className="w-5 h-5 text-yellow-400" />
                          </div>
                          <p className="text-3xl font-bold text-white">{selectedDriver.rating}/5.0</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Fuel Level</span>
                            <Fuel className="w-5 h-5 text-green-400" />
                          </div>
                          <p className="text-3xl font-bold text-white">{selectedDriver.fuelLevel}</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Experience</span>
                            <Clock className="w-5 h-5 text-blue-400" />
                          </div>
                          <p className="text-3xl font-bold text-white">{selectedDriver.experience}</p>
                        </div>
                      </div>

                  <div className="bg-slate-900/50 rounded-lg p-6">
                        <h4 className="text-white font-medium mb-4">Performance Metrics</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-slate-400">Performance Score</span>
                              <span className="text-white font-medium">{(selectedDriver.rating * 20).toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 ${
                                  selectedDriver.rating >= 4.5 ? 'bg-green-400' :
                                  selectedDriver.rating >= 3.5 ? 'bg-yellow-400' :
                                  'bg-red-400'
                                }`}
                                style={{ width: `${selectedDriver.rating * 20}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-slate-400">Fuel Efficiency</span>
                              <span className="text-white font-medium">{parseInt(selectedDriver.fuelLevel)}%</span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full bg-yellow-400 transition-all duration-300"
                                style={{ width: selectedDriver.fuelLevel }}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-slate-800/50 rounded-lg p-3">
                              <span className="text-slate-400 text-sm">Current Status</span>
                              <p className="text-white font-medium mt-1">{selectedDriver.status}</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3">
                              <span className="text-slate-400 text-sm">ETA</span>
                              <p className="text-white font-medium mt-1">{selectedDriver.eta}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Select a driver from the table above to view their performance</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'maintenance' && (
                <motion.div
                  key="maintenance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {selectedDriver ? (
                    <>
                      {/* Vehicle Maintenance */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Vehicle Maintenance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Vehicle Status</span>
                                <Wrench className="w-5 h-5 text-blue-400" />
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                selectedDriver.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                                selectedDriver.status === 'Loading' ? 'bg-yellow-500/20 text-yellow-400' :
                                selectedDriver.status === 'Delayed' ? 'bg-red-500/20 text-red-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {selectedDriver.status}
                              </span>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Fuel Level</span>
                                <Fuel className="w-5 h-5 text-yellow-400" />
                              </div>
                              <p className="text-white font-medium">{selectedDriver.fuelLevel}</p>
                              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${parseInt(selectedDriver.fuelLevel)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Temperature</span>
                                <Thermometer className="w-5 h-5 text-orange-400" />
                              </div>
                              <p className="text-white font-medium">{selectedDriver.temperature}</p>
                              <p className="text-sm text-slate-500">Cargo Area</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Last Update</span>
                                <Clock className="w-5 h-5 text-green-400" />
                              </div>
                              <p className="text-white font-medium">{selectedDriver.lastUpdate}</p>
                              <p className="text-sm text-slate-500">Real-time tracking</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Driver License & Documents */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Driver Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">License Number</span>
                                <FileText className="w-5 h-5 text-cyan-400" />
                              </div>
                              <p className="text-white font-medium">{selectedDriver.license}</p>
                              <p className="text-sm text-slate-500">Valid License</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Contact</span>
                                <Phone className="w-5 h-5 text-purple-400" />
                              </div>
                              <p className="text-white font-medium">{selectedDriver.contact}</p>
                              <p className="text-sm text-slate-500">Mobile Number</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Experience</span>
                                <Clock className="w-5 h-5 text-indigo-400" />
                              </div>
                              <p className="text-white font-medium">{selectedDriver.experience}</p>
                              <p className="text-sm text-slate-500">Driving Experience</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400">Performance</span>
                                <Star className="w-5 h-5 text-amber-400" />
                              </div>
                              <p className="text-white font-medium">{selectedDriver.rating}/5.0 ⭐</p>
                              <p className="text-sm text-slate-500">{selectedDriver.tripsToday} trips today</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Wrench className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Select a driver from the table above to view their maintenance information</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'ai-insights' && (
                <motion.div
                  key="ai-insights"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {selectedDriver ? (
                    <>
                      {/* Risk Score */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">AI Risk Assessment</h3>
                        <div className="bg-slate-900/50 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-3xl font-bold text-white">{Math.round((5 - selectedDriver.rating) * 20)}/100</p>
                              <p className="text-slate-400">Overall Risk Score</p>
                            </div>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              selectedDriver.rating >= 4.5 ? 'bg-green-500/20 text-green-400' :
                              selectedDriver.rating >= 3.5 ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              <Shield className="w-8 h-8" />
                            </div>
                          </div>
                          <div className={`w-full bg-slate-700/50 rounded-full h-3 overflow-hidden`}>
                            <div 
                              className={`h-full transition-all duration-300 ${
                                selectedDriver.rating >= 4.5 ? 'bg-green-400' :
                                selectedDriver.rating >= 3.5 ? 'bg-yellow-400' :
                                'bg-red-400'
                              }`}
                              style={{ width: `${(5 - selectedDriver.rating) * 20}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* AI Alerts */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">AI Alerts & Recommendations</h3>
                        <div className="space-y-4">
                          {selectedDriver.status === 'Delayed' && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                                <div>
                                  <p className="text-red-400 font-medium mb-1">Delay Alert</p>
                                  <p className="text-sm text-red-300">
                                    Driver is experiencing delays. Consider rerouting or adjusting delivery expectations.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {parseInt(selectedDriver.fuelLevel) < 40 && (
                            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
                                <div>
                                  <p className="text-orange-400 font-medium mb-1">Low Fuel Warning</p>
                                  <p className="text-sm text-orange-300">
                                    Fuel level is at {selectedDriver.fuelLevel}. Recommend refueling within next 2 hours.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {selectedDriver.rating >= 4.5 && (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                                <div>
                                  <p className="text-green-400 font-medium mb-1">Excellent Performance</p>
                                  <p className="text-sm text-green-300">
                                    Driver showing exceptional performance. Consider for premium routes and training mentorship.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <Brain className="w-5 h-5 text-blue-400 mt-0.5" />
                              <div>
                                <p className="text-blue-400 font-medium mb-1">Route Optimization Suggestion</p>
                                <p className="text-sm text-blue-300">
                                  Based on current traffic patterns and {selectedDriver.currentLocation}, AI suggests alternative route could save 15-20 minutes.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Insights */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Performance Insights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              <span className="text-slate-400 text-sm">Efficiency Score</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{(selectedDriver.rating * 20).toFixed(0)}%</p>
                            <p className="text-xs text-slate-500">Based on trips and performance</p>
                          </div>
                          <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="w-4 h-4 text-blue-400" />
                              <span className="text-slate-400 text-sm">Activity Level</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{selectedDriver.tripsToday}</p>
                            <p className="text-xs text-slate-500">Trips completed today</p>
                          </div>
                          <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-4 h-4 text-yellow-400" />
                              <span className="text-slate-400 text-sm">Response Time</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{selectedDriver.lastUpdate}</p>
                            <p className="text-xs text-slate-500">Last GPS update</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Brain className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Select a driver from the table above to view AI insights</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Add Driver Form Modal */}
      <AnimatePresence>
        {showAddDriverForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddDriverForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-400" />
                    Add Driver Form
                  </h2>
                  <button
                    onClick={() => setShowAddDriverForm(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label="Close form"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Form Progress</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-8">
                  {/* Section 1 - Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-400" />
                      Section 1 — Personal Info
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Profile Photo</label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center">
                            <User className="w-8 h-8 text-slate-600" />
                          </div>
                          <button className="px-3 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors">
                            Upload Photo
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-300 mb-2">Date of Birth</label>
                        <input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Alternate Phone Number</label>
                        <input
                          type="tel"
                          value={formData.alternatePhone}
                          onChange={(e) => setFormData({...formData, alternatePhone: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email ID</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="bloodGroup" className="block text-sm font-medium text-slate-300 mb-2">Blood Group *</label>
                        <select
                          id="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter complete address"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2 - License & Documents */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-400" />
                      Section 2 — License & Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">License Number *</label>
                        <input
                          type="text"
                          value={formData.licenseNumber}
                          onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="DL-XX-XXXX-XXXXXX"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="licenseType" className="block text-sm font-medium text-slate-300 mb-2">License Type *</label>
                        <select
                          id="licenseType"
                          value={formData.licenseType}
                          onChange={(e) => setFormData({...formData, licenseType: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select License Type</option>
                          <option value="light">Light Vehicle</option>
                          <option value="heavy">Heavy Vehicle</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="licenseExpiry" className="block text-sm font-medium text-slate-300 mb-2">License Expiry Date *</label>
                        <input
                          id="licenseExpiry"
                          type="date"
                          value={formData.licenseExpiry}
                          onChange={(e) => setFormData({...formData, licenseExpiry: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Upload License Photo</label>
                        <button className="px-3 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors">
                          Upload License
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Aadhar / Government ID Number</label>
                        <input
                          type="text"
                          value={formData.aadharNumber}
                          onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="XXXX XXXX XXXX"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Upload Aadhar / ID Proof</label>
                        <button className="px-3 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors">
                          Upload ID Proof
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Police Verification Certificate</label>
                        <button className="px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors">
                          Upload Certificate
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Medical Fitness Certificate</label>
                        <button className="px-3 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition-colors">
                          Upload Certificate
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section 3 - Assignment Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-yellow-400" />
                      Section 3 — Assignment Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="assignedVehicle" className="block text-sm font-medium text-slate-300 mb-2">Assigned Vehicle</label>
                        <select
                          id="assignedVehicle"
                          value={formData.assignedVehicle}
                          onChange={(e) => setFormData({...formData, assignedVehicle: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select Vehicle</option>
                          <option value="truck-001">Truck-TR001</option>
                          <option value="van-002">Van-VN002</option>
                          <option value="bike-003">Bike-BK003</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="assignedZone" className="block text-sm font-medium text-slate-300 mb-2">Assigned Zone / Region</label>
                        <select
                          id="assignedZone"
                          value={formData.assignedZone}
                          onChange={(e) => setFormData({...formData, assignedZone: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select Zone</option>
                          <option value="north">North Zone</option>
                          <option value="south">South Zone</option>
                          <option value="east">East Zone</option>
                          <option value="west">West Zone</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="assignedWarehouse" className="block text-sm font-medium text-slate-300 mb-2">Assigned Warehouse</label>
                        <select
                          id="assignedWarehouse"
                          value={formData.assignedWarehouse}
                          onChange={(e) => setFormData({...formData, assignedWarehouse: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select Warehouse</option>
                          <option value="warehouse-1">Warehouse A</option>
                          <option value="warehouse-2">Warehouse B</option>
                          <option value="warehouse-3">Warehouse C</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="shiftTiming" className="block text-sm font-medium text-slate-300 mb-2">Shift Timing</label>
                        <select
                          id="shiftTiming"
                          value={formData.shiftTiming}
                          onChange={(e) => setFormData({...formData, shiftTiming: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select Shift</option>
                          <option value="morning">Morning (6AM - 2PM)</option>
                          <option value="evening">Evening (2PM - 10PM)</option>
                          <option value="night">Night (10PM - 6AM)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="employmentType" className="block text-sm font-medium text-slate-300 mb-2">Employment Type</label>
                        <select
                          id="employmentType"
                          value={formData.employmentType}
                          onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="">Select Type</option>
                          <option value="full-time">Full Time</option>
                          <option value="contract">Contract</option>
                          <option value="part-time">Part Time</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="joiningDate" className="block text-sm font-medium text-slate-300 mb-2">Joining Date</label>
                        <input
                          id="joiningDate"
                          type="date"
                          value={formData.joiningDate}
                          onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 4 - Login Credentials */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-cyan-400" />
                      Section 4 — Login Credentials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                          <input
                            type="checkbox"
                            checked={formData.phoneBasedLogin}
                            onChange={(e) => setFormData({...formData, phoneBasedLogin: e.target.checked})}
                            className="rounded border-slate-600 bg-slate-800 text-purple-400 focus:ring-purple-400"
                          />
                          Auto-generate phone based login
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Temporary Password</label>
                        <input
                          type="text"
                          value={formData.temporaryPassword}
                          onChange={(e) => setFormData({...formData, temporaryPassword: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Auto-generated"
                          readOnly
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                          <input
                            type="checkbox"
                            checked={formData.sendCredentialsSMS}
                            onChange={(e) => setFormData({...formData, sendCredentialsSMS: e.target.checked})}
                            className="rounded border-slate-600 bg-slate-800 text-purple-400 focus:ring-purple-400"
                          />
                          Send credentials via SMS
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Section 5 - Emergency Contact */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      Section 5 — Emergency Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Contact Person Name</label>
                        <input
                          type="text"
                          value={formData.emergencyContactName}
                          onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Emergency contact name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Relationship</label>
                        <input
                          type="text"
                          value={formData.emergencyRelationship}
                          onChange={(e) => setFormData({...formData, emergencyRelationship: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Father, Mother, Spouse, etc."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="bg-slate-800 border-t border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-700 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors">
                      📥 Bulk Import CSV
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddDriverForm(false)}
                      className="px-4 py-2 bg-slate-700 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      ❌ Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors">
                      💾 Save as Draft
                    </button>
                    <button className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors">
                      ✅ Submit & Add Driver
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Details Modal */}
      <AnimatePresence>
        {showLocationModal && selectedDriver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLocationModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Map className="w-5 h-5 text-blue-400" />
                    Live Location Tracking - {selectedDriver.name}
                  </h2>
                  <button
                    onClick={() => setShowLocationModal(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label="Close location modal"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Location Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Live Map View */}
                  <div className="bg-slate-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Live Map View</h3>
                    <div className="bg-slate-900 rounded-lg h-64 overflow-hidden">
                      {selectedDriver ? (
                        <DriverLiveMap driver={selectedDriver} />
                      ) : (
                        <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-600">
                          <div className="text-center">
                            <Map className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                            <p className="text-slate-400 mb-2">Select a driver to view map</p>
                            <p className="text-slate-500 text-sm">Real-time GPS tracking</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Map Controls */}
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors text-sm">
                        📍 Center on Vehicle
                      </button>
                      <button className="flex-1 px-3 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm">
                        🛣️ Show Route
                      </button>
                      <button className="flex-1 px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors text-sm">
                        📡 Fullscreen
                      </button>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-4">
                    <div className="bg-slate-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Current Location Details</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-white font-medium">Current Position</p>
                            <p className="text-slate-300 text-sm">{selectedDriver.currentLocation}</p>
                            <p className="text-slate-500 text-xs mt-1">GPS Coordinates: 19.0760°N, 72.8777°E</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Navigation className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-white font-medium">Route Information</p>
                            <p className="text-slate-300 text-sm">{selectedDriver.route}</p>
                            <p className="text-slate-500 text-xs mt-1">Distance covered: 45.2 km / 78.5 km</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-white font-medium">Time Information</p>
                            <p className="text-slate-300 text-sm">ETA: {selectedDriver.eta}</p>
                            <p className="text-slate-500 text-xs mt-1">Last updated: {selectedDriver.lastUpdate}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Activity className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-white font-medium">Movement Status</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-green-400 text-sm">Moving at 65 km/h</span>
                            </div>
                            <p className="text-slate-500 text-xs mt-1">Average speed: 58 km/h</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Driver & Vehicle Info */}
                    <div className="bg-slate-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Driver & Vehicle Info</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Driver Name</span>
                          <span className="text-white font-medium">{selectedDriver.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Vehicle</span>
                          <span className="text-white font-medium">{selectedDriver.vehicle}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Contact</span>
                          <span className="text-white font-medium">{selectedDriver.contact}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Fuel Level</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{selectedDriver.fuelLevel}</span>
                            <div className="w-16 bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${parseInt(selectedDriver.fuelLevel)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Cargo Temperature</span>
                          <span className="text-white font-medium">{selectedDriver.temperature}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-slate-700 px-6 py-4 bg-slate-800">
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Driver
                  </button>
                  <button className="flex-1 px-4 py-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                  <button className="flex-1 px-4 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Emergency Alert
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Tracking Modal */}
      <AnimatePresence>
        {showLiveTracking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLiveTracking(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-xl border border-slate-700/50 w-full max-w-6xl h-[90vh] max-h-[900px] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Map className="w-6 h-6 text-purple-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Live Vehicle Tracking</h2>
                    <p className="text-slate-400">Real-time location and route monitoring</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLiveTracking(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close tracking modal"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Live Map Container */}
              <div className="h-[calc(100%-88px)]">
                {selectedDriver ? (
                  <DriverLiveMap driver={selectedDriver} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Map className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Select a driver to view live tracking</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
