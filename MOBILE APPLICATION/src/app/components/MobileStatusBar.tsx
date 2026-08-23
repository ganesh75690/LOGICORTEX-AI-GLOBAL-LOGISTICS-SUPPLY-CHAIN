import { Signal, Wifi, Battery, BatteryCharging } from 'lucide-react';

export function MobileStatusBar() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="bg-zinc-900 px-6 py-2 flex items-center justify-between text-white text-xs font-medium">
      {/* Time */}
      <div className="font-semibold">
        {currentTime}
      </div>

      {/* Status Icons */}
      <div className="flex items-center gap-1">
        {/* Signal Strength */}
        <div className="flex items-center gap-0.5">
          <Signal className="w-3 h-3 text-white" />
          <div className="flex gap-0.5">
            <div className="w-0.5 h-2 bg-white rounded-full"></div>
            <div className="w-0.5 h-2 bg-white rounded-full"></div>
            <div className="w-0.5 h-2 bg-white rounded-full"></div>
            <div className="w-0.5 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* WiFi */}
        <Wifi className="w-3 h-3 text-white" />

        {/* Battery with charging indicator */}
        <div className="flex items-center gap-1">
          <BatteryCharging className="w-3 h-3 text-green-400" />
          <div className="relative">
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="absolute inset-0 bg-green-400 rounded-sm w-[75%]"></div>
            </div>
            <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-white rounded-r-sm"></div>
          </div>
          <span className="text-green-400 text-xs">75%</span>
        </div>
      </div>
    </div>
  );
}
