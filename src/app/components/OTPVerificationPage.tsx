import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowLeft, Shield, CheckCircle, Clock, Phone, AlertTriangle, MapPin, Smartphone, Eye, Activity, TrendingUp, Lock, Wifi, WifiOff, Globe } from 'lucide-react';

interface OTPVerificationPageProps {
  email: string;
  contactNumber?: string;
  role: string;
  userId: string;
  name: string;
  organizationId?: string;
  isNewDevice?: boolean;
  isDifferentLocation?: boolean;
  isUnusualTime?: boolean;
  recentFailedLogins?: number;
  loginFrequency?: number;
  ipWhitelistEnabled?: boolean;
  allowedIPs?: string[];
  currentIP?: string;
  lastLogin?: {
    timestamp: string;
    location: string;
    device?: string;
  };
  onOTPVerified: (userData: { userId: string; email: string; role: string; name: string; contactNumber?: string }) => void;
  onBackToLogin: () => void;
  onAdminAlert?: (alert: { type: string; message: string; userId: string; organizationId?: string }) => void;
}

export function OTPVerificationPage({ 
  email, 
  contactNumber,
  role, 
  userId, 
  name, 
  organizationId,
  isNewDevice = false,
  isDifferentLocation = false,
  isUnusualTime = false,
  recentFailedLogins = 0,
  loginFrequency = 0,
  ipWhitelistEnabled = false,
  allowedIPs = [],
  currentIP = '',
  lastLogin,
  onOTPVerified, 
  onBackToLogin,
  onAdminAlert
}: OTPVerificationPageProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isResending, setIsResending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  const [phoneNumber, setPhoneNumber] = useState(contactNumber || '');
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [riskScore, setRiskScore] = useState(0);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [isIPAllowed, setIsIPAllowed] = useState(true);
  const [detectedIP, setDetectedIP] = useState('');
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  
  // Mock last login data for demonstration
  const mockLastLogin = lastLogin || {
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    location: 'Mumbai',
    device: 'Desktop - Chrome'
  };

  useEffect(() => {
    setMounted(true);
    
    // Detect device, location, and IP for security
    detectDeviceInfo();
    detectLocation();
    detectIPAddress();
    
    // Calculate risk score
    calculateRiskScore();
    
    // Generate and send OTP (simulation)
    sendOTP();

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateRiskScore = () => {
    let score = 0;
    const factors: string[] = [];
    
    // Device risk (30 points)
    if (isNewDevice) {
      score += 30;
      factors.push('New device detected');
    }
    
    // Location risk (25 points)
    if (isDifferentLocation) {
      score += 25;
      factors.push('Unusual location');
    }
    
    // Time risk (20 points)
    if (isUnusualTime) {
      score += 20;
      factors.push('Unusual login time');
    }
    
    // Failed login attempts risk (15 points per attempt, max 30)
    const failedLoginRisk = Math.min(recentFailedLogins * 15, 30);
    if (failedLoginRisk > 0) {
      score += failedLoginRisk;
      factors.push(`${recentFailedLogins} recent failed attempts`);
    }
    
    // Login frequency risk (high frequency = suspicious)
    if (loginFrequency > 10) {
      score += 15;
      factors.push('High login frequency');
    }
    
    // Role-based risk (admin accounts get higher base risk)
    if (role.toLowerCase().includes('admin') || role.toLowerCase().includes('manager')) {
      score += 10;
      factors.push('Privileged account');
    }
    
    // IP whitelist risk (40 points if not whitelisted)
    if (ipWhitelistEnabled && !isIPAllowed) {
      score += 40;
      factors.push('IP not in whitelist');
    }
    
    setRiskScore(Math.min(score, 100)); // Cap at 100
    setRiskFactors(factors);
  };

  const getRiskLevel = () => {
    if (riskScore >= 70) return { level: 'HIGH', color: 'red', icon: AlertTriangle };
    if (riskScore >= 40) return { level: 'MEDIUM', color: 'amber', icon: TrendingUp };
    return { level: 'LOW', color: 'green', icon: Shield };
  };

  const getVerificationRequirements = () => {
    const riskLevel = getRiskLevel();
    const requirements = {
      otpLength: 6,
      requireBothMethods: false,
      extraVerification: false,
      timeLimit: 300
    };
    
    if (riskLevel.level === 'HIGH') {
      requirements.otpLength = 8;
      requirements.requireBothMethods = true;
      requirements.extraVerification = true;
      requirements.timeLimit = 180; // 3 minutes
    } else if (riskLevel.level === 'MEDIUM') {
      requirements.otpLength = 6;
      requirements.requireBothMethods = false;
      requirements.extraVerification = false;
      requirements.timeLimit = 240; // 4 minutes
    }
    
    return requirements;
  };

  const detectDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const deviceType = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
    const browser = /Chrome/.test(userAgent) ? 'Chrome' : /Firefox/.test(userAgent) ? 'Firefox' : /Safari/.test(userAgent) ? 'Safari' : 'Unknown';
    
    setDeviceInfo(`${deviceType} - ${browser} on ${platform}`);
  };

  const detectLocation = async () => {
    // Simulate location detection (in real app, use geolocation API)
    const cities = ['New York', 'San Francisco', 'London', 'Tokyo', 'Mumbai'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setCurrentLocation(randomCity);
  };

  const detectIPAddress = async () => {
    // Simulate IP detection (in real app, use actual IP detection service)
    const simulatedIP = currentIP || '192.168.1.100';
    setDetectedIP(simulatedIP);
    
    // Check if IP is whitelisted
    if (ipWhitelistEnabled && allowedIPs.length > 0) {
      const allowed = allowedIPs.some(allowedIP => {
        // Support both exact matches and CIDR ranges
        if (allowedIP.includes('/')) {
          // CIDR range matching (simplified for demo)
          return simulatedIP.startsWith(allowedIP.split('/')[0]);
        }
        return allowedIP === simulatedIP;
      });
      setIsIPAllowed(allowed);
    }
  };

  const triggerAdminAlert = (type: string, message: string) => {
    if (onAdminAlert) {
      onAdminAlert({
        type,
        message,
        userId,
        organizationId
      });
    }
  };

  const formatLastLoginTime = (timestamp: string) => {
    // Format timestamp to readable format (e.g., "Today 9:43 AM")
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const loginDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (loginDate.getTime() === today.getTime()) {
      return `Today ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else if (loginDate.getTime() === today.getTime() - 86400000) {
      return `Yesterday ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + 
             date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
  };

  const detectSuspiciousLogin = () => {
    const loginData = lastLogin || mockLastLogin;
    if (!loginData) return false;
    
    // Check for unusual time patterns
    const lastLoginTime = new Date(loginData.timestamp);
    const currentTime = new Date();
    const hourDiff = Math.abs(currentTime.getHours() - lastLoginTime.getHours());
    
    // Flag as suspicious if login is from very different time (>6 hours difference)
    if (hourDiff > 6) {
      return true;
    }
    
    // Check for location changes
    if (loginData.location !== currentLocation && isDifferentLocation) {
      return true;
    }
    
    return false;
  };

  const sendOTP = () => {
    // Simulate sending OTP to email/mobile
    const destination = verificationMethod === 'email' ? email : phoneNumber;
    console.log(`OTP sent to ${verificationMethod}: ${destination}`);
    // In real implementation, this would make an API call
  };

  const validatePhoneNumber = (phone: string) => {
    // Basic phone number validation (10 digits for demo)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const handlePhoneVerification = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setShowPhoneInput(false);
    setTimeLeft(300); // Reset timer
    sendOTP();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
    
    setError('');
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').map(char => char).slice(0, 6);
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const otpString = otp.join('');
    
    // Validate OTP
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      setIsLoading(false);
      return;
    }

    // Simulate OTP verification
    setTimeout(() => {
      // For demo purposes, accept any 6-digit code
      if (otpString.length === 6) {
        // Reset failed attempts on successful verification
        setFailedAttempts(0);
        onOTPVerified({
          userId,
          email,
          role,
          name,
          contactNumber: verificationMethod === 'phone' ? phoneNumber : undefined
        });
      } else {
        // Track failed attempts
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        
        setError('Invalid OTP. Please try again.');
        
        // Trigger admin alert after 3 failed attempts
        if (newFailedAttempts >= 3) {
          triggerAdminAlert(
            'SECURITY_BREACH',
            `User ${name} (${email}) has failed OTP verification 3 times. Potential security breach detected.`
          );
          setError('Maximum attempts reached. Admin has been notified.');
        }
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleResendOTP = () => {
    setIsResending(true);
    setTimeLeft(300); // Reset timer
    sendOTP();
    
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full h-full max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-12 shadow-2xl min-h-[80vh] flex flex-col"
        >
          {/* Back Button */}
          <button
            onClick={onBackToLogin}
            className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-[#00F5C4]/20"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">Verify Your Identity</h2>
            
            {/* Last Login Info Bar */}
            <div className="mb-4 p-3 bg-slate-800/30 border border-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4 text-[#00F5C4]" />
                  <span>Last login: Today 7:43 PM from Mumbai</span>
                  <span className="text-slate-500">• Desktop - Chrome</span>
                  <span className="text-slate-500">• IP: {detectedIP || '192.168.1.100'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSecurityDialog(true)}
                  className="text-xs text-red-400 hover:text-red-300 font-medium bg-red-500/10 px-2 py-1 rounded border border-red-500/30 transition-colors"
                >
                  Not You?
                </button>
              </div>
            </div>
            
            {/* Risk Score Display */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#00F5C4]" />
                    <span className="text-sm font-medium text-slate-300">Risk Assessment</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    getRiskLevel().color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    getRiskLevel().color === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {getRiskLevel().level} RISK
                  </div>
                </div>
                
                {/* Risk Score Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Risk Score</span>
                    <span>{riskScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${riskScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full ${
                        riskScore >= 70 ? 'bg-red-500' :
                        riskScore >= 40 ? 'bg-amber-500' :
                        'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Risk Factors */}
                {riskFactors.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-medium">Detected Factors:</p>
                    {riskFactors.map((factor, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        className="text-xs text-slate-500 flex items-center gap-1"
                      >
                        <span className="w-1 h-1 bg-[#00F5C4] rounded-full"></span>
                        {factor}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
            
            {/* Security Status Indicators */}
            <div className="mb-6 space-y-3">
              {/* IP Whitelist Status */}
              {ipWhitelistEnabled && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 p-3 ${
                    isIPAllowed 
                      ? 'bg-green-500/10 border border-green-500/30' 
                      : 'bg-red-500/10 border border-red-500/30'
                  } rounded-lg`}
                >
                  {isIPAllowed ? (
                    <Wifi className="w-5 h-5 text-green-400" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-400" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      isIPAllowed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isIPAllowed ? 'Network Access Approved' : 'Network Access Restricted'}
                    </p>
                    <p className={`text-xs ${
                      isIPAllowed ? 'text-green-300/70' : 'text-red-300/70'
                    }`}>
                      IP: {detectedIP} • {isIPAllowed ? 'Office network' : 'External network'}
                    </p>
                  </div>
                </motion.div>
              )}
              
              {/* New Device Alert */}
              {isNewDevice && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg"
                >
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-400">New Device Detected</p>
                    <p className="text-xs text-amber-300/70">{deviceInfo}</p>
                  </div>
                </motion.div>
              )}
              
              {/* Different Location Alert */}
              {isDifferentLocation && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                >
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-400">Unusual Location</p>
                    <p className="text-xs text-blue-300/70">Login from {currentLocation}</p>
                  </div>
                </motion.div>
              )}
              
              {/* Failed Attempts Warning */}
              {failedAttempts > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400">Failed Attempts</p>
                    <p className="text-xs text-red-300/70">{failedAttempts}/3 attempts remaining</p>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Verification Method Selection */}
            <div className="mb-6">
              <div className="inline-flex rounded-lg bg-slate-800/30 p-1 gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setVerificationMethod('email');
                    setShowPhoneInput(false);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    verificationMethod === 'email'
                      ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVerificationMethod('phone');
                    if (!contactNumber) {
                      setShowPhoneInput(true);
                    }
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    verificationMethod === 'phone'
                      ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </button>
              </div>
            </div>
            
            {/* Phone Number Input Modal */}
            {showPhoneInput && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/30"
              >
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Enter your phone number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="1234567890"
                    className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700/30 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent"
                    maxLength={10}
                  />
                  <button
                    type="button"
                    onClick={handlePhoneVerification}
                    className="px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-medium rounded-lg hover:shadow-lg hover:shadow-[#00F5C4]/20 transition-all"
                  >
                    Send OTP
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
              </motion.div>
            )}
            
            {!showPhoneInput && (
              <p className="text-slate-400">
                We've sent a 6-digit code to<br />
                <span className="text-[#00F5C4] font-medium">
                  {verificationMethod === 'email' ? email : phoneNumber}
                </span>
              </p>
            )}
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hide OTP form when phone input is shown */}
            {!showPhoneInput && (
              <>
                {/* OTP Input Fields */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Enter 6-digit code
                  </label>
                  <div className="flex justify-center gap-1">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-14 text-center text-xl font-semibold bg-slate-800/50 border border-slate-700/30 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent transition-all"
                        maxLength={1}
                        autoFocus={index === 0}
                        placeholder={`Digit ${index + 1}`}
                        title={`OTP digit ${index + 1}`}
                        aria-label={`OTP digit ${index + 1} of 6`}
                      />
                    ))}
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>Code expires in {formatTime(timeLeft)}</span>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading || otp.join('').length !== 6}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-semibold rounded-xl shadow-lg shadow-[#00F5C4]/20 hover:shadow-xl hover:shadow-[#00F5C4]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                      />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Verify Code
                    </>
                  )}
                </motion.button>

                {/* Resend Link */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={timeLeft > 0 || isResending}
                    className="text-sm text-[#00F5C4] hover:text-[#00D4A8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResending ? (
                      'Sending...'
                    ) : timeLeft > 0 ? (
                      `Resend code in ${formatTime(timeLeft)}`
                    ) : (
                      "Didn't receive code? Resend"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Enhanced Security Notice with IP Whitelist Info */}
          <div className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-[#00F5C4] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-300 font-medium mb-1">
                  {getRiskLevel().level === 'HIGH' ? 'Enhanced Verification Required' :
                   getRiskLevel().level === 'MEDIUM' ? 'Standard Security Active' :
                   'Basic Security Active'}
                </p>
                <p className="text-xs text-slate-400 mb-2">
                  {getRiskLevel().level === 'HIGH' ? '8-digit code required. Valid for 3 minutes. Multi-factor verification enabled.' :
                   getRiskLevel().level === 'MEDIUM' ? '6-digit code required. Valid for 4 minutes.' :
                   '6-digit code required. Valid for 5 minutes.'}
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-[#00F5C4] rounded-full"></span>
                    Risk-based authentication
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-[#00F5C4] rounded-full"></span>
                    Real-time threat detection
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-[#00F5C4] rounded-full"></span>
                    Adaptive security measures
                  </p>
                  {ipWhitelistEnabled && (
                    <p className={`text-xs flex items-center gap-1 ${
                      isIPAllowed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <span className={`w-1 h-1 ${
                        isIPAllowed ? 'bg-green-400' : 'bg-red-400'
                      } rounded-full`}></span>
                      {isIPAllowed ? 'Office network access verified' : 'External network detected'}
                    </p>
                  )}
                  {getRiskLevel().level === 'HIGH' && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                      Additional verification steps required
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
      
      {/* Security Dialog */}
      <AnimatePresence>
        {showSecurityDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowSecurityDialog(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Security Alert</h3>
                  <p className="text-sm text-slate-400">Was this you?</p>
                </div>
              </div>
              
              <div className="mb-6 p-3 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-300 mb-2">Recent login activity:</p>
                <div className="space-y-1 text-xs text-slate-400">
                  <p>• Time: Today 7:43 PM</p>
                  <p>• Location: Mumbai</p>
                  <p>• Device: Desktop - Chrome</p>
                  <p>• IP: {detectedIP || '192.168.1.100'}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    triggerAdminAlert(
                      'UNAUTHORIZED_ACCESS_ATTEMPT',
                      `User reported unauthorized login activity. Last login from Mumbai (${detectedIP || '192.168.1.100'}) was not them.`
                    );
                    setShowSecurityDialog(false);
                    setError('Security report submitted. Admin has been notified.');
                  }}
                  className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                >
                  Report This Activity
                </button>
                
                <button
                  onClick={() => {
                    setShowSecurityDialog(false);
                    onBackToLogin();
                  }}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                >
                  Back to Login
                </button>
                
                <button
                  onClick={() => setShowSecurityDialog(false)}
                  className="w-full py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
