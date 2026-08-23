import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Star, 
  CheckCircle, 
  Package, 
  Target, 
  Clock, 
  Award, 
  Moon, 
  Globe, 
  Lock, 
  Settings, 
  Edit,
  TrendingUp,
  Activity,
  Zap,
  Truck,
  Phone,
  Shield,
  BarChart3,
  Calendar,
  ChevronDown,
  Mail,
  MapPin,
  Fuel,
  Wrench,
  Heart,
  FileText,
  BadgeCheck,
  IdCard
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function DriverProfileScreen({ onMenuToggle, onBack }: Props) {
  const [darkMode, setDarkMode] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showSecuritySection, setShowSecuritySection] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'pt', name: 'Portuguese', native: 'Português' },
    { code: 'zh', name: 'Chinese', native: '中文' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'ar', name: 'Arabic', native: 'العربية' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ru', name: 'Russian', native: 'Русский' },
    { code: 'nl', name: 'Dutch', native: 'Nederlands' },
    { code: 'pl', name: 'Polish', native: 'Polski' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
    { code: 'th', name: 'Thai', native: 'ไทย' },
    { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
    { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'fa', name: 'Persian', native: 'فارسی' },
    { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
    { code: 'fi', name: 'Finnish', native: 'Suomi' },
    { code: 'sv', name: 'Swedish', native: 'Svenska' },
    { code: 'no', name: 'Norwegian', native: 'Norsk' },
    { code: 'da', name: 'Danish', native: 'Dansk' },
    { code: 'el', name: 'Greek', native: 'Ελληνικά' },
    { code: 'cs', name: 'Czech', native: 'Čeština' },
    { code: 'ro', name: 'Romanian', native: 'Română' },
    { code: 'hu', name: 'Hungarian', native: 'Magyar' },
    { code: 'uk', name: 'Ukrainian', native: 'Українська' },
    { code: 'he', name: 'Hebrew', native: 'עברית' },
    { code: 'fil', name: 'Filipino', native: 'Filipino' },
    { code: 'my', name: 'Burmese', native: 'မြန်မာ' },
    { code: 'km', name: 'Khmer', native: 'ខ្មែរ' },
    { code: 'lo', name: 'Lao', native: 'ລາວ' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली' },
    { code: 'si', name: 'Sinhala', native: 'සිංහල' },
    { code: 'am', name: 'Amharic', native: 'አማርኛ' },
    { code: 'ha', name: 'Hausa', native: 'Hausa' },
    { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
    { code: 'ig', name: 'Igbo', native: 'Igbo' },
    { code: 'zu', name: 'Zulu', native: 'isiZulu' },
    { code: 'xh', name: 'Xhosa', native: 'isiXhosa' },
    { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
  ];

  const currentLanguage = languages.find(l => l.code === selectedLanguage) || languages[0];

  // Sample data
  const performanceData = [
    { day: 'Mon', deliveries: 8, onTime: 88 },
    { day: 'Tue', deliveries: 6, onTime: 92 },
    { day: 'Wed', deliveries: 9, onTime: 78 },
    { day: 'Thu', deliveries: 7, onTime: 95 },
    { day: 'Fri', deliveries: 8, onTime: 94 },
    { day: 'Sat', deliveries: 4, onTime: 100 },
    { day: 'Sun', deliveries: 3, onTime: 100 },
  ];

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <Edit className="w-4 h-4 text-white rotate-90" />
              </button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-white">Driver Profile</h1>
              <p className="text-xs text-zinc-400">Performance & Settings</p>
            </div>
          </div>
          <button 
            onClick={() => setEditMode(!editMode)}
            className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            title="Edit profile"
          >
            <Settings className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">GK</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">Ganesh Kumar</h2>
                <p className="text-sm text-zinc-300 mb-2">Delivery Driver</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400 font-medium">Online</span>
                </div>
              </div>
            </div>
            
            {/* Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-zinc-800/50 rounded-full px-3 py-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-medium text-white">4.8 Rating</span>
              </div>
              <div className="flex items-center gap-1 bg-zinc-800/50 rounded-full px-3 py-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-xs font-medium text-white">Verified</span>
              </div>
            </div>
          </motion.div>

          {/* Performance Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-zinc-400">Today</span>
              </div>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-xs text-cyan-300">Deliveries</p>
            </div>
            
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-xs text-zinc-400">Performance</span>
              </div>
              <p className="text-2xl font-bold text-white">92%</p>
              <p className="text-xs text-green-300">On-Time</p>
            </div>
            
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-zinc-400">Average</span>
              </div>
              <p className="text-2xl font-bold text-white">28</p>
              <p className="text-xs text-purple-300">Minutes</p>
            </div>
            
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-zinc-400">Grade</span>
              </div>
              <p className="text-2xl font-bold text-white">A+</p>
              <p className="text-xs text-yellow-300">Efficiency</p>
            </div>
          </motion.div>

          {/* AI Insights Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/50 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">AI Insight</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  "You improved delivery efficiency by 18% today using optimized routes."
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">Performance trending up</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings / Controls Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-3">Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">Dark Mode</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-cyan-500' : 'bg-zinc-700'
                  }`}
                  aria-label={darkMode ? "Disable dark mode" : "Enable dark mode"}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">Language</span>
                </div>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40 h-8 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500/50">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{currentLanguage.native}</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border border-zinc-700 rounded-lg max-h-60 overflow-y-auto">
                    {languages.map((language) => (
                      <SelectItem 
                        key={language.code} 
                        value={language.code}
                        className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{language.name}</span>
                          <span className="text-zinc-400 text-xs ml-2">{language.native}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <button 
                  onClick={() => setShowSecuritySection(!showSecuritySection)}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm text-zinc-300">Security</span>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      showSecuritySection ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              </div>

              {/* Security Settings Section */}
              <AnimatePresence>
                {showSecuritySection && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 pt-3 border-t border-zinc-700"
                  >
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-zinc-400" />
                        <div>
                          <span className="text-sm text-zinc-300">Two-Factor Authentication</span>
                          <p className="text-xs text-zinc-500">Add extra security to your account</p>
                        </div>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          true ? 'bg-cyan-500' : 'bg-zinc-700'
                        }`}
                        aria-label="Toggle two-factor authentication"
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          true ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-zinc-400" />
                        <div>
                          <span className="text-sm text-zinc-300">Phone Verification</span>
                          <p className="text-xs text-zinc-500">Verify phone number for login</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-400 font-medium">Verified</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4 text-zinc-400" />
                        <div>
                          <span className="text-sm text-zinc-300">Login Alerts</span>
                          <p className="text-xs text-zinc-500">Get notified of new logins</p>
                        </div>
                      </div>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          true ? 'bg-cyan-500' : 'bg-zinc-700'
                        }`}
                        aria-label="Toggle login alerts"
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          true ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        <div>
                          <span className="text-sm text-zinc-300">Session Timeout</span>
                          <p className="text-xs text-zinc-500">Auto-logout after inactivity</p>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-400">30 min</span>
                    </div>

                    <button className="w-full py-2.5 mt-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-zinc-300 transition-colors flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4" />
                      Change Password
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Driver Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4"
          >
            <h3 className="text-sm font-semibold text-white mb-3">Driver Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Driver ID</span>
                <span className="text-sm text-zinc-300 font-medium">DRV-1023</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Phone</span>
                <span className="text-sm text-zinc-300 font-medium">+91 XXXXXXXX</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Email</span>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">ganesh.k@email.com</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Address</span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">New Delhi, India</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Joining Date</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">Jan 15, 2024</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Vehicle Type</span>
                <div className="flex items-center gap-2">
                  <Truck className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">Heavy Truck</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Vehicle Number</span>
                <span className="text-sm text-zinc-300 font-medium">DL-01-AB-1234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">License Number</span>
                <div className="flex items-center gap-2">
                  <IdCard className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">DL-2023-456789</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">License Status</span>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">License Expiry</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">Dec 2025</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Blood Group</span>
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span className="text-sm text-zinc-300 font-medium">O+</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Emergency Contact</span>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">+91-9876543210</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Vehicle Insurance</span>
                <div className="flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Valid</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Last Service</span>
                <div className="flex items-center gap-2">
                  <Wrench className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">Jun 2024</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Fuel Type</span>
                <div className="flex items-center gap-2">
                  <Fuel className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">Diesel</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Total Experience</span>
                <div className="flex items-center gap-2">
                  <Award className="w-3 h-3 text-zinc-400" />
                  <span className="text-sm text-zinc-300 font-medium">5 Years</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Background Check</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Verified</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Medical Fitness</span>
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Fit</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Weekly Performance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Weekly Performance</h3>
              <BarChart3 className="w-4 h-4 text-zinc-400" />
            </div>
            
            {/* Simple Chart */}
            <div className="space-y-2">
              {performanceData.map((data, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 w-8">{data.day}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-zinc-800 rounded-full h-2 relative overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ${
                          data.deliveries === 3 ? 'w-3/8' :
                          data.deliveries === 4 ? 'w-4/8' :
                          data.deliveries === 6 ? 'w-6/8' :
                          data.deliveries === 7 ? 'w-7/8' :
                          data.deliveries === 8 ? 'w-full' : 'w-5/8'
                        }`}
                      />
                    </div>
                    <span className="text-xs text-zinc-300 w-4 text-right">{data.deliveries}</span>
                  </div>
                  <div className={`w-8 text-right text-xs font-medium ${
                    data.onTime === 100 ? 'text-green-400' : 
                    data.onTime >= 90 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {data.onTime}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-3 pb-4"
          >
            <button 
              className="py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2"
              aria-label="Edit profile"
              title="Edit driver profile"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
            <button 
              className="py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold text-zinc-300 transition-colors"
              aria-label="Share profile"
              title="Share driver profile"
            >
              Share Profile
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
