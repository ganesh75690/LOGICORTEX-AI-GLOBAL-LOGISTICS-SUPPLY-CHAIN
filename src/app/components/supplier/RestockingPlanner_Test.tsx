import { Calculator } from 'lucide-react';

export default function RestockingPlanner_Test() {
  return (
    <div className="p-6 bg-slate-900 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
          <Calculator className="w-6 h-6 text-[#00F5C4]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Restocking Planner</h2>
          <p className="text-slate-400">AI-powered recommendations for optimal inventory replenishment</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Test Component Working</h3>
        <p className="text-slate-400">The Restocking Planner component is rendering correctly.</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400">Status</div>
            <div className="text-white font-medium">✅ Component Loaded</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-400">Next Step</div>
            <div className="text-white font-medium">Replace with full component</div>
          </div>
        </div>
      </div>
    </div>
  );
}
