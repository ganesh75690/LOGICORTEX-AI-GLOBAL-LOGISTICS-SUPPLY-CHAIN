import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Mail, 
  Phone, 
  User, 
  Lock, 
  CheckCircle,
  Copy,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface CompanySignupProps {
  onBack?: () => void;
  onSuccess?: (orgData: any) => void;
}

export function CompanySignup({ onBack, onSuccess }: CompanySignupProps) {
  const [currentStep, setCurrentStep] = useState<'form' | 'verification-options' | 'verification' | 'success'>('form');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Company Info
    companyName: '',
    businessEmail: '',
    phoneNumber: '',
    country: '',
    industry: '',
    password: '',
    confirmPassword: '',
    
    // Admin Info
    adminName: '',
    adminEmail: '',
    adminPhone: ''
  });

  const [verificationData, setVerificationData] = useState({
    emailOtp: '',
    phoneOtp: ''
  });

  const [fieldVerification, setFieldVerification] = useState({
    emailVerified: false,
    phoneVerified: false
  });

  const [showFieldVerification, setShowFieldVerification] = useState({
    email: false,
    phone: false
  });

  const [verificationOptions, setVerificationOptions] = useState({
    verifyEmail: true,
    verifyPhone: true
  });

  const [generatedIds, setGeneratedIds] = useState({
    orgId: '',
    adminId: '',
    workspaceUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const industries = [
    'Logistics',
    'Retail', 
    'Manufacturing',
    '3PL',
    'E-commerce',
    'Healthcare',
    'Agriculture',
    'Construction',
    'Technology',
    'Other'
  ];

  const generateId = (prefix: string) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${randomNum}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Invalid email format';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.adminName.trim()) {
      newErrors.adminName = 'Admin name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Auto-fill admin email if not provided
    const finalFormData = {
      ...formData,
      adminEmail: formData.adminEmail || formData.businessEmail,
      adminPhone: formData.adminPhone || formData.phoneNumber
    };

    setFormData(finalFormData);
    
    // Generate IDs
    const orgId = generateId('ORG');
    const adminId = generateId('ADM');
    const workspaceUrl = `${finalFormData.companyName.toLowerCase().replace(/\s+/g, '-')}.app`;
    
    setGeneratedIds({ orgId, adminId, workspaceUrl });
    
    // Move to verification options step
    setCurrentStep('verification-options');
  };

  const handleVerifyField = (field: 'email' | 'phone') => {
    // In real app, send OTP here
    setShowFieldVerification(prev => ({ ...prev, [field]: true }));
  };

  const handleFieldVerification = (field: 'email' | 'phone', otp: string) => {
    // In real app, verify OTP here
    // For demo, accept any 6-digit code
    if (otp.length === 6) {
      setFieldVerification(prev => ({ ...prev, [`${field}Verified`]: true }));
      setShowFieldVerification(prev => ({ ...prev, [field]: false }));
      setVerificationData(prev => ({ ...prev, [`${field}Otp`]: '' }));
    }
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In real app, verify OTPs here
    // For demo, accept any 6-digit code
    let isValid = true;
    
    if (verificationOptions.verifyEmail && verificationData.emailOtp.length !== 6) {
      isValid = false;
    }
    
    if (verificationOptions.verifyPhone && verificationData.phoneOtp.length !== 6) {
      isValid = false;
    }
    
    // If only one method is selected, only check that one
    if (isValid) {
      setCurrentStep('success');
      onSuccess?.(generatedIds);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-500/30 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Organization Created</h2>
            <p className="text-slate-300 mb-6">Your supply chain workspace is ready</p>
            
            <div className="space-y-4 mb-8">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-sm text-slate-400">Organization ID</div>
                    <div className="text-white font-mono">{generatedIds.orgId}</div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(generatedIds.orgId)}
                    className="p-2 bg-slate-700/50 rounded hover:bg-slate-700 transition-colors"
                    aria-label="Copy Organization ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-sm text-slate-400">Admin ID</div>
                    <div className="text-white font-mono">{generatedIds.adminId}</div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(generatedIds.adminId)}
                    className="p-2 bg-slate-700/50 rounded hover:bg-slate-700 transition-colors"
                    aria-label="Copy Admin ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-sm text-slate-400">Workspace URL</div>
                    <div className="text-white font-mono text-sm">{generatedIds.workspaceUrl}</div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(generatedIds.workspaceUrl)}
                    className="p-2 bg-slate-700/50 rounded hover:bg-slate-700 transition-colors"
                    title="Copy workspace URL"
                    aria-label="Copy workspace URL to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => onSuccess?.(generatedIds)}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Continue to Setup
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => copyToClipboard(generatedIds.orgId)}
                className="w-full px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                Copy Org ID
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 'verification-options') {
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
              <h2 className="text-2xl font-bold text-white mb-2">Choose Verification Methods</h2>
              <p className="text-slate-300">Select how you'd like to verify your identity</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-medium text-white">Email Verification</div>
                      <div className="text-sm text-slate-400">{formData.businessEmail}</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={verificationOptions.verifyEmail}
                    onChange={(e) => setVerificationOptions(prev => ({ ...prev, verifyEmail: e.target.checked }))}
                    className="w-5 h-5 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </label>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-medium text-white">Phone Verification</div>
                      <div className="text-sm text-slate-400">{formData.phoneNumber}</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={verificationOptions.verifyPhone}
                    onChange={(e) => setVerificationOptions(prev => ({ ...prev, verifyPhone: e.target.checked }))}
                    className="w-5 h-5 text-green-500 bg-slate-700 border-slate-600 rounded focus:ring-green-500 focus:ring-2"
                  />
                </label>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setCurrentStep('verification')}
                disabled={!verificationOptions.verifyEmail && !verificationOptions.verifyPhone}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Send Verification Codes
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setCurrentStep('form')}
                className="w-full px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                Back to Form
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentStep === 'verification') {
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
              <h2 className="text-2xl font-bold text-white mb-2">Verify Your Identity</h2>
              <p className="text-slate-300">
                {verificationOptions.verifyEmail && verificationOptions.verifyPhone 
                  ? "We've sent verification codes to your email and phone"
                  : verificationOptions.verifyEmail 
                    ? "We've sent a verification code to your email"
                    : "We've sent a verification code to your phone"
                }
              </p>
            </div>
            
            <form onSubmit={handleVerification} className="space-y-6">
              {verificationOptions.verifyEmail && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationData.emailOtp}
                    onChange={(e) => setVerificationData(prev => ({ ...prev, emailOtp: e.target.value }))}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    required={verificationOptions.verifyEmail}
                  />
                </div>
              )}
              
              {verificationOptions.verifyPhone && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationData.phoneOtp}
                    onChange={(e) => setVerificationData(prev => ({ ...prev, phoneOtp: e.target.value }))}
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    required={verificationOptions.verifyPhone}
                  />
                </div>
              )}
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Verify & Create Organization
              </button>
              
              <button
                type="button"
                onClick={() => setCurrentStep('form')}
                className="w-full px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                Back to Form
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
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Your Organization</h2>
            <p className="text-slate-300">Set up your company's supply chain workspace</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Company Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Basic Company Info
                <span className="text-red-400 text-sm">*</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="Acme Logistics"
                  />
                  {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Business Email</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={formData.businessEmail}
                      onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="contact@company.com"
                    />
                    <button
                      type="button"
                      onClick={() => handleVerifyField('email')}
                      disabled={!formData.businessEmail || fieldVerification.emailVerified}
                      className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                    >
                      {fieldVerification.emailVerified ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </>
                      ) : (
                        'Verify'
                      )}
                    </button>
                  </div>
                  {errors.businessEmail && <p className="text-red-400 text-sm mt-1">{errors.businessEmail}</p>}
                  
                  {/* Email OTP Verification */}
                  {showFieldVerification.email && (
                    <div className="mt-2 p-3 bg-slate-900/50 border border-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-300">Enter 6-digit code sent to {formData.businessEmail}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={verificationData.emailOtp}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, emailOtp: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="000000"
                        />
                        <button
                          type="button"
                          onClick={() => handleFieldVerification('email', verificationData.emailOtp)}
                          disabled={verificationData.emailOtp.length !== 6}
                          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Verify
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowFieldVerification(prev => ({ ...prev, email: false }));
                            setVerificationData(prev => ({ ...prev, emailOtp: '' }));
                          }}
                          className="px-3 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700/70 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="+1 (555) 123-4567"
                    />
                    <button
                      type="button"
                      onClick={() => handleVerifyField('phone')}
                      disabled={!formData.phoneNumber || fieldVerification.phoneVerified}
                      className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                    >
                      {fieldVerification.phoneVerified ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </>
                      ) : (
                        'Verify'
                      )}
                    </button>
                  </div>
                  {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
                  
                  {/* Phone OTP Verification */}
                  {showFieldVerification.phone && (
                    <div className="mt-2 p-3 bg-slate-900/50 border border-slate-700/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">Enter 6-digit code sent to {formData.phoneNumber}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={verificationData.phoneOtp}
                          onChange={(e) => setVerificationData(prev => ({ ...prev, phoneOtp: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          placeholder="000000"
                        />
                        <button
                          type="button"
                          onClick={() => handleFieldVerification('phone', verificationData.phoneOtp)}
                          disabled={verificationData.phoneOtp.length !== 6}
                          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Verify
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowFieldVerification(prev => ({ ...prev, phone: false }));
                            setVerificationData(prev => ({ ...prev, phoneOtp: '' }));
                          }}
                          className="px-3 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700/70 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">Country</label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="CN">China</option>
                    <option value="SG">Singapore</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="BR">Brazil</option>
                    <option value="MX">Mexico</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  {errors.industry && <p className="text-red-400 text-sm mt-1">{errors.industry}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 pr-12"
                      placeholder="Min. 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 pr-12"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Admin Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Admin (Primary User) Info
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Admin Name</label>
                  <input
                    type="text"
                    value={formData.adminName}
                    onChange={(e) => handleInputChange('adminName', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="John Doe"
                  />
                  {errors.adminName && <p className="text-red-400 text-sm mt-1">{errors.adminName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Admin Email</label>
                  <input
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder={formData.businessEmail || "admin@company.com"}
                  />
                  <p className="text-xs text-slate-500 mt-1">Defaults to business email if empty</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Admin Phone</label>
                  <input
                    type="tel"
                    value={formData.adminPhone}
                    onChange={(e) => handleInputChange('adminPhone', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder={formData.phoneNumber || "+1 (555) 123-4567"}
                  />
                  <p className="text-xs text-slate-500 mt-1">Defaults to company phone if empty</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                  <input
                    type="text"
                    value="Admin"
                    disabled
                    title="User Role"
                    placeholder="Admin"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">Fixed role for primary user</p>
                </div>
              </div>
            </div>

            
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Create Organization
              </button>
              
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  Back
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
