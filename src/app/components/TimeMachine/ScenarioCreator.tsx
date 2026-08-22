import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plus, 
  Save, 
  MapPin, 
  Clock, 
  Info,
  CheckCircle
} from 'lucide-react';
import {
  DisruptionScenario,
  DisruptionType,
  SeverityLevel
} from '../../types/timeMachine';

interface ScenarioCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scenario: DisruptionScenario) => void;
}

/**
 * Scenario Creator Component
 * Interface for creating custom disruption scenarios
 */
export const ScenarioCreator: React.FC<ScenarioCreatorProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    disruptionType: 'port_closure' as DisruptionType,
    severity: 'medium' as SeverityLevel,
    locationType: 'port' as 'supplier' | 'warehouse' | 'port' | 'route' | 'factory',
    locationName: '',
    estimatedDuration: 72,
    parameters: {} as { [key: string]: number | string | boolean }
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const disruptionTypes: { value: DisruptionType; label: string; icon: string }[] = [
    { value: 'supplier_failure', label: 'Supplier Failure', icon: '🏭' },
    { value: 'port_closure', label: 'Port Closure', icon: '🚢' },
    { value: 'factory_shutdown', label: 'Factory Shutdown', icon: '🏗️' },
    { value: 'weather_disruption', label: 'Weather Disruption', icon: '🌪️' },
    { value: 'fuel_price_increase', label: 'Fuel Price Increase', icon: '⛽' },
    { value: 'demand_spike', label: 'Sudden Demand Spike', icon: '📈' },
    { value: 'customs_delay', label: 'Customs Delay', icon: '📋' },
    { value: 'cyberattack', label: 'Cyberattack', icon: '🔒' },
    { value: 'labor_strike', label: 'Labor Strike', icon: '✊' },
    { value: 'transportation_accident', label: 'Transportation Accident', icon: '🚗' },
    { value: 'earthquake', label: 'Earthquake', icon: '🌍' },
    { value: 'flood', label: 'Flood', icon: '🌊' },
    { value: 'war', label: 'War', icon: '⚔️' },
    { value: 'pandemic', label: 'Pandemic', icon: '🦠' },
    { value: 'warehouse_fire', label: 'Warehouse Fire', icon: '🔥' },
    { value: 'vehicle_breakdown', label: 'Vehicle Breakdown', icon: '🚛' }
  ];

  const severityLevels: { value: SeverityLevel; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'medium', label: 'Medium', color: 'yellow' },
    { value: 'high', label: 'High', color: 'orange' },
    { value: 'critical', label: 'Critical', color: 'red' }
  ];

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Scenario name is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }

    if (currentStep === 2) {
      if (!formData.locationName.trim()) newErrors.locationName = 'Location name is required';
      if (formData.estimatedDuration < 1) newErrors.estimatedDuration = 'Duration must be at least 1 hour';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        handleSave();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSave = () => {
    const scenario: DisruptionScenario = {
      id: `scenario_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      disruptionType: formData.disruptionType,
      severity: formData.severity,
      location: {
        type: formData.locationType,
        id: `${formData.locationType}_${Date.now()}`,
        name: formData.locationName
      },
      startTime: new Date(),
      estimatedDuration: formData.estimatedDuration,
      parameters: formData.parameters,
      createdAt: new Date(),
      createdBy: 'admin'
    };

    onSave(scenario);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      disruptionType: 'port_closure',
      severity: 'medium',
      locationType: 'port',
      locationName: '',
      estimatedDuration: 72,
      parameters: {}
    });
    setStep(1);
    setErrors({});
    onClose();
  };

  const updateParameter = (key: string, value: number | string | boolean) => {
    setFormData(prev => ({
      ...prev,
      parameters: { ...prev.parameters, [key]: value }
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Scenario Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent ${
            errors.name ? 'border-red-500' : 'border-slate-600'
          }`}
          placeholder="e.g., Mumbai Port Closure Scenario"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent ${
            errors.description ? 'border-red-500' : 'border-slate-600'
          }`}
          placeholder="Describe the disruption scenario and its context"
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Disruption Type
        </label>
        <div className="grid grid-cols-4 gap-3">
          {disruptionTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFormData(prev => ({ ...prev, disruptionType: type.value }))}
              className={`p-3 rounded-lg border-2 text-center transition ${
                formData.disruptionType === type.value
                  ? 'border-[#00F5C4] bg-[#00F5C4]/10'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className="text-xs font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Severity Level
        </label>
        <div className="flex gap-3">
          {severityLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setFormData(prev => ({ ...prev, severity: level.value }))}
              className={`flex-1 p-3 rounded-lg border-2 text-center transition ${
                formData.severity === level.value
                  ? `border-${level.color}-500 bg-${level.color}-500/20 text-${level.color}-400`
                  : 'border-slate-600 hover:border-slate-500 text-slate-300'
              }`}
            >
              <div className="font-medium">{level.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Location Type
        </label>
        <div className="flex gap-3">
          {(['supplier', 'warehouse', 'port', 'route', 'factory'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFormData(prev => ({ ...prev, locationType: type }))}
              className={`flex-1 p-3 rounded-lg border-2 text-center transition capitalize ${
                formData.locationType === type
                  ? 'border-[#00F5C4] bg-[#00F5C4]/10'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Location Name *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={formData.locationName}
            onChange={(e) => setFormData(prev => ({ ...prev, locationName: e.target.value }))}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent ${
              errors.locationName ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="e.g., Mumbai Port, Factory A, Supplier XYZ"
          />
        </div>
        {errors.locationName && <p className="text-red-400 text-sm mt-1">{errors.locationName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Estimated Duration (hours)
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="number"
            value={formData.estimatedDuration}
            onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) || 0 }))}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent ${
              errors.estimatedDuration ? 'border-red-500' : 'border-slate-600'
            }`}
            min="1"
            max="8760"
          />
        </div>
        {errors.estimatedDuration && <p className="text-red-400 text-sm mt-1">{errors.estimatedDuration}</p>}
        <p className="text-sm text-slate-400 mt-1">
          Duration: {Math.floor(formData.estimatedDuration / 24)} days {formData.estimatedDuration % 24} hours
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/30 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#00F5C4] mt-0.5" />
        <div>
          <div className="font-medium text-white">Additional Parameters</div>
          <div className="text-sm text-slate-300">
            Customize the scenario with specific parameters for more accurate predictions
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Impact Radius (km)
          </label>
          <input
            type="number"
            value={formData.parameters.impactRadius as number || 50}
            onChange={(e) => updateParameter('impactRadius', parseInt(e.target.value) || 50)}
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent"
            placeholder="50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Recovery Probability (%)
          </label>
          <input
            type="number"
            value={formData.parameters.recoveryProbability as number || 70}
            onChange={(e) => updateParameter('recoveryProbability', parseInt(e.target.value) || 70)}
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent"
            min="0"
            max="100"
            placeholder="70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Warning Time (hours)
          </label>
          <input
            type="number"
            value={formData.parameters.warningTime as number || 0}
            onChange={(e) => updateParameter('warningTime', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent"
            min="0"
            placeholder="0"
          />
          <p className="text-sm text-slate-400 mt-1">Hours of advance warning before disruption occurs</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Cascade Factor
          </label>
          <select
            value={formData.parameters.cascadeFactor as string || 'medium'}
            onChange={(e) => updateParameter('cascadeFactor', e.target.value)}
            className="w-full px-4 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent"
          >
            <option value="low">Low - Minimal cascading effects</option>
            <option value="medium">Medium - Moderate cascading effects</option>
            <option value="high">High - Significant cascading effects</option>
            <option value="severe">Severe - Widespread cascading effects</option>
          </select>
        </div>
      </div>

      {/* Scenario Summary */}
      <div className="bg-slate-700/30 rounded-lg p-4">
        <div className="font-medium mb-3 text-white">Scenario Summary</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Name:</span>
            <span className="font-medium text-white">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Type:</span>
            <span className="font-medium capitalize text-white">{formData.disruptionType.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Severity:</span>
            <span className="font-medium capitalize text-white">{formData.severity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Location:</span>
            <span className="font-medium text-white">{formData.locationName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Duration:</span>
            <span className="font-medium text-white">{formData.estimatedDuration} hours</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step >= stepNumber
                  ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
            </div>
            <div className="ml-2 text-sm font-medium text-slate-300">
              {stepNumber === 1 ? 'Basic Info' : stepNumber === 2 ? 'Location' : 'Parameters'}
            </div>
          </div>
          {stepNumber < 3 && (
            <div className={`flex-1 h-1 mx-4 ${step > stepNumber ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8]' : 'bg-slate-700'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-slate-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Create New Scenario</h2>
                  <p className="text-slate-400 text-sm">Design a custom disruption scenario for simulation</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {renderProgress()}

              <div className="mb-6">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-slate-300"
                >
                  Back
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 transition text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 rounded-lg hover:opacity-90 transition flex items-center gap-2 font-semibold"
                  >
                    {step === 3 ? (
                      <>
                        <Save className="w-4 h-4" />
                        Create Scenario
                      </>
                    ) : (
                      <>
                        Next
                        <Plus className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScenarioCreator;
