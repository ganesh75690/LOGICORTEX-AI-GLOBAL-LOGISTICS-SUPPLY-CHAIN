import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  MapPin,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Save,
  AlertTriangle,
  Menu
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onMenuToggle: () => void;
}

export function CustomerDeliveryPreferences({ onBack, onMenuToggle }: Props) {
  const [preferences, setPreferences] = useState({
    preferredLocation: 'home',
    deliveryPreference: 'deliver_to_me',
    deliveryWindow: 'afternoon',
    authorizedRecipient: '',
    specialInstructions: ''
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">DELIVERY PREFERENCES</h1>
            <p className="text-xs text-zinc-400">Configure your delivery settings</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Preferred Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            Preferred Delivery Location
          </h3>
          
          <div className="space-y-2">
            {[
              { value: 'home', label: 'Home' },
              { value: 'reception', label: 'Reception' },
              { value: 'security_desk', label: 'Security Desk' },
              { value: 'authorized', label: 'Authorized Location' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPreferences(prev => ({ ...prev, preferredLocation: option.value }))}
                className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${
                  preferences.preferredLocation === option.value
                    ? 'bg-cyan-500/20 border-cyan-500/30'
                    : 'bg-zinc-800/30 border-zinc-800/50 hover:border-zinc-700'
                }`}
              >
                <span className="text-sm text-white">{option.label}</span>
                {preferences.preferredLocation === option.value ? (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Delivery Preference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            Delivery Preference
          </h3>
          
          <div className="space-y-2">
            {[
              { value: 'deliver_to_me', label: 'Deliver to me' },
              { value: 'authorized_recipient', label: 'Authorized recipient' },
              { value: 'reception_security', label: 'Reception/Security' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPreferences(prev => ({ ...prev, deliveryPreference: option.value }))}
                className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${
                  preferences.deliveryPreference === option.value
                    ? 'bg-purple-500/20 border-purple-500/30'
                    : 'bg-zinc-800/30 border-zinc-800/50 hover:border-zinc-700'
                }`}
              >
                <span className="text-sm text-white">{option.label}</span>
                {preferences.deliveryPreference === option.value ? (
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Delivery Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-400" />
            Available Delivery Window
          </h3>
          
          <div className="space-y-2">
            {[
              { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
              { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
              { value: 'evening', label: 'Evening (5 PM - 9 PM)' },
              { value: 'custom', label: 'Custom window' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPreferences(prev => ({ ...prev, deliveryWindow: option.value }))}
                className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${
                  preferences.deliveryWindow === option.value
                    ? 'bg-green-500/20 border-green-500/30'
                    : 'bg-zinc-800/30 border-zinc-800/50 hover:border-zinc-700'
                }`}
              >
                <span className="text-sm text-white">{option.label}</span>
                {preferences.deliveryWindow === option.value ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Authorized Recipient */}
        {preferences.deliveryPreference === 'authorized_recipient' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-4">Authorized Recipient</h3>
            <input
              type="text"
              placeholder="Enter recipient name"
              value={preferences.authorizedRecipient}
              onChange={(e) => setPreferences(prev => ({ ...prev, authorizedRecipient: e.target.value }))}
              className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-800/50 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
          </motion.div>
        )}

        {/* Special Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Special Instructions (Optional)</h3>
          <textarea
            placeholder="Any additional delivery instructions..."
            value={preferences.specialInstructions}
            onChange={(e) => setPreferences(prev => ({ ...prev, specialInstructions: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-800/50 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 resize-none"
          />
        </motion.div>

        {/* Save Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-2xl text-base font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Saved Successfully
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Preferences
            </>
          )}
        </motion.button>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              Preference changes are validated against supplier policy, shipment constraints, and operational feasibility. Some requests may not be available depending on delivery status.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}