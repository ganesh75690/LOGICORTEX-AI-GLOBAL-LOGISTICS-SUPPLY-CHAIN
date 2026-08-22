import { useState, useEffect } from 'react';
import { Brain, Eye, EyeOff, LogIn, Shield, Zap, Users, Truck, Store, ArrowRight, Mail, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UserRole {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
}

const userRoles: UserRole[] = [
  {
    id: 'admin',
    name: 'Administrator',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    description: 'Full system access and control'
  },
  {
    id: 'driver',
    name: 'Driver',
    icon: Truck,
    color: 'from-emerald-500 to-emerald-600',
    description: 'Route management and navigation'
  },
  {
    id: 'supplier',
    name: 'Supplier',
    icon: Store,
    color: 'from-violet-500 to-violet-600',
    description: 'Inventory and demand management'
  }
];

export function LoginPage({ onLogin }: { onLogin: (userData: { userId: string; email: string; role: string; name: string }) => void }) {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(userRoles[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetMethod, setResetMethod] = useState<'email' | 'phone' | ''>('');
  const [resetContact, setResetContact] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    setMounted(true);
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
    setUserCaptcha('');
    setCaptchaError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate CAPTCHA
    if (userCaptcha !== captchaText) {
      setCaptchaError('Incorrect CAPTCHA. Please try again.');
      generateCaptcha();
      setIsLoading(false);
      return;
    }

    // Simulate authentication
    setTimeout(() => {
      // For demo purposes, accept any userId/email/password
      if (userId && email && password) {
        // Call the onLogin prop with user data (this will redirect to OTP page)
        onLogin({
          userId,
          email,
          role: selectedRole.id,
          name: email.split('@')[0]
        });
      } else {
        setError('Please enter user ID, email and password');
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setResetMethod('');
    setResetContact('');
    setResetSent(false);
  };

  const handleResetSubmit = () => {
    // In real app, send reset link here
    setResetSent(true);
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
    setResetMethod('');
    setResetContact('');
    setResetSent(false);
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
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-pink-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center shadow-2xl shadow-[#00F5C4]/20">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">LogiCortex AI</h1>
              <p className="text-lg text-slate-400">Supply Chain Intelligence Platform</p>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Revolutionary Capabilities</h2>
            
            <div className="space-y-4">
              {[
                {
                  icon: Brain,
                  title: 'Digital Twin Engine',
                  description: 'Real-time virtual replica of your entire supply chain',
                  color: 'from-blue-500 to-purple-600'
                },
                {
                  icon: Zap,
                  title: 'Multi-Agent AI',
                  description: '6 specialized AI agents making 4,270+ decisions daily',
                  color: 'from-emerald-500 to-cyan-600'
                },
                {
                  icon: Users,
                  title: 'Self-Learning System',
                  description: 'Continuous improvement from 78% to 94% accuracy',
                  color: 'from-violet-500 to-pink-600'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:bg-slate-800/50 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Cost Saved', value: '12.5%', color: 'text-green-400' },
              { label: 'Delay Reduction', value: '34%', color: 'text-blue-400' },
              { label: 'Efficiency', value: '94.2%', color: 'text-purple-400' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl">
            {/* Login Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-400">Sign in to access your supply chain dashboard</p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">Select Your Role</label>
              <div className="grid grid-cols-3 gap-3">
                {userRoles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole.id === role.id;
                  return (
                    <motion.button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] text-black border-transparent shadow-lg shadow-[#00F5C4]/20'
                          : 'bg-slate-800/50 text-slate-400 border-slate-700/30 hover:bg-slate-800/70'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-xs font-medium">{role.name}</div>
                      {isSelected && (
                        <motion.div
                          layoutId="selectedRole"
                          className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500 mt-2">{selectedRole.description}</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User ID */}
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-slate-300 mb-2">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent transition-all"
                  placeholder="Enter your user ID"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent transition-all"
                  placeholder="admin@smartchain.ai"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-700/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* CAPTCHA */}
              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-slate-300 mb-2">
                  CAPTCHA
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="captcha"
                      type="text"
                      value={userCaptcha}
                      onChange={(e) => setUserCaptcha(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent transition-all"
                      placeholder="Enter CAPTCHA"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-4 py-3 bg-slate-700/50 border border-slate-600/30 rounded-xl select-none">
                      <span className="text-lg font-mono text-white tracking-wider">{captchaText}</span>
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-3 bg-slate-700/50 border border-slate-600/30 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/70 transition-all"
                      title="Refresh CAPTCHA"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
                {captchaError && (
                  <p className="mt-2 text-sm text-red-400">{captchaError}</p>
                )}
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

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-slate-800 border-slate-700 rounded text-[#00F5C4] focus:ring-[#00F5C4] focus:ring-2"
                  />
                  <span className="text-sm text-slate-400">Remember me</span>
                </label>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-sm text-[#00F5C4] hover:text-[#00D4A8] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-semibold rounded-xl shadow-lg shadow-[#00F5C4]/20 hover:shadow-xl hover:shadow-[#00F5C4]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

          </div>
        </motion.div>
      </div>

      {/* Forgot Password Dialog */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800 max-w-md w-full"
            >
              {/* Dialog Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Reset Password</h3>
                <button
                  onClick={handleCloseForgotPassword}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!resetSent ? (
                <>
                  {/* Reset Method Selection */}
                  {!resetMethod && (
                    <div className="space-y-4">
                      <p className="text-slate-300 mb-4">Choose how you'd like to reset your password:</p>
                      
                      <div className="space-y-3">
                        <button
                          onClick={() => setResetMethod('email')}
                          className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-left hover:bg-slate-800/70 transition-colors flex items-center gap-3"
                        >
                          <Mail className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="font-medium text-white">Email</div>
                            <div className="text-sm text-slate-400">Send reset link to your email</div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => setResetMethod('phone')}
                          className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-left hover:bg-slate-800/70 transition-colors flex items-center gap-3"
                        >
                          <Phone className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="font-medium text-white">Phone Number</div>
                            <div className="text-sm text-slate-400">Send reset link via SMS</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Contact Input */}
                  {resetMethod && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          {resetMethod === 'email' ? 'Email Address' : 'Phone Number'}
                        </label>
                        <input
                          type={resetMethod === 'email' ? 'email' : 'tel'}
                          value={resetContact}
                          onChange={(e) => setResetContact(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00F5C4] focus:border-transparent"
                          placeholder={resetMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                          required
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => setResetMethod('')}
                          className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 text-white rounded-lg hover:bg-slate-800/70 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleResetSubmit}
                          disabled={!resetContact}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Send Reset Link
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Success Message */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Reset Link Sent!</h4>
                  <p className="text-slate-300 mb-6">
                    We've sent a password reset link to your {resetMethod === 'email' ? 'email address' : 'phone number'}.
                    Please check your {resetMethod === 'email' ? 'inbox' : 'messages'} and follow the instructions.
                  </p>
                  <button
                    onClick={handleCloseForgotPassword}
                    className="px-6 py-3 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Got it
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
