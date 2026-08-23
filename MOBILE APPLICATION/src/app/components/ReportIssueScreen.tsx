import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Camera, 
  Mic, 
  MapPin, 
  AlertTriangle, 
  CheckCircle,
  Car,
  Package,
  Map,
  Wifi,
  Truck,
  User,
  AlertCircle,
  Brain,
  Clock
} from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface Props {
  onBack: () => void;
  onSubmit?: () => void;
}

interface IssueType {
  id: string;
  label: string;
  icon: any;
  color: string;
}

export function ReportIssueScreen({ onBack, onSubmit }: Props) {
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'urgent' | 'normal'>('normal');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const issueTypes: IssueType[] = [
    { id: 'traffic', label: 'Traffic issue', icon: Car, color: 'bg-red-500/20 text-red-400 border-red-500/50' },
    { id: 'package', label: 'Package problem', icon: Package, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
    { id: 'location', label: 'Wrong location', icon: Map, color: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
    { id: 'network', label: 'Network issue', icon: Wifi, color: 'bg-purple-500/20 text-purple-400 border-purple-500/50' },
    { id: 'vehicle', label: 'Vehicle problem', icon: Truck, color: 'bg-orange-500/20 text-orange-400 border-orange-500/50' },
    { id: 'customer', label: 'Customer not available', icon: User, color: 'bg-pink-500/20 text-pink-400 border-pink-500/50' },
    { id: 'other', label: 'Other', icon: AlertCircle, color: 'bg-gray-500/20 text-gray-400 border-gray-500/50' },
  ];

  const handleSubmit = () => {
    if (!selectedIssue || !description.trim()) return;
    
    // Generate ticket ID
    const newTicketId = `#${Math.floor(Math.random() * 90000) + 10000}`;
    setTicketId(newTicketId);
    setIsSubmitted(true);
    
    // Simulate submission
    setTimeout(() => {
      onSubmit?.();
    }, 2000);
  };

  const handlePhotoCapture = () => {
    fileInputRef.current?.click();
    setHasPhoto(true);
  };

  const handleVoiceNote = () => {
    setHasVoiceNote(true);
  };

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssue(issueId);
    // Pre-fill description based on issue type
    const issue = issueTypes.find(i => i.id === issueId);
    if (issue) {
      setDescription(`Issue with ${issue.label.toLowerCase()}...`);
    }
  };

  if (isSubmitted) {
    return (
      <div className="h-full bg-zinc-950 text-white flex flex-col">
        <MobileStatusBar />
        
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white text-center mb-2"
          >
            Report submitted successfully
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 text-center mb-4"
          >
            Admin will review shortly
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 mb-8"
          >
            <p className="text-sm text-zinc-400">Ticket ID</p>
            <p className="text-lg font-semibold text-cyan-400">{ticketId}</p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onBack}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-xl text-white font-semibold transition-all"
          >
            Back to Dashboard
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-6 py-4 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            aria-label="Go back"
            className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Report Issue</h1>
            <p className="text-sm text-zinc-400">Report any problem during delivery</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Quick Issue Type */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Issue Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {issueTypes.map((issue) => {
              const Icon = issue.icon;
              const isSelected = selectedIssue === issue.id;
              
              return (
                <button
                  key={issue.id}
                  onClick={() => handleIssueSelect(issue.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    isSelected 
                      ? issue.color + ' border-opacity-100' 
                      : 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-2 mx-auto" />
                  <p className="text-xs font-medium">{issue.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Suggestion */}
        {selectedIssue === 'traffic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">AI Suggestion</h4>
                <p className="text-xs text-zinc-300">
                  Similar issue detected: try alternate route B to avoid congestion
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 200))}
            placeholder="Describe the issue briefly..."
            className="w-full h-20 bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 resize-none focus:outline-none focus:border-cyan-500 transition-colors"
            maxLength={200}
          />
          <p className="text-xs text-zinc-500 mt-1">{description.length}/200</p>
        </div>

        {/* Attach Evidence */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Attach Evidence (Optional)</h2>
          <div className="flex gap-3">
            <button
              onClick={handlePhotoCapture}
              className={`flex-1 p-3 rounded-xl border transition-all ${
                hasPhoto 
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' 
                  : 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600 text-zinc-400'
              }`}
            >
              <Camera className="w-5 h-5 mb-1 mx-auto" />
              <p className="text-xs">{hasPhoto ? 'Photo Added' : 'Add Photo'}</p>
            </button>
            <button
              onClick={handleVoiceNote}
              className={`flex-1 p-3 rounded-xl border transition-all ${
                hasVoiceNote 
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' 
                  : 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600 text-zinc-400'
              }`}
            >
              <Mic className="w-5 h-5 mb-1 mx-auto" />
              <p className="text-xs">{hasVoiceNote ? 'Voice Added' : 'Voice Note'}</p>
            </button>
          </div>
        </div>

        {/* Auto Location */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Location</h2>
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <div className="flex-1">
                <p className="text-sm text-zinc-400">Current Location: Auto-detected</p>
                <p className="text-xs text-zinc-500">MG Road, Bangalore - 560001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Toggle */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Priority</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setPriority('urgent')}
              className={`flex-1 p-3 rounded-xl border transition-all ${
                priority === 'urgent'
                  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600 text-zinc-400'
              }`}
            >
              <AlertTriangle className="w-5 h-5 mb-1 mx-auto" />
              <p className="text-xs font-medium">🔴 Urgent</p>
            </button>
            <button
              onClick={() => setPriority('normal')}
              className={`flex-1 p-3 rounded-xl border transition-all ${
                priority === 'normal'
                  ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                  : 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600 text-zinc-400'
              }`}
            >
              <Clock className="w-5 h-5 mb-1 mx-auto" />
              <p className="text-xs font-medium">🟡 Normal</p>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedIssue || !description.trim()}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all"
        >
          Submit Report
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={() => setHasPhoto(true)}
        aria-label="Upload photo evidence"
        title="Upload photo evidence"
      />
    </div>
  );
}
