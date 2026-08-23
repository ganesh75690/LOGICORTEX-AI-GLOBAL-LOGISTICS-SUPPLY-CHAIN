import { Send, Bot, User, MapPin, Clock, TrendingUp, Zap, ArrowLeft, Menu, Mic, MicOff } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MobileStatusBar } from './MobileStatusBar';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

interface Props {
  onMenuToggle: () => void;
  onBack?: () => void;
}

export function AIChatScreen({ onMenuToggle, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your AI co-pilot. I can help you optimize routes, predict delays, and answer questions about your deliveries.',
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
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const quickActions = [
    { icon: MapPin, label: 'Route Status', action: 'What\'s my current route status?' },
    { icon: Clock, label: 'ETA Check', action: 'When will I finish today?' },
    { icon: TrendingUp, label: 'Performance', action: 'How am I performing today?' },
    { icon: Zap, label: 'Optimize', action: 'Optimize my remaining stops' },
  ];

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      let aiResponse = '';
      let suggestions: string[] | undefined;

      if (content.toLowerCase().includes('route')) {
        aiResponse = 'Your current route has 4 remaining stops. The sequence is optimized based on real-time traffic. ETA for completion is 4:15 PM, which is 8 minutes ahead of schedule.';
        suggestions = ['Show route map', 'Any traffic ahead?', 'Reorder stops'];
      } else if (content.toLowerCase().includes('delay')) {
        aiResponse = 'I\'ve detected a potential 12-minute delay on Main St due to heavy traffic. I recommend taking the Highway 101 alternative route to save 15 minutes overall.';
        suggestions = ['Accept route change', 'Show alternative', 'Dismiss'];
      } else if (content.toLowerCase().includes('perform')) {
        aiResponse = 'Great job today! You\'ve completed 24 deliveries with a 94% on-time rate. You\'re 23% faster than the zone average and in the top 10% of drivers.';
        suggestions = ['Show detailed stats', 'Compare to yesterday'];
      } else if (content.toLowerCase().includes('optimize')) {
        aiResponse = 'I\'ve analyzed your remaining 4 stops. By swapping stops #3 and #4, you can save 6 minutes and reduce fuel consumption by 8%. Would you like me to apply this change?';
        suggestions = ['Apply changes', 'Show reasoning', 'Keep current'];
      } else {
        aiResponse = 'I can help you with route optimization, delay predictions, performance insights, and more. What would you like to know?';
        suggestions = ['Optimize route', 'Check for delays', 'Show stats'];
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        suggestions,
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 800);
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
              <p className="text-xs text-green-400">Active</p>
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
                  <p className="text-sm text-white leading-relaxed">{message.content}</p>
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
                  className="p-3 bg-zinc-900/80 hover:bg-zinc-800 border border-cyan-500/20 rounded-xl text-left transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-400 mb-2" />
                  <p className="text-xs font-medium text-white">{action.label}</p>
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
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
            disabled={isRecording}
          />
          
          {/* Voice Recording Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            aria-label={isRecording ? "Stop recording" : "Start voice recording"}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-600'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-zinc-400" />
            )}
          </button>
          
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isRecording}
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
