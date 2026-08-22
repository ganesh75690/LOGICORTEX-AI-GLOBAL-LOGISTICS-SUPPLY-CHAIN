import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Package, 
  Brain,
  Star,
  Smartphone,
  Mail,
  Clock,
  Calendar
} from 'lucide-react';
import { CompanySignup } from './auth/CompanySignup';

interface ProfessionalIntroProps {
  onProceed?: () => void;
}

export function ProfessionalIntro({ onProceed }: ProfessionalIntroProps) {
  const [showSignup, setShowSignup] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRegisterOrganization = () => {
    setShowSignup(true);
  };

  const handleSignupSuccess = (orgData: any) => {
    // Handle successful signup
    console.log('Organization created:', orgData);
    setShowSignup(false);
    onProceed?.();
  };

  const handleSignupBack = () => {
    setShowSignup(false);
  };

  // Show signup form if requested
  if (showSignup) {
    return (
      <CompanySignup 
        onBack={handleSignupBack}
        onSuccess={handleSignupSuccess}
      />
    );
  }

  const stats = [
    { value: "94.2%", label: "Operational Efficiency", trend: "+12%" },
    { value: "24/7", label: "Real-time Monitoring", trend: "100%" },
    { value: "99.9%", label: "Uptime Reliability", trend: "+0.3%" }
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Visibility",
      description: "Track shipments across multiple regions and time zones with real-time updates",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Leverage machine learning for predictive insights and demand forecasting",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Enterprise-grade security with end-to-end encryption and compliance",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times with optimized infrastructure and caching",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless coordination between teams with real-time communication tools",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Comprehensive reporting and analytics for data-driven decisions",
      color: "from-red-500 to-red-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Supply Chain Director",
      company: "Global Logistics Corp",
      content: "This platform transformed our operations. We've reduced delivery times by 40% and costs by 25%.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Operations Manager",
      company: "Smart Freight Solutions",
      content: "The AI forecasting is remarkably accurate. Our inventory optimization has never been better.",
      rating: 5
    },
    {
      name: "Emily Thompson",
      role: "CEO",
      company: "RapidShip International",
      content: "Best investment we've made. The ROI was evident within the first quarter.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] bg-clip-text text-transparent">
                LogiCortex AI Global System
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</a>
              
              {/* Date and Time Display */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(currentTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-mono">{formatTime(currentTime)}</span>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>

            <button 
              className="md:hidden p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white"
              title="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Mobile Date and Time */}
            <div className="md:hidden flex items-center gap-2 text-slate-300 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(currentTime)}</span>
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Enterprise-Grade Solution</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] bg-clip-text text-transparent">
                    Transform Your Supply Chain
                  </span>
                  <br />
                  <span className="text-white">with AI Intelligence</span>
                </h1>
                
                <p className="text-lg text-slate-300 leading-relaxed">
                  Experience the future of logistics management with our comprehensive platform that combines 
                  real-time tracking, predictive analytics, and automated workflows to optimize every aspect of your supply chain.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={onProceed}
                    className="px-6 py-3 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleRegisterOrganization}
                    className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Register Organization or Company
                  </button>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">{stat.trend}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - World Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/vecteezy_world-map-complete-with-all-countries_13836234.png"
                  alt="World Map - Global Supply Chain Coverage"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                
                {/* Animated Dots for Active Locations - Only in white land areas */}
                <div className="absolute top-1/3 left-1/4 w-3 h-3">
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                </div>
                
                <div className="absolute top-1/4 left-2/5 w-3 h-3">
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                </div>
                
                <div className="absolute top-1/2 left-3/5 w-3 h-3">
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                </div>
                
                <div className="absolute top-3/4 left-1/3 w-3 h-3">
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                </div>
                
                <div className="absolute top-1/2 left-2/3 w-3 h-3">
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Everything you need to manage your supply chain efficiently, from real-time tracking to predictive analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all hover:transform hover:scale-105">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] bg-clip-text text-transparent">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              See what our customers have to say about their experience with LogiCortex AI Global System
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                    <div className="text-slate-500 text-xs">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#00F5C4]/20 to-[#00D4A8]/20 rounded-2xl p-12 border border-[#00F5C4]/30 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of companies that trust LogiCortex AI Global System for their logistics operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onProceed}
                className="px-8 py-4 bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={handleRegisterOrganization}
                className="px-8 py-4 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Register Organization or Company
              </button>
              <button className="px-8 py-4 bg-slate-800/50 border border-slate-700/50 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] bg-clip-text text-transparent">
                  LogiCortex AI Global System
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Next-generation supply chain intelligence platform for modern logistics operations.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Real-time Tracking</li>
                <li>AI Analytics</li>
                <li>Warehouse Management</li>
                <li>Route Optimization</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 LogiCortex AI Global System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
