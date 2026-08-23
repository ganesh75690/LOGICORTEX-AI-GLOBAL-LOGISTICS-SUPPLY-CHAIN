import { Send, Bot, User, MapPin, Clock, TrendingUp, Zap, ArrowLeft, Menu, AlertTriangle, Navigation, Activity, Mic, MicOff } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MobileStatusBar } from './MobileStatusBar';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  suggestions?: string[];
  confidence?: number;
  actionTaken?: string;
}

interface QuickAction {
  icon: any;
  label: string;
  action: string;
  description: string;
  color: string;
}

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function EnhancedAIChatScreen({ onMenuToggle, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your AI co-pilot. I can help you optimize routes, predict delays, and make autonomous decisions to save time and fuel.',
      timestamp: '2:10 PM',
      suggestions: [
        'What\'s the fastest route?',
        'Any delays ahead?',
        'Show performance today',
        'Optimize my route',
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const quickActions: QuickAction[] = [
    { 
      icon: AlertTriangle, 
      label: 'Risk Analysis', 
      action: 'Analyze risks for my remaining route',
      description: 'Check traffic, weather, customer availability',
      color: 'from-red-500 to-orange-500'
    },
    { 
      icon: Navigation, 
      label: 'Route Status', 
      action: 'What\'s my current route status?',
      description: 'Live ETA and progress',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      icon: Clock, 
      label: 'ETA Check', 
      action: 'When will I finish today?',
      description: 'Completion time prediction',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: TrendingUp, 
      label: 'Performance', 
      action: 'How am I performing today?',
      description: 'Efficiency and on-time metrics',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Zap, 
      label: 'Optimize', 
      action: 'Optimize my remaining stops',
      description: 'AI-powered route optimization',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      icon: Activity, 
      label: 'Live Updates', 
      action: 'Any real-time updates?',
      description: 'Current conditions and changes',
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;

    setIsProcessing(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI processing
    setTimeout(() => {
      let aiResponse = '';
      let suggestions: string[] | undefined;
      let confidence: number | undefined;
      let actionTaken: string | undefined;

      const lowerContent = content.toLowerCase();

      if (lowerContent.includes('risk') || lowerContent.includes('delay') || lowerContent.includes('traffic')) {
        aiResponse = 'I\'ve analyzed your remaining route and identified 2 potential risks:\n\n🚨 **High Traffic Zone**: Stop #3 area (87% confidence)\n   - Expected delay: +12 minutes\n   - Alternative route available\n\n⚠️ **Customer Availability**: Stop #4 (68% confidence)\n   - Historical data suggests possible absence\n   - Recommendation: Call ahead\n\nI\'ve already prepared an optimized alternative that saves 8 minutes if traffic worsens.';
        confidence = 85;
        suggestions = ['Accept auto-reroute', 'Show alternative routes', 'Call customer #4'];
        actionTaken = 'Risk assessment completed';
      } else if (lowerContent.includes('route') || lowerContent.includes('status')) {
        aiResponse = 'Your current route status:\n\n📍 **Current Stop**: #2 - Michael Chen (12 min ETA)\n📊 **Progress**: 1/5 completed (20%)\n⏱️ **Total ETA**: 45 minutes (8 min ahead of schedule)\n🎯 **On-time Rate**: 94%\n\nAll systems optimal. No immediate action required.';
        confidence = 92;
        suggestions = ['Show route map', 'Next stop details', 'Performance metrics'];
      } else if (lowerContent.includes('finish') || lowerContent.includes('eta') || lowerContent.includes('complete')) {
        aiResponse = 'Based on current conditions:\n\n⏰ **Estimated Completion**: 3:45 PM\n📈 **Time Saved**: +14 minutes vs original plan\n⛽ **Fuel Saved**: ₹120\n🏆 **Performance**: Top 8% in your region\n\nYou\'re performing excellently! Current route is optimized.';
        confidence = 88;
        suggestions = ['View detailed stats', 'Compare to yesterday', 'Share performance'];
      } else if (lowerContent.includes('perform') || lowerContent.includes('metric')) {
        aiResponse = 'Today\'s Performance Metrics:\n\n📦 **Deliveries**: 1/5 completed\n⏰ **On-time Rate**: 94% (Zone avg: 78%)\n⚡ **Avg Speed**: 42 km/h (Zone avg: 35 km/h)\n💰 **Fuel Efficiency**: +15% vs baseline\n🎯 **Customer Rating**: 4.8/5\n\nYou\'re in the top 10% of drivers today!';
        confidence = 90;
        suggestions = ['View weekly trends', 'Efficiency tips', 'Leaderboard'];
      } else if (lowerContent.includes('optim') || lowerContent.includes('best')) {
        aiResponse = 'I\'ve analyzed your remaining 4 stops and found an optimization:\n\n💡 **Recommended Change**: Swap stops #3 and #4\n📊 **Impact**: Save 6 minutes, reduce fuel by 8%\n🤖 **AI Confidence**: 91%\n\nThis avoids the school zone traffic at 2:30 PM. Shall I apply this change?';
        confidence = 91;
        suggestions = ['Apply optimization', 'Show reasoning', 'Keep current route'];
        actionTaken = 'Route optimization calculated';
      } else if (lowerContent.includes('update') || lowerContent.includes('real') || lowerContent.includes('live')) {
        aiResponse = '🔴 **Live Updates**:\n\n🚦 **Traffic**: Moderate on Main St, clear on Highway 101\n🌤️ **Weather**: Clear, 24°C, no impact\n📱 **System**: All optimal\n⚡ **AI**: Active and monitoring\n\nNo critical updates. Your current route remains optimal.';
        confidence = 95;
        suggestions = ['Set traffic alerts', 'Weather notifications', 'System status'];
      } else {
        aiResponse = 'I can help you with route optimization, delay predictions, performance insights, risk analysis, and real-time updates. What specific information would you like?';
        confidence = 75;
        suggestions = ['Analyze route risks', 'Current performance', 'Optimize stops', 'Live updates'];
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        suggestions,
        confidence,
        actionTaken,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1200);
  };

  // Voice recording functions
  const startRecording = () => {
    console.log('Starting voice recording...');
    
    // Check browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported');
      alert('Voice recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        console.log('Speech recognition result:', event.results);
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);
        setInputValue(transcript);
        setIsRecording(false);
        
        // Auto-send the voice message
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 500);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        const errorMessages: { [key: string]: string } = {
          'no-speech': 'No speech detected. Please try again.',
          'not-allowed': 'Microphone access denied. Please allow microphone access and refresh the page.',
          'network': 'Network error. Please check your connection.',
          'service-not-allowed': 'Microphone service not allowed. Please check browser permissions.',
          'aborted': 'Recording was aborted.',
        };
        
        const message = errorMessages[event.error] || 'Voice recognition error. Please try typing instead.';
        alert(message);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsRecording(false);
      };

      recognition.onspeechstart = () => {
        console.log('Speech detected');
      };

      recognition.onspeechend = () => {
        console.log('Speech ended');
      };

      setRecognition(recognition);
      
      // Request microphone permission and start
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          console.log('Microphone access granted');
          recognition.start();
        })
        .catch((error) => {
          console.error('Microphone access denied:', error);
          setIsRecording(false);
          alert('Microphone access denied. Please allow microphone access in your browser settings.');
        });
        
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      setIsRecording(false);
      alert('Failed to initialize voice recognition. Please try typing instead.');
    }
  };

  const stopRecording = () => {
    console.log('Stopping voice recording...');
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col">
      {/* Mobile Status Bar */}
      <MobileStatusBar />
      
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">AI Co-Pilot</h2>
              <p className="text-xs text-green-400">Enhanced Intelligence</p>
            </div>
          </div>
          <button 
            onClick={onMenuToggle}
            className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            title="Menu"
          >
            <Menu className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'ai'
                  ? 'bg-gradient-to-br from-cyan-500 to-purple-500'
                  : 'bg-zinc-800'
              }`}>
                {message.type === 'ai' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>

              <div className={`flex-1 ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.type === 'ai'
                    ? 'bg-zinc-900 border border-cyan-500/30'
                    : 'bg-cyan-500/20 border border-cyan-500/50'
                }`}>
                  <div className="text-sm text-white leading-relaxed whitespace-pre-line">{message.content}</div>
                  
                  {message.confidence && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-[10px] text-green-400">{message.confidence}% confidence</span>
                      </div>
                      {message.actionTaken && (
                        <span className="text-[10px] text-zinc-400">• {message.actionTaken}</span>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-zinc-500 mt-1 px-2">{message.timestamp}</p>

                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(suggestion)}
                        className="px-3 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 rounded-full text-xs text-zinc-300 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-zinc-900 border border-cyan-500/30 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
                <span className="text-sm text-zinc-400">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-xs text-zinc-400 mb-3">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(action.action)}
                  className="p-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-left transition-all hover:border-cyan-500/50 group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-medium text-white mb-1">{action.label}</p>
                  <p className="text-[10px] text-zinc-400">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-zinc-900/80 backdrop-blur-lg border-t border-cyan-500/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Ask me anything about your route..."
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            disabled={isProcessing || isRecording}
          />
          
          {/* Voice Recording Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            aria-label={isRecording ? "Stop recording" : "Start voice recording"}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-zinc-400" />
            )}
          </button>
          
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isProcessing || !inputValue.trim() || isRecording}
            aria-label="Send message"
            className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-2 flex items-center gap-2 text-xs text-red-400">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>Recording... Speak now</span>
          </div>
        )}
      </div>
    </div>
  );
}
