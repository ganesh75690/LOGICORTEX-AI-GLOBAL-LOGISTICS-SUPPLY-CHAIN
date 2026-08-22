import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface ThreatNode {
  id: string;
  x: number;
  y: number;
  type: 'weather' | 'traffic' | 'shortage' | 'equipment';
  severity: 'low' | 'medium' | 'high';
  isActive: boolean;
}

interface FleetVehicle {
  id: string;
  x: number;
  y: number;
  status: 'active' | 'delayed' | 'critical' | 'idle';
}

export function DisruptionRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [threatNodes, setThreatNodes] = useState<ThreatNode[]>([]);
  const [fleetVehicles, setFleetVehicles] = useState<FleetVehicle[]>([]);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<ThreatNode | FleetVehicle | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Initialize threat nodes
    const nodes: ThreatNode[] = [
      { id: '1', x: 200, y: 170, type: 'traffic', severity: 'high', isActive: false },
      { id: '2', x: 230, y: 190, type: 'weather', severity: 'medium', isActive: false },
      { id: '3', x: 180, y: 210, type: 'shortage', severity: 'low', isActive: false },
    ];

    // Initialize fleet vehicles
    const fleetVehicles: FleetVehicle[] = [
      { id: 'v1', x: 210, y: 180, status: 'active' },
      { id: 'v2', x: 240, y: 200, status: 'delayed' },
      { id: 'v3', x: 190, y: 220, status: 'critical' },
      { id: 'v4', x: 260, y: 170, status: 'idle' },
    ];
    setThreatNodes(nodes);
    setFleetVehicles(fleetVehicles);

    // Radar sweep animation
    const animate = () => {
      setSweepAngle(prev => (prev + 2) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Check which nodes are in the sweep path
    const checkSweep = () => {
      setThreatNodes(prev => prev.map(node => {
        const nodeAngle = Math.atan2(node.y - 200, node.x - 200) * (180 / Math.PI) + 90;
        const normalizedNodeAngle = nodeAngle < 0 ? nodeAngle + 360 : nodeAngle;
        const sweepEndAngle = sweepAngle;
        const sweepStartAngle = (sweepAngle - 30 + 360) % 360;
        
        let inSweep = false;
        if (sweepStartAngle <= sweepEndAngle) {
          inSweep = normalizedNodeAngle >= sweepStartAngle && normalizedNodeAngle <= sweepEndAngle;
        } else {
          inSweep = normalizedNodeAngle >= sweepStartAngle || normalizedNodeAngle <= sweepEndAngle;
        }
        
        return { ...node, isActive: inSweep };
      }));
    };

    checkSweep();
  }, [sweepAngle]);

  const getSeverityColor = (severity: 'low' | 'medium' | 'high', isActive: boolean) => {
    const baseColors = {
      low: 'rgba(34, 197, 94, ',
      medium: 'rgba(234, 179, 8, ',
      high: 'rgba(239, 68, 68, '
    };
    return baseColors[severity] + (isActive ? '1)' : '0.3)');
  };

  const getFleetStatusColor = (status: 'active' | 'delayed' | 'critical' | 'idle') => {
    const colors = {
      active: 'rgb(34, 197, 94)',
      delayed: 'rgb(234, 179, 8)',
      critical: 'rgb(239, 68, 68)',
      idle: 'rgb(59, 130, 246)'
    };
    return colors[status];
  };

  const getThreatDetails = (node: ThreatNode) => {
    const details = {
      traffic: 'Traffic congestion on Highway 101',
      weather: 'Severe weather warning',
      shortage: 'Supply shortage at Warehouse B',
      equipment: 'Equipment malfunction detected'
    };
    return details[node.type] || 'Unknown threat';
  };

  const getVehicleDetails = (vehicle: FleetVehicle) => {
    const details = {
      active: 'Vehicle operating normally',
      delayed: 'Vehicle experiencing delays',
      critical: 'Vehicle requires immediate attention',
      idle: 'Vehicle parked/idle'
    };
    return details[vehicle.status] || 'Unknown status';
  };

  return (
    <div className="relative w-full h-96 bg-slate-900/80 rounded-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
      {/* Radar Grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Concentric circles */}
        {[1, 2, 3].map((ring) => (
          <circle
            key={ring}
            cx="200"
            cy="200"
            r={ring * 70}
            fill="none"
            stroke="rgba(0, 245, 196, 0.1)"
            strokeWidth="1"
          />
        ))}
        
        {/* Cross lines */}
        <line x1="200" y1="10" x2="200" y2="390" stroke="rgba(0, 245, 196, 0.1)" strokeWidth="1" />
        <line x1="10" y1="200" x2="390" y2="200" stroke="rgba(0, 245, 196, 0.1)" strokeWidth="1" />
        
        {/* Sweep trail */}
        <defs>
          <radialGradient id="sweepGradient">
            <stop offset="0%" stopColor="#00F5C4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00F5C4" stopOpacity="0" />
          </radialGradient>
          <filter id="sweepGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Sweep line */}
        <motion.line
          x1="200"
          y1="200"
          x2={200 + Math.cos((sweepAngle - 90) * Math.PI / 180) * 210}
          y2={200 + Math.sin((sweepAngle - 90) * Math.PI / 180) * 210}
          stroke="#00F5C4"
          strokeWidth="2"
          filter="url(#sweepGlow)"
        />
        <path
          d={`M 200 200 L ${200 + Math.cos((sweepAngle - 90) * Math.PI / 180) * 210} ${200 + Math.sin((sweepAngle - 90) * Math.PI / 180) * 210} A 210 210 0 0 1 ${200 + Math.cos((sweepAngle - 120) * Math.PI / 180) * 210} ${200 + Math.sin((sweepAngle - 120) * Math.PI / 180) * 210} Z`}
          fill="url(#sweepGradient)"
        />
      </svg>

      {/* Threat Nodes */}
      {threatNodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-3 h-3 rounded-full cursor-pointer"
          style={{
            left: `${(node.x / 400) * 100}%`,
            top: `${(node.y / 400) * 100}%`,
            backgroundColor: getSeverityColor(node.severity, node.isActive),
            boxShadow: node.isActive ? `0 0 15px ${getSeverityColor(node.severity, true)}` : 'none',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: node.isActive ? 1.3 : 1,
            boxShadow: node.isActive ? `0 0 15px ${getSeverityColor(node.severity, true)}` : 'none',
          }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setHoveredItem(node)}
          onMouseLeave={() => setHoveredItem(null)}
        />
      ))}

      {/* Fleet Vehicles */}
      {fleetVehicles.map((vehicle) => (
        <motion.div
          key={vehicle.id}
          className="absolute w-4 h-4 rounded-full cursor-pointer"
          style={{
            left: `${(vehicle.x / 400) * 100}%`,
            top: `${(vehicle.y / 400) * 100}%`,
            backgroundColor: getFleetStatusColor(vehicle.status),
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: vehicle.status === 'critical' ? [1, 1.3, 1] : 1,
            opacity: vehicle.status === 'idle' ? 0.6 : 1,
          }}
          transition={{
            scale: { duration: 1, repeat: Infinity },
            opacity: { duration: 0.3 }
          }}
          onMouseEnter={() => setHoveredItem(vehicle)}
          onMouseLeave={() => setHoveredItem(null)}
        />
      ))}

      {/* Center point */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#00F5C4] rounded-full shadow-lg shadow-[#00F5C4]/50" />

      {/* Status indicator */}
      <div className="absolute bottom-2 left-2 text-xs text-[#00F5C4] font-medium">
        RADAR ACTIVE
      </div>

      {/* Hover Tooltip */}
      {hoveredItem && (
        <div className="absolute top-4 left-4 bg-slate-800/95 backdrop-blur-md rounded-lg p-3 border border-slate-700/50 shadow-xl z-50 max-w-xs">
          <div className="text-xs font-medium text-white mb-1">
            {hoveredItem.id.startsWith('v') ? 'Vehicle' : 'Threat'} {hoveredItem.id}
          </div>
          <div className="text-xs text-slate-300">
            {'severity' in hoveredItem ? getThreatDetails(hoveredItem as ThreatNode) : getVehicleDetails(hoveredItem as FleetVehicle)}
          </div>
        </div>
      )}
      
      
      {/* Fleet Status Panel */}
      <div className="absolute bottom-2 right-2 bg-slate-800/90 backdrop-blur-md rounded-lg p-3 border border-slate-700/50">
        <div className="text-xs text-slate-400 font-medium mb-2">FLEET STATUS</div>
        <div className="grid grid-cols-2 gap-2">
          {/* Active */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">Active</span>
            <span className="text-xs text-slate-400">24</span>
          </div>
          {/* Delayed */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-xs text-yellow-400 font-medium">Delayed</span>
            <span className="text-xs text-slate-400">8</span>
          </div>
          {/* Critical */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-400 font-medium">Critical</span>
            <span className="text-xs text-slate-400">3</span>
          </div>
          {/* Idle */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-xs text-blue-400 font-medium">Idle</span>
            <span className="text-xs text-slate-400">5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
