import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Shield, Brain, Zap, Globe, BarChart3 } from 'lucide-react';

export function WelcomePage({ onProceed }: { onProceed: () => void }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleProceed = () => {
    if (isChecked) {
      onProceed();
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-start justify-center p-4 overflow-y-auto relative">
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
          className="absolute w-96 h-96 bg-gradient-to-r from-[#00F5C4]/10 to-[#00D4A8]/10 rounded-full blur-3xl"
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
          className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full py-8 flex flex-col justify-start relative z-10 px-4"
      >
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 lg:p-12 border border-slate-700/50 shadow-2xl w-full max-w-none">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Welcome to <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5C4] to-[#00D4A8]"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >Smart Supply Chain</motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-slate-400 max-w-2xl mx-auto"
            >
              Your intelligent supply chain management platform is ready. Experience the power of AI-driven logistics and real-time analytics.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4"
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-white font-semibold mb-2">Global Tracking</h3>
              <p className="text-slate-400 text-sm">Real-time shipment tracking across the globe</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4"
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-white font-semibold mb-2">AI Intelligence</h3>
              <p className="text-slate-400 text-sm">Smart recommendations and predictions</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl"
            >
              <motion.div
                animate={{ 
                  opacity: [1, 0.5, 1],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
              <p className="text-slate-400 text-sm">Optimized routes and instant updates</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl"
            >
              <motion.div
                animate={{ 
                  rotateY: [0, 180, 360],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4"
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-white font-semibold mb-2">Analytics</h3>
              <p className="text-slate-400 text-sm">Comprehensive performance insights</p>
            </motion.div>
          </motion.div>

          {/* Platform Services Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 mb-6"
          >
            <h4 className="text-white font-semibold mb-4 text-sm">Platform Services & Features</h4>
            <ul className="text-slate-400 text-xs space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#00F5C4] mt-0.5">•</span>
                <span>Real-time tracking and monitoring of shipments and inventory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F5C4] mt-0.5">•</span>
                <span>AI-powered analytics and predictive insights for logistics optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F5C4] mt-0.5">•</span>
                <span>Secure data transmission with end-to-end encryption</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00F5C4] mt-0.5">•</span>
                <span>Compliance with international supply chain regulations</span>
              </li>
            </ul>
          </motion.div>

          {/* Terms and Checkbox */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30 mb-6"
          >
            <div className="flex items-start gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChecked(!isChecked)}
                className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                  isChecked 
                    ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] border-[#00F5C4]' 
                    : 'border-slate-500 hover:border-slate-400'
                }`}
              >
                {isChecked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
              <div className="flex-1">
                <p className="text-slate-300 text-sm leading-relaxed">
                  I acknowledge that I have read and agree to the <span className="text-[#00F5C4] hover:text-[#00D4A8] cursor-pointer underline">Terms of Service</span> and <span className="text-[#00F5C4] hover:text-[#00D4A8] cursor-pointer underline">Privacy Policy</span>. 
                  I understand that this platform contains confidential supply chain data and I will use it responsibly.
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  By checking this box, you confirm that you have the necessary authorization to access this supply chain management system.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Proceed Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center mb-4"
          >
            <motion.button
              whileHover={{ scale: isChecked ? 1.05 : 1 }}
              whileTap={{ scale: isChecked ? 0.95 : 1 }}
              onClick={handleProceed}
              disabled={!isChecked}
              className={`px-10 py-4 rounded-xl font-semibold text-lg transition-all flex items-center gap-3 mx-auto ${
                isChecked
                  ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-white hover:from-[#00D4A8] hover:to-[#00F5C4] shadow-lg hover:shadow-xl transform'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
              }`}
            >
              <motion.div
                animate={{ 
                  x: isChecked ? [0, 5, 0] : 0,
                }}
                transition={{ 
                  duration: 1,
                  repeat: isChecked ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                Proceed to Dashboard
              </motion.div>
              <motion.div
                animate={{ 
                  x: isChecked ? [0, 10, 0] : 0,
                }}
                transition={{ 
                  duration: 1,
                  repeat: isChecked ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
            {!isChecked && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="text-slate-500 text-sm mt-3"
              >
                Please check the box above to continue
              </motion.p>
            )}
          </motion.div>

          {/* Security Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Shield className="w-4 h-4 text-slate-500" />
            </motion.div>
            <p className="text-slate-500 text-xs">Secured with enterprise-grade encryption</p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 mb-8">
          <p className="text-slate-600 text-sm">
            © 2024 Smart Supply Chain Platform. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
