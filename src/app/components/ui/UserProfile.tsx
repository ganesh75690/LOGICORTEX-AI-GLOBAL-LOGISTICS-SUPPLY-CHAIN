import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, Bell, LogOut, X, Camera, Mail, Phone, Building2, MapPin, Shield, CreditCard, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const UserProfile = ({ isOpen, onClose, onLogout }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'notifications' | 'security'>('profile');
  const [userPhoto, setUserPhoto] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=admin');

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Security', icon: Shield },
  ];

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">User Profile</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-700">
                <div className="relative">
                  <img
                    src={userPhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-[#00F5C4] object-cover"
                  />
                  <label className="absolute bottom-0 right-0 bg-[#00F5C4] p-2 rounded-full cursor-pointer hover:bg-[#00D4A8] transition-colors">
                    <Camera className="w-4 h-4 text-slate-900" />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Admin User</h3>
                  <p className="text-slate-400">admin@logicortex.ai</p>
                  <p className="text-sm text-[#00F5C4] mt-1">LogiCortex Logistics Ltd.</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#00F5C4] text-slate-900'
                          : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">Email</span>
                        </div>
                        <div className="text-white">admin@logicortex.ai</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">Phone</span>
                        </div>
                        <div className="text-white">+1 (555) 123-4567</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">Company</span>
                        </div>
                        <div className="text-white">LogiCortex Logistics Ltd.</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">Location</span>
                        </div>
                        <div className="text-white">Mumbai, India</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Email Notifications</span>
                        <div className="w-12 h-6 bg-[#00F5C4] rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">Receive email updates for important events</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Push Notifications</span>
                        <div className="w-12 h-6 bg-[#00F5C4] rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">Receive push notifications for real-time alerts</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Dark Mode</span>
                        <div className="w-12 h-6 bg-[#00F5C4] rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">Use dark theme for the interface</p>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-3">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-white font-medium">Shipment Delivered</div>
                          <div className="text-sm text-slate-400">Your shipment INT-2024-IND-JPN-001 has been delivered</div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">2 hours ago</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        <div>
                          <div className="text-white font-medium">Route Delay Alert</div>
                          <div className="text-sm text-slate-400">China-USA route experiencing 2-hour delays</div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">5 hours ago</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-white font-medium">Customs Clearance</div>
                          <div className="text-sm text-slate-400">Your shipment cleared Japanese customs</div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">1 day ago</span>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-slate-400" />
                        <span className="text-white font-medium">Password</span>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">Last changed 30 days ago</div>
                      <button className="text-sm text-[#00F5C4] hover:text-[#00D4A8] transition-colors">
                        Change Password
                      </button>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        <span className="text-white font-medium">Two-Factor Authentication</span>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">Enabled via authenticator app</div>
                      <button className="text-sm text-[#00F5C4] hover:text-[#00D4A8] transition-colors">
                        Manage 2FA
                      </button>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-white font-medium">Session Timeout</span>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">Auto-logout after 30 minutes of inactivity</div>
                      <button className="text-sm text-[#00F5C4] hover:text-[#00D4A8] transition-colors">
                        Change Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={onLogout}
                  className="flex-1 px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;