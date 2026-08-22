import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  Activity,
  Bell,
  Settings,
  Lock,
  TrendingUp,
  Info,
  Zap,
  Target,
  Users,
  Camera,
  Upload,
  FileText,
  BarChart3,
  X,
  Save,
  Edit,
  CheckCircle,
  AlertTriangle,
  Eye,
  Smartphone,
  Languages
} from 'lucide-react';

export function AdminProfile() {
  const [activeTab, setActiveTab] = useState('basic');
  const [darkMode, setDarkMode] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [selectedTimezone, setSelectedTimezone] = useState('Eastern Time (EST)');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for action dialogs
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showManageDocuments, setShowManageDocuments] = useState(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  const [showPerformanceReport, setShowPerformanceReport] = useState(false);
  
  // State for inline editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Davidson',
    jobTitle: 'Supply Chain Manager',
    company: 'LogiCortex Logistics International',
    email: 'john.davidson@smartchain.ai',
    phone: '+1 (555) 123-4567',
    location: 'North America Region'
  });

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: User },
    { id: 'access', name: 'Access & Role', icon: Shield },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'security', name: 'Security', icon: Lock }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-6">
          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={handleProfilePhotoClick}
              className="relative group"
              title="Change profile photo"
            >
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  JD
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </button>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-4 border-slate-900">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload profile photo"
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="text-3xl font-bold text-white bg-slate-700/50 border border-slate-600/30 rounded-lg px-3 py-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Full Name"
              />
            ) : (
              <h1 className="text-3xl font-bold text-white mb-2">{profileData.fullName}</h1>
            )}
            
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.jobTitle}
                onChange={(e) => setProfileData({...profileData, jobTitle: e.target.value})}
                className="text-lg text-slate-300 bg-slate-700/50 border border-slate-600/30 rounded-lg px-3 py-2 mb-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Job Title"
              />
            ) : (
              <p className="text-lg text-slate-300 mb-1">{profileData.jobTitle}</p>
            )}
            
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.company}
                onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                className="text-sm text-slate-400 bg-slate-700/50 border border-slate-600/30 rounded-lg px-3 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Company"
              />
            ) : (
              <p className="text-sm text-slate-400 mb-3">{profileData.company}</p>
            )}
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                {isEditingProfile ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="bg-slate-700/50 border border-slate-600/30 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Email"
                  />
                ) : (
                  <span>{profileData.email}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4" />
                {isEditingProfile ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="bg-slate-700/50 border border-slate-600/30 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Phone"
                  />
                ) : (
                  <span>{profileData.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="bg-slate-700/50 border border-slate-600/30 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Location"
                  />
                ) : (
                  <span>{profileData.location}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col gap-3">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-3 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-400">AI Score</span>
              </div>
              <div className="text-2xl font-bold text-white">94.2%</div>
              <div className="text-xs text-slate-400">Response Efficiency</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-3 border border-green-500/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400">Cost Saved</span>
              </div>
              <div className="text-2xl font-bold text-white">₹2.4M</div>
              <div className="text-xs text-slate-400">This Month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-2 border border-slate-700/50">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                <div className="space-y-4">
                  {/* Profile Photo Upload */}
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-400">Profile Photo</span>
                      <button
                        onClick={handleProfilePhotoClick}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                      >
                        <Upload className="w-3 h-3" />
                        Upload
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center text-white text-lg font-bold">
                          JD
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          {profilePhoto ? 'Photo uploaded' : 'No photo uploaded'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {profilePhoto ? 'Click to change photo' : 'Click upload to add photo'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Full Name</span>
                    <span className="text-white font-medium">John Davidson</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Designation</span>
                    <span className="text-white font-medium">Supply Chain Manager</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Email</span>
                    <span className="text-white font-medium">john.davidson@smartchain.ai</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Phone</span>
                    <span className="text-white font-medium">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Company</span>
                    <span className="text-white font-medium">LogiCortex Logistics</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Department</span>
                    <span className="text-white font-medium">Operations</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Region</span>
                    <span className="text-white font-medium">North America</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-400">Employee ID</span>
                    <span className="text-white font-medium">SC-2024-0842</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30 hover:from-blue-500/30 hover:to-blue-600/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Edit className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">{isEditingProfile ? '💾 Save Profile' : '✏️ Edit Profile'}</div>
                <div className="text-xs text-slate-400">{isEditingProfile ? 'Save changes' : 'Update personal info'}</div>
              </div>
            </button>

            <button
              onClick={() => setShowManageDocuments(true)}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg border border-green-500/30 hover:from-green-500/30 hover:to-green-600/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">📁 Manage Documents</div>
                <div className="text-xs text-slate-400">Upload & organize files</div>
              </div>
            </button>

            <button
              onClick={() => setShowSecuritySettings(true)}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30 hover:from-purple-500/30 hover:to-purple-600/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">🔒 Security Settings</div>
                <div className="text-xs text-slate-400">Manage access & privacy</div>
              </div>
            </button>

            <button
              onClick={() => setShowPerformanceReport(true)}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-500/30 hover:from-orange-500/30 hover:to-orange-600/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                <BarChart3 className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">📊 Performance Report</div>
                <div className="text-xs text-slate-400">View detailed analytics</div>
              </div>
            </button>
          </div>
        </div>

        {/* Dialogs */}
        <AnimatePresence>
          {/* Edit Profile Dialog */}
          {showEditProfile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowEditProfile(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">✏️ Edit Profile</h3>
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                    aria-label="Close dialog"
                    title="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="edit-fullname" className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                    <input
                      id="edit-fullname"
                      type="text"
                      defaultValue="John Davidson"
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                    <input
                      id="edit-email"
                      type="email"
                      defaultValue="john.davidson@smartchain.ai"
                      placeholder="Enter your email address"
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-phone" className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                    <input
                      id="edit-phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowEditProfile(false)}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setShowEditProfile(false)}
                      className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Manage Documents Dialog */}
          {showManageDocuments && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowManageDocuments(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">📁 Manage Documents</h3>
                  <button
                    onClick={() => setShowManageDocuments(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                    aria-label="Close documents dialog"
                    title="Close documents dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-600/30 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-slate-400 mb-4">PDF, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Choose Files
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Recent Documents</h4>
                    {[
                      { name: 'Contract_2024.pdf', size: '2.4 MB', date: '2024-04-20' },
                      { name: 'Supplier_List.xlsx', size: '1.2 MB', date: '2024-04-18' },
                      { name: 'Compliance_Report.pdf', size: '3.8 MB', date: '2024-04-15' }
                    ].map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <div>
                            <p className="text-white text-sm">{doc.name}</p>
                            <p className="text-xs text-slate-400">{doc.size} • {doc.date}</p>
                          </div>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Security Settings Dialog */}
          {showSecuritySettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowSecuritySettings(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">🔒 Security Settings</h3>
                  <button
                    onClick={() => setShowSecuritySettings(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                    aria-label="Close security settings dialog"
                    title="Close security settings dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-400">Add an extra layer of security</p>
                    </div>
                    <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Change Password</p>
                      <p className="text-xs text-slate-400">Update your account password</p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                      Update
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Active Sessions</p>
                      <p className="text-xs text-slate-400">Manage your logged-in devices</p>
                    </div>
                    <button className="px-3 py-1 bg-slate-600 text-white rounded-lg text-sm hover:bg-slate-500 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Performance Report Dialog */}
          {showPerformanceReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPerformanceReport(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">📊 Performance Report</h3>
                  <button
                    onClick={() => setShowPerformanceReport(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                    aria-label="Close performance report dialog"
                    title="Close performance report dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-blue-400">Efficiency</span>
                    </div>
                    <div className="text-2xl font-bold text-white">94.2%</div>
                    <div className="text-xs text-slate-400">+3.2% from last month</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">On-Time Delivery</span>
                    </div>
                    <div className="text-2xl font-bold text-white">98.7%</div>
                    <div className="text-xs text-slate-400">+1.1% from last month</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-purple-400">Team Performance</span>
                    </div>
                    <div className="text-2xl font-bold text-white">92.8%</div>
                    <div className="text-xs text-slate-400">+2.5% from last month</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg p-4 border border-orange-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span className="text-xs text-orange-400">AI Utilization</span>
                    </div>
                    <div className="text-2xl font-bold text-white">87.3%</div>
                    <div className="text-xs text-slate-400">+5.7% from last month</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Detailed Metrics</h4>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <div className="space-y-3">
                      {[
                        { metric: 'Cost Savings', value: '₹2.4M', change: '+12%', positive: true },
                        { metric: 'Route Optimization', value: '89%', change: '+4%', positive: true },
                        { metric: 'Inventory Turnover', value: '6.2x', change: '+0.8x', positive: true },
                        { metric: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', positive: true }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-slate-400">{item.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.value}</span>
                            <span className={`text-xs px-2 py-1 rounded ${item.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {item.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Access & Role Tab */}
        {activeTab === 'access' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Super Admin</h3>
                <p className="text-sm text-slate-400">Full system access with elevated privileges</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Permissions Overview</h4>
                <div className="space-y-2">
                  {[
                    { icon: Eye, label: 'View All Routes & Warehouses', granted: true },
                    { icon: Edit, label: 'Edit Route Configurations', granted: true },
                    { icon: CheckCircle, label: 'Approve Route Changes', granted: true },
                    { icon: AlertTriangle, label: 'Manage Critical Alerts', granted: true },
                    { icon: Users, label: 'Manage User Accounts', granted: true },
                    { icon: Settings, label: 'System Configuration', granted: true }
                  ].map((permission, idx) => {
                    const Icon = permission.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="text-white flex-1">{permission.label}</span>
                        {permission.granted ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Session Information</h4>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Last Login</span>
                    </div>
                    <div className="text-white font-medium">Today, 9:42 AM EST</div>
                    <div className="text-xs text-slate-500">Chrome on Windows • New York, US</div>
                  </div>
                  
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Active Sessions</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">Web Browser</span>
                        <span className="text-xs text-green-400">Active now</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">Mobile App</span>
                        <span className="text-xs text-slate-500">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-blue-400">Decisions Taken</span>
                </div>
                <div className="text-2xl font-bold text-white">247</div>
                <div className="text-xs text-slate-400">This month</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">Alerts Resolved</span>
                </div>
                <div className="text-2xl font-bold text-white">189</div>
                <div className="text-xs text-slate-400">This month</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400">Disruptions Handled</span>
                </div>
                <div className="text-2xl font-bold text-white">34</div>
                <div className="text-xs text-slate-400">This month</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-purple-400">Active Routes</span>
                </div>
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-xs text-slate-400">Under management</div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Recent Actions</h4>
              <div className="space-y-3">
                {[
                  { action: 'Approved route R004 reroute', time: '10 minutes ago', type: 'success' },
                  { action: 'Resolved warehouse capacity alert', time: '25 minutes ago', type: 'warning' },
                  { action: 'Updated delivery schedule for Order #2847', time: '1 hour ago', type: 'info' },
                  { action: 'Handled traffic disruption on Route R002', time: '2 hours ago', type: 'critical' },
                  { action: 'Modified inventory thresholds', time: '3 hours ago', type: 'info' }
                ].map((action, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      action.type === 'critical' ? 'bg-red-400' :
                      action.type === 'warning' ? 'bg-yellow-400' :
                      action.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                    }`} />
                    <span className="text-white flex-1">{action.action}</span>
                    <span className="text-xs text-slate-500">{action.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-white font-medium mb-4">Alert Preferences</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-white font-medium">Disruption Alerts</div>
                      <div className="text-xs text-slate-400">Route delays, blockages, accidents</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      emailAlerts ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                    aria-label={emailAlerts ? 'Disable disruption alerts' : 'Enable disruption alerts'}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      emailAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-white font-medium">Delay Notifications</div>
                      <div className="text-xs text-slate-400">Traffic, weather, schedule changes</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSmsAlerts(!smsAlerts)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      smsAlerts ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                    aria-label={smsAlerts ? 'Disable delay notifications' : 'Enable delay notifications'}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      smsAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">Shortage Alerts</div>
                      <div className="text-xs text-slate-400">Inventory, warehouse capacity issues</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setInAppAlerts(!inAppAlerts)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      inAppAlerts ? 'bg-green-500' : 'bg-slate-600'
                    }`}
                    aria-label={inAppAlerts ? 'Disable shortage alerts' : 'Enable shortage alerts'}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      inAppAlerts ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Notification Channels</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">Email</span>
                  </div>
                  <p className="text-xs text-slate-400">john.davidson@smartchain.ai</p>
                  <div className="mt-2 text-xs text-green-400">Active</div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-white font-medium">SMS</span>
                  </div>
                  <p className="text-xs text-slate-400">+1 (555) 123-4567</p>
                  <div className="mt-2 text-xs text-slate-500">Disabled</div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-4 h-4 text-green-400" />
                    <span className="text-white font-medium">In-App</span>
                  </div>
                  <p className="text-xs text-slate-400">Real-time notifications</p>
                  <div className="mt-2 text-xs text-green-400">Active</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Alert Severity Filter</h4>
              <div className="flex gap-3">
                {['Critical Only', 'High & Critical', 'All Alerts'].map((filter) => (
                  <button
                    key={filter}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      filter === 'High & Critical'
                        ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                        : 'bg-slate-700/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-4">Dashboard Settings</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[#00F5C4]" />
                        <span className="text-white font-medium">Layout Preference</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {['Compact', 'Standard', 'Expanded'].map((layout) => (
                        <button
                          key={layout}
                          className={`px-3 py-1 rounded text-sm transition-all ${
                            layout === 'Standard'
                              ? 'bg-[#00F5C4]/20 text-[#00F5C4] border border-[#00F5C4]/30'
                              : 'bg-slate-600/50 text-slate-400 hover:text-white'
                          }`}
                        >
                          {layout}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#00F5C4]" />
                        <span className="text-white font-medium">Default Map View</span>
                      </div>
                    </div>
                    <select
                      className="w-full bg-slate-600/50 text-white rounded-lg px-3 py-2 border border-slate-600/30 focus:outline-none focus:border-[#00F5C4]"
                      aria-label="Default Map View"
                    >
                      <option>North America</option>
                      <option>Europe</option>
                      <option>Asia Pacific</option>
                      <option>Global View</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Appearance</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600" />
                      <div>
                        <div className="text-white font-medium">Dark Mode</div>
                        <div className="text-xs text-slate-400">Reduced eye strain</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        darkMode ? 'bg-[#00F5C4]' : 'bg-slate-600'
                      }`}
                      aria-label={darkMode ? 'Disable dark mode' : 'Enable dark mode'}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <label htmlFor="language-select" className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Languages className="w-4 h-4 text-[#00F5C4]" />
                        <span className="text-white font-medium">Language</span>
                      </div>
                    </label>
                    <select
                      id="language-select"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full bg-slate-600/50 text-white rounded-lg px-3 py-2 border border-slate-600/30 focus:outline-none focus:border-[#00F5C4]"
                    >
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish (ES)</option>
                      <option>Spanish (MX)</option>
                      <option>French (FR)</option>
                      <option>French (CA)</option>
                      <option>German (DE)</option>
                      <option>Italian (IT)</option>
                      <option>Portuguese (BR)</option>
                      <option>Portuguese (PT)</option>
                      <option>Dutch (NL)</option>
                      <option>Chinese (Simplified)</option>
                      <option>Chinese (Traditional)</option>
                      <option>Japanese (JP)</option>
                      <option>Korean (KO)</option>
                      <option>Arabic (SA)</option>
                      <option>Hindi (IN)</option>
                      <option>Russian (RU)</option>
                      <option>Turkish (TR)</option>
                      <option>Polish (PL)</option>
                      <option>Swedish (SE)</option>
                      <option>Norwegian (NO)</option>
                      <option>Danish (DK)</option>
                      <option>Finnish (FI)</option>
                      <option>Greek (GR)</option>
                      <option>Thai (TH)</option>
                      <option>Vietnamese (VN)</option>
                      <option>Indonesian (ID)</option>
                      <option>Malay (MY)</option>
                      <option>Tagalog (PH)</option>
                    </select>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <label htmlFor="timezone-select" className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#00F5C4]" />
                        <span className="text-white font-medium">Timezone</span>
                      </div>
                    </label>
                    <select
                      id="timezone-select"
                      value={selectedTimezone}
                      onChange={(e) => setSelectedTimezone(e.target.value)}
                      className="w-full bg-slate-600/50 text-white rounded-lg px-3 py-2 border border-slate-600/30 focus:outline-none focus:border-[#00F5C4]"
                    >
                      <option>Eastern Time (EST)</option>
                      <option>Central Time (CST)</option>
                      <option>Pacific Time (PST)</option>
                      <option>UTC</option>
                      <option>GMT</option>
                      <option>Central European Time (CET)</option>
                      <option>Eastern European Time (EET)</option>
                      <option>India Standard Time (IST)</option>
                      <option>China Standard Time (CST)</option>
                      <option>Japan Standard Time (JST)</option>
                      <option>Australian Eastern Time (AET)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-slate-900 rounded-lg font-semibold hover:from-[#00D4A8] hover:to-[#00C0A0] transition-all">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-4">Authentication</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="text-white font-medium">Password</div>
                          <div className="text-xs text-slate-400">Last changed 30 days ago</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-white font-medium">Two-Factor Authentication</div>
                          <div className="text-xs text-slate-400">Extra security layer</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          twoFactorEnabled ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                        aria-label={twoFactorEnabled ? 'Disable two-factor authentication' : 'Enable two-factor authentication'}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Active Sessions</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-sm font-medium">Chrome on Windows</div>
                        <div className="text-xs text-slate-400">New York, US • Current session</div>
                      </div>
                      <span className="text-xs text-green-400">Active now</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-sm font-medium">Mobile App</div>
                        <div className="text-xs text-slate-400">iPhone 14 • Los Angeles, US</div>
                      </div>
                      <button className="text-xs text-red-400 hover:text-red-300">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Recent Login History</h4>
              <div className="space-y-2">
                {[
                  { time: 'Today, 9:42 AM', device: 'Chrome on Windows', location: 'New York, US', status: 'success' },
                  { time: 'Yesterday, 6:15 PM', device: 'Mobile App', location: 'Los Angeles, US', status: 'success' },
                  { time: 'Dec 20, 2:30 PM', device: 'Chrome on Mac', location: 'Chicago, US', status: 'success' },
                  { time: 'Dec 19, 11:45 AM', device: 'Firefox on Windows', location: 'Boston, US', status: 'failed' }
                ].map((login, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        login.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <div className="text-white text-sm">{login.time}</div>
                        <div className="text-xs text-slate-400">{login.device} • {login.location}</div>
                      </div>
                    </div>
                    {login.status === 'failed' && (
                      <span className="text-xs text-red-400">Failed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
