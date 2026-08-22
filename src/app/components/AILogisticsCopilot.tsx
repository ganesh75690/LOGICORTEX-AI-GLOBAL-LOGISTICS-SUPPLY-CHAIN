import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  AlertTriangle, 
  DollarSign,
  MapPin,
  Package,
  Brain
} from 'lucide-react';
import { askAI } from '../../ai';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  category?: 'delay' | 'cost' | 'route' | 'inventory' | 'general';
}

interface QuickQuestion {
  id: string;
  question: string;
  icon: any;
  category: 'delay' | 'cost' | 'route' | 'inventory';
}

export function AILogisticsCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '🤖 Hello! I\'m your AI Logistics Copilot powered by Google Gemini. I can help you analyze delays, optimize costs, plan routes, and manage inventory using real AI intelligence. What would you like to know?',
      timestamp: new Date().toLocaleTimeString(),
      category: 'general'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions: QuickQuestion[] = [
    { id: '1', question: 'Why is shipment R002 delayed?', icon: AlertTriangle, category: 'delay' },
    { id: '2', question: 'Best way to reduce cost today?', icon: DollarSign, category: 'cost' },
    { id: '3', question: 'Optimize route for delivery D005', icon: MapPin, category: 'route' },
    { id: '4', question: 'Check warehouse B inventory', icon: Package, category: 'inventory' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Call real Gemini AI for logistics expertise
      const logisticsPrompt = `As a logistics AI expert, analyze this supply chain question and provide specific, actionable recommendations: ${userMessage}`;
      const response = await askAI(logisticsPrompt);
      return response;
    } catch (error) {
      // Fallback to basic response if AI fails
      return 'I apologize, but I\'m having trouble connecting to my AI services right now. Please try again in a moment.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Get real AI response
      const aiResponseText = await generateAIResponse(inputValue);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponseText,
        timestamp: new Date().toLocaleTimeString(),
        category: 'general'
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      // Handle error gracefully
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date().toLocaleTimeString(),
        category: 'general'
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    if (isTyping) return;
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition implementation would go here
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000); // Simulate voice input
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'delay': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'cost': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'route': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'inventory': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">AI Logistics Copilot</h3>
            <p className="text-xs text-slate-400">Your intelligent supply chain assistant</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="grid grid-cols-2 gap-2">
          {quickQuestions.map(qq => {
            const Icon = qq.icon;
            return (
              <button
                key={qq.id}
                onClick={() => handleQuickQuestion(qq.question)}
                disabled={isTyping}
                className="flex items-center gap-2 p-2 bg-slate-700/30 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all text-left"
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-300">{qq.question}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-xl p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : `${getCategoryColor(message.category)}`
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
                <div className="text-xs text-slate-500 mt-1 px-1">
                  {message.timestamp}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600/50">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex gap-2">
          <button
            onClick={toggleVoiceInput}
            className={`p-3 rounded-lg transition-all ${
              isListening 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' 
                : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/70'
            }`}
            aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about your logistics..."
            className="flex-1 bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:text-slate-400 text-white rounded-lg transition-all flex items-center justify-center"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
          <Sparkles className="w-3 h-3" />
          <span>Powered by AI • Analyzes real-time data • Provides actionable insights</span>
        </div>
      </div>
    </div>
  );
}
