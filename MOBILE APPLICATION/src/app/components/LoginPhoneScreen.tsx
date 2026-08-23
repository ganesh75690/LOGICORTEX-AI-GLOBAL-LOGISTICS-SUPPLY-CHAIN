import { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, Phone, ChevronDown } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onSendOTP: (phone: string, username: string, rememberMe: boolean) => void;
  phoneNumber?: string;
  username?: string;
}

export function LoginPhoneScreen({ onSendOTP, phoneNumber, username }: Props) {
  const [phone, setPhone] = useState(phoneNumber || '');
  const [usernameValue, setUsernameValue] = useState(username || '');
  const [rememberMe, setRememberMe] = useState(!!phoneNumber);
  const [selectedCountry, setSelectedCountry] = useState('IN');

  const countries = [
    { code: 'IN', name: 'India', dialCode: '+91', maxLength: 10 },
    { code: 'US', name: 'United States', dialCode: '+1', maxLength: 10 },
    { code: 'UK', name: 'United Kingdom', dialCode: '+44', maxLength: 11 },
    { code: 'CA', name: 'Canada', dialCode: '+1', maxLength: 10 },
    { code: 'AU', name: 'Australia', dialCode: '+61', maxLength: 9 },
    { code: 'DE', name: 'Germany', dialCode: '+49', maxLength: 11 },
    { code: 'FR', name: 'France', dialCode: '+33', maxLength: 9 },
    { code: 'JP', name: 'Japan', dialCode: '+81', maxLength: 10 },
    { code: 'SG', name: 'Singapore', dialCode: '+65', maxLength: 8 },
    { code: 'AE', name: 'UAE', dialCode: '+971', maxLength: 9 },
    { code: 'CN', name: 'China', dialCode: '+86', maxLength: 11 },
    { code: 'IT', name: 'Italy', dialCode: '+39', maxLength: 10 },
    { code: 'ES', name: 'Spain', dialCode: '+34', maxLength: 9 },
    { code: 'BR', name: 'Brazil', dialCode: '+55', maxLength: 11 },
    { code: 'MX', name: 'Mexico', dialCode: '+52', maxLength: 10 },
    { code: 'KR', name: 'South Korea', dialCode: '+82', maxLength: 10 },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', maxLength: 9 },
    { code: 'SE', name: 'Sweden', dialCode: '+46', maxLength: 9 },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', maxLength: 9 },
    { code: 'BE', name: 'Belgium', dialCode: '+32', maxLength: 9 },
    { code: 'AT', name: 'Austria', dialCode: '+43', maxLength: 10 },
    { code: 'NO', name: 'Norway', dialCode: '+47', maxLength: 8 },
    { code: 'DK', name: 'Denmark', dialCode: '+45', maxLength: 8 },
    { code: 'FI', name: 'Finland', dialCode: '+358', maxLength: 10 },
    { code: 'PL', name: 'Poland', dialCode: '+48', maxLength: 9 },
    { code: 'CZ', name: 'Czech Republic', dialCode: '+420', maxLength: 9 },
    { code: 'GR', name: 'Greece', dialCode: '+30', maxLength: 10 },
    { code: 'PT', name: 'Portugal', dialCode: '+351', maxLength: 9 },
    { code: 'HU', name: 'Hungary', dialCode: '+36', maxLength: 9 },
    { code: 'IE', name: 'Ireland', dialCode: '+353', maxLength: 9 },
    { code: 'RU', name: 'Russia', dialCode: '+7', maxLength: 10 },
    { code: 'TR', name: 'Turkey', dialCode: '+90', maxLength: 10 },
    { code: 'IL', name: 'Israel', dialCode: '+972', maxLength: 9 },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', maxLength: 9 },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', maxLength: 9 },
    { code: 'TH', name: 'Thailand', dialCode: '+66', maxLength: 9 },
    { code: 'VN', name: 'Vietnam', dialCode: '+84', maxLength: 10 },
    { code: 'ID', name: 'Indonesia', dialCode: '+62', maxLength: 12 },
    { code: 'MY', name: 'Malaysia', dialCode: '+60', maxLength: 10 },
    { code: 'PH', name: 'Philippines', dialCode: '+63', maxLength: 10 },
    { code: 'NZ', name: 'New Zealand', dialCode: '+64', maxLength: 10 },
    { code: 'HK', name: 'Hong Kong', dialCode: '+852', maxLength: 8 },
    { code: 'TW', name: 'Taiwan', dialCode: '+886', maxLength: 9 },
    { code: 'AR', name: 'Argentina', dialCode: '+54', maxLength: 10 },
    { code: 'CL', name: 'Chile', dialCode: '+56', maxLength: 9 },
    { code: 'CO', name: 'Colombia', dialCode: '+57', maxLength: 10 },
    { code: 'PE', name: 'Peru', dialCode: '+51', maxLength: 9 },
    { code: 'VE', name: 'Venezuela', dialCode: '+58', maxLength: 10 },
    { code: 'NG', name: 'Nigeria', dialCode: '+234', maxLength: 10 },
    { code: 'EG', name: 'Egypt', dialCode: '+20', maxLength: 10 },
    { code: 'PK', name: 'Pakistan', dialCode: '+92', maxLength: 10 },
    { code: 'BD', name: 'Bangladesh', dialCode: '+880', maxLength: 10 },
    { code: 'LK', name: 'Sri Lanka', dialCode: '+94', maxLength: 9 },
    { code: 'NP', name: 'Nepal', dialCode: '+977', maxLength: 10 },
    { code: 'MM', name: 'Myanmar', dialCode: '+95', maxLength: 9 },
    { code: 'KH', name: 'Cambodia', dialCode: '+855', maxLength: 9 },
    { code: 'LA', name: 'Laos', dialCode: '+856', maxLength: 10 },
    { code: 'MO', name: 'Macau', dialCode: '+853', maxLength: 8 },
  ];

  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  const handleSubmit = () => {
    if (phone.length >= currentCountry.maxLength - 2) { // Allow some flexibility
      onSendOTP(`${currentCountry.dialCode}${phone}`, usernameValue, rememberMe);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      {/* Header */}
      <div className="pt-16 px-6 pb-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
        >
          <Truck className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Logicortex AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 text-sm"
        >
          Sign in to continue
        </motion.p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex-1 px-6"
      >
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Username <span className="text-zinc-500 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Phone Number Field */}
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Phone Number
          </label>

          <div className="flex gap-3 mb-4">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-28 px-3 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500/50">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{currentCountry.dialCode}</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border border-zinc-700 rounded-xl">
                {countries.map((country) => (
                  <SelectItem 
                    key={country.code} 
                    value={country.code}
                    className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{country.name}</span>
                      <span className="text-zinc-400 ml-2">{country.dialCode}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, currentCountry.maxLength))}
              placeholder={`Enter ${currentCountry.maxLength} digits`}
              className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3 mb-6">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="w-4 h-4 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
            />
            <label 
              htmlFor="remember" 
              className="text-sm text-zinc-300 cursor-pointer select-none"
            >
              Remember me
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={phone.length < currentCountry.maxLength - 2}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all"
          >
            Send OTP
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-cyan-300">
              We'll send you a one-time password (OTP) to verify your phone number. Select your country and enter your mobile number.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-zinc-500">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
