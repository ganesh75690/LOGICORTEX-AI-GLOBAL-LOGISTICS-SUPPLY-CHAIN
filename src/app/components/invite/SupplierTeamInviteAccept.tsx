import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, CheckCircle, User, Building, MapPin, ArrowRight, Eye, EyeOff, Users, Crown, Settings, Wrench } from 'lucide-react';

interface SupplierTeamInviteAcceptProps {
  inviteData: {
    orgId: string;
    orgName: string;
    token: string;
    email?: string;
    role: 'manager' | 'operator' | 'warehouse_staff';
  };
  onAcceptSuccess?: (teamMemberData: any) => void;
}

export function SupplierTeamInviteAccept({ inviteData, onAcceptSuccess }: SupplierTeamInviteAcceptProps) {
  const [currentStep, setCurrentStep] = useState<'verify' | 'details' | 'otp' | 'success'>('verify');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: inviteData.email || '',
    phone: '',
    department: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [generatedMemberId, setGeneratedMemberId] = useState('');

  const generateMemberId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `SUP-USER-${randomNum}`;
  };

  const handleVerifyInvite = () => {
    // In real app, verify token with backend
    setCurrentStep('details');
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Simulate sending OTP
    setCurrentStep('otp');
  };

  const handleOtpVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      const memberId = generateMemberId();
      setGeneratedMemberId(memberId);
      setCurrentStep('success');
      
      if (onAcceptSuccess) {
        onAcceptSuccess({
          memberId,
          ...formData,
          role: inviteData.role,
          orgId: inviteData.orgId,
          orgName: inviteData.orgName
        });
      }
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'manager': return <Crown className="w-6 h-6" />;
      case 'operator': return <Settings className="w-6 h-6" />;
      case 'warehouse_staff': return <Wrench className="w-6 h-6" />;
      default: return <User className="w-6 h-6" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager': return 'from-purple-500 to-purple-600';
      case 'operator': return 'from-blue-500 to-blue-600';
      case 'warehouse_staff': return 'from-green-500 to-green-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'manager': return 'Manager';
      case 'operator': return 'Operator';
      case 'warehouse_staff': return 'Warehouse Staff';
      default: return 'Team Member';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Invitation</h1>
          <p className="text-slate-400">Join your supplier team</p>
        </div>

        {/* Step 1: Verify Invite */}
        {currentStep === 'verify' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
          >
            <div className="text-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${getRoleColor(inviteData.role)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {getRoleIcon(inviteData.role)}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">You're Invited!</h2>
              <p className="text-slate-300 mb-4">You've been invited to join as a team member</p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6 mb-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-sm text-slate-400">Organization</div>
                  <div className="text-white font-medium">{inviteData.orgName}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-sm text-slate-400">Role</div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border bg-gradient-to-r ${getRoleColor(inviteData.role)} text-white border-current/20`}>
                    {getRoleIcon(inviteData.role)}
                    <span className="capitalize">{getRoleTitle(inviteData.role)}</span>
                  </div>
                </div>
              </div>

              {inviteData.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-slate-400">Email</div>
                    <div className="text-white font-medium">{inviteData.email}</div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleVerifyInvite}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Accept Invitation
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Details Form */}
        {currentStep === 'details' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Complete Your Profile</h2>
            
            <form onSubmit={handleSubmitDetails} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john.doe@company.com"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-2">
                  Department
                </label>
                <input
                  id="department"
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Operations, Logistics, Warehouse"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Create a strong password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 3: OTP Verification */}
        {currentStep === 'otp' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
              <p className="text-slate-300">We've sent a 6-digit code to {formData.email}</p>
            </div>

            <form onSubmit={handleOtpVerification} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-slate-300 mb-2">
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Verify Code
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Resend Code
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {currentStep === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-8 border border-green-500/30 text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Welcome Aboard!</h2>
            <p className="text-slate-300 mb-6">Your account has been created successfully</p>

            <div className="bg-slate-800/50 rounded-lg p-6 mb-6 border border-slate-700/50">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Building className="w-5 h-5 text-blue-400" />
                <span className="text-slate-400">Organization</span>
              </div>
              <div className="text-white font-medium mb-4">{inviteData.orgName}</div>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <User className="w-5 h-5 text-green-400" />
                <span className="text-slate-400">Your Role</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border bg-gradient-to-r ${getRoleColor(inviteData.role)} text-white border-current/20 mb-4`}>
                {getRoleIcon(inviteData.role)}
                <span className="capitalize">{getRoleTitle(inviteData.role)}</span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-slate-400">Member ID</span>
              </div>
              <div className="text-green-400 font-mono font-bold">{generatedMemberId}</div>
            </div>

            <button
              onClick={() => window.location.href = '/supplier-dashboard'}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
