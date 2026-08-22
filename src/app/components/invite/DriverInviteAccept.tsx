import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Lock, CheckCircle, User, Truck, MapPin, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface DriverInviteAcceptProps {
  inviteData: {
    orgId: string;
    token: string;
    phone?: string;
  };
  onAcceptSuccess?: (driverData: any) => void;
}

export function DriverInviteAccept({ inviteData, onAcceptSuccess }: DriverInviteAcceptProps) {
  const [currentStep, setCurrentStep] = useState<'verify' | 'details' | 'otp' | 'success'>('verify');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: inviteData.phone || '',
    licenseNumber: '',
    vehicleType: '',
    region: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [generatedDriverId, setGeneratedDriverId] = useState('');

  const generateDriverId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `DRV-${randomNum}`;
  };

  const handleVerifyInvite = () => {
    // In real app, verify token with backend
    setCurrentStep('details');
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending OTP
    setCurrentStep('otp');
  };

  const handleOtpVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      const driverId = generateDriverId();
      setGeneratedDriverId(driverId);
      setCurrentStep('success');
      
      const driverData = {
        driverId,
        orgId: inviteData.orgId,
        name: formData.name,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber,
        vehicleType: formData.vehicleType
      };
      
      onAcceptSuccess?.(driverData);
    }
  };

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">Welcome aboard!</h2>
          <p className="text-slate-300 mb-8">Your driver account has been created successfully</p>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Driver ID:</span>
                <span className="text-white font-mono">{generatedDriverId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Organization:</span>
                <span className="text-white font-mono">{inviteData.orgId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Name:</span>
                <span className="text-white">{formData.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="text-white">{formData.vehicleType}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => onAcceptSuccess?.({ driverId: generatedDriverId })}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Continue to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verify Your Phone</h2>
              <p className="text-slate-300">We've sent a 6-digit code to {formData.phone}</p>
            </div>
            
            <form onSubmit={handleOtpVerification} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Verification Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Complete Registration
              </button>
              
              <button
                type="button"
                onClick={() => setCurrentStep('details')}
                className="w-full px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                Back
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 'details') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
              <p className="text-slate-300">Fill in your details to join {inviteData.orgId}</p>
            </div>
            
            <form onSubmit={handleSubmitDetails} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">License Number</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                  placeholder="DL-1234567890"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-slate-300 mb-2">Vehicle Type</label>
                <select
                  id="vehicleType"
                  value={formData.vehicleType}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleType: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Car">Car</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  placeholder="North Region"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Send Verification Code
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Driver Invitation</h2>
            <p className="text-slate-300">You've been invited to join {inviteData.orgId}</p>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Organization:</span>
                <span className="text-white">{inviteData.orgId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Token:</span>
                <span className="text-white font-mono">{inviteData.token}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleVerifyInvite}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Accept Invitation
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
