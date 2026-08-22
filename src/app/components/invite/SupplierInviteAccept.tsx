import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, CheckCircle, User, Building, MapPin, ArrowRight, Eye, EyeOff, Package } from 'lucide-react';

interface SupplierInviteAcceptProps {
  inviteData: {
    orgId: string;
    token: string;
    email?: string;
  };
  onAcceptSuccess?: (supplierData: any) => void;
}

export function SupplierInviteAccept({ inviteData, onAcceptSuccess }: SupplierInviteAcceptProps) {
  const [currentStep, setCurrentStep] = useState<'verify' | 'details' | 'otp' | 'success'>('verify');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: inviteData.email || '',
    phone: '',
    businessType: '',
    region: '',
    services: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [generatedSupplierId, setGeneratedSupplierId] = useState('');

  const generateSupplierId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `SUP-${randomNum}`;
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
      const supplierId = generateSupplierId();
      setGeneratedSupplierId(supplierId);
      setCurrentStep('success');
      
      const supplierData = {
        supplierId,
        orgId: inviteData.orgId,
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        businessType: formData.businessType
      };
      
      onAcceptSuccess?.(supplierData);
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
          <p className="text-slate-300 mb-8">Your supplier account has been created successfully</p>
          
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Supplier ID:</span>
                <span className="text-white font-mono">{generatedSupplierId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Organization:</span>
                <span className="text-white font-mono">{inviteData.orgId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Company:</span>
                <span className="text-white">{formData.companyName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Contact:</span>
                <span className="text-white">{formData.contactName}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => onAcceptSuccess?.({ supplierId: generatedSupplierId })}
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
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
              <p className="text-slate-300">We've sent a 6-digit code to {formData.email}</p>
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
                <Building className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
              <p className="text-slate-300">Fill in your company details to join {inviteData.orgId}</p>
            </div>
            
            <form onSubmit={handleSubmitDetails} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Acme Supplies"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Contact Name
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@company.com"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
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
                <label htmlFor="businessType" className="block text-sm font-medium text-slate-300 mb-2">Business Type</label>
                <select
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Service Provider">Service Provider</option>
                </select>
              </div>

              <div>
                <label htmlFor="services" className="block text-sm font-medium text-slate-300 mb-2">
                  <Package className="w-4 h-4 inline mr-2" />
                  Services
                </label>
                <input
                  id="services"
                  type="text"
                  value={formData.services}
                  onChange={(e) => setFormData(prev => ({ ...prev, services: e.target.value }))}
                  placeholder="Logistics, Warehousing, etc."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
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
              <Building className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Supplier Invitation</h2>
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
