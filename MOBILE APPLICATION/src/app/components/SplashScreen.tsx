import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Truck } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: Props) {
  useEffect(() => {
    console.log('SplashScreen: Starting timer');
    const timer = setTimeout(() => {
      console.log('SplashScreen: Timer completed, calling onComplete');
      onComplete();
    }, 1000); // Reduced to 1 second for faster testing

    return () => {
      console.log('SplashScreen: Cleaning up timer');
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col relative overflow-hidden">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      <div className="flex-1 flex flex-col items-center justify-center">
      {/* Background grid animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="mb-8 relative"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center relative">
          <Truck className="w-12 h-12 text-white" />
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600"
            animate={{
              opacity: [0.5, 0, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* App Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mb-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Logicortex AI
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-zinc-400 text-sm mb-12"
      >
        Predict. Adapt. Deliver.
      </motion.p>

      {/* Loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Version */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-zinc-600 text-xs"
      >
        Version 1.0.0
      </motion.p>
      </div>
    </div>
  );
}
