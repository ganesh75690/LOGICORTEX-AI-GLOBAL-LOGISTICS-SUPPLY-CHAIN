import { motion } from 'motion/react';
import { ArrowRight, MapPin, Clock, Shield, Zap } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onComplete: () => void;
}

export function GetStartedScreen({ onComplete }: Props) {
  const features = [
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track your deliveries in real-time with GPS precision'
    },
    {
      icon: Clock,
      title: 'Smart Scheduling',
      description: 'AI-powered route optimization for timely deliveries'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'End-to-end encryption for all your delivery data'
    },
    {
      icon: Zap,
      title: 'Quick Updates',
      description: 'Instant notifications and status updates'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col relative overflow-hidden">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      {/* Background grid animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-6 pt-12 pb-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-6 mx-auto"
        >
          <MapPin className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold text-center text-white mb-3"
        >
          Welcome to
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center mb-4"
        >
          Logicortex AI
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-zinc-400 text-center text-sm px-4"
        >
          The future of delivery management is here. Experience smarter logistics with AI-powered insights.
        </motion.p>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex-1 px-6 overflow-y-auto"
      >
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-4 border border-zinc-700/50"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="relative z-10 px-6 py-6"
      >
        <button
          onClick={onComplete}
          className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-zinc-500 text-xs text-center mt-4"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  );
}
