import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  phone: string;
  onVerify: () => void;
  onBack: () => void;
  onNotYou?: () => void;
}

export function LoginOTPScreen({ phone, onVerify, onBack, onNotYou }: Props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== '')) {
      onVerify();
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="pt-12 px-6 pb-8">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center mb-8"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center"
        >
          <Shield className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white text-center mb-2"
        >
          Verify OTP
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 text-sm text-center"
        >
          Enter the 6-digit code sent to
          <br />
          <span className="text-cyan-400 font-medium">+91 {phone}</span>
          {onNotYou && (
            <>
              <br />
              <button 
                onClick={onNotYou}
                className="text-zinc-500 text-xs hover:text-cyan-400 transition-colors mt-1"
              >
                Not you?
              </button>
            </>
          )}
        </motion.p>
      </div>

      {/* OTP Input */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex-1 px-6"
      >
        <div className="flex gap-2 justify-center mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              aria-label={`OTP digit ${index + 1} of 6`}
              title={`Enter OTP digit ${index + 1}`}
              placeholder="-"
              className="w-12 h-14 bg-zinc-800 border-2 border-zinc-700 focus:border-cyan-500 rounded-xl text-white text-center text-xl font-semibold focus:outline-none transition-colors"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={!isComplete}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all"
        >
          Verify & Login
        </button>

        {/* Resend */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-400">
            Didn't receive the code?{' '}
            <button className="text-cyan-400 font-medium hover:underline">
              Resend OTP
            </button>
          </p>
        </div>

        {/* Timer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-zinc-500">
            Code expires in <span className="text-cyan-400 font-medium">02:00</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
