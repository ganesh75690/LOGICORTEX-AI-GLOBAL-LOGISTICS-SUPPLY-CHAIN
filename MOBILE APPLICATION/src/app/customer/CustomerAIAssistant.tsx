import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft,
  MessageSquare,
  Send,
  Bot,
  User,
  Clock,
  MapPin,
  Package,
  CheckCircle2,
  AlertTriangle,
  Menu
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onMenuToggle: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export function CustomerAIAssistant({ onBack, onMenuToggle }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your LogiCortex AI assistant. I can help you track shipments, check delivery status, or answer any questions about your deliveries. How can I help you today?',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'Where is my shipment?',
    'When will it arrive?',
    'Why is my delivery delayed?',
    'Can I change the delivery location?',
    'What happened to my ETA?',
    'Was my delivery verified?',
    'Can someone else receive my package?'
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('where') && lowerQuery.includes('shipment')) {
      return 'Your shipment LX20481 is currently out for delivery. It\'s 6.4 km away from your destination and expected to arrive between 16:20 and 16:40. The current AI confidence is 94%.';
    }

    if (lowerQuery.includes('when') && lowerQuery.includes('arrive')) {
      return 'Your delivery is expected between 16:20 and 16:40 today. Based on current route conditions and traffic patterns, the AI confidence is 94%. You can track live updates on the delivery dashboard.';
    }

    if (lowerQuery.includes('delayed') || lowerQuery.includes('delay')) {
      return 'Your delivery is currently on schedule. If there are any delays, you\'ll receive a proactive notification with the updated ETA and explanation. LogiCortex AI monitors your delivery in real-time and adjusts for disruptions.';
    }

    if (lowerQuery.includes('change') && lowerQuery.includes('location')) {
      return 'Delivery location changes depend on the shipment status and supplier policy. You can submit a preference request through the Delivery Preferences screen. I can help you navigate there if you\'d like.';
    }

    if (lowerQuery.includes('eta')) {
      return 'Your current ETA is 16:32 with a predicted window of 16:20–16:40. The AI considers current route conditions, traffic information, remaining distance, and historical delivery patterns to provide this prediction.';
    }

    if (lowerQuery.includes('verified')) {
      return 'Once your delivery is complete, it\'s verified through the AI Delivery Verification Engine™. This includes destination verification, delivery time recording, route consistency check, delivery evidence, and handover confirmation. Verification confidence is typically 95%+.';
    }

    if (lowerQuery.includes('someone else') || lowerQuery.includes('authorized')) {
      return 'You can designate an authorized recipient through your delivery preferences. The system ensures delivery is handed to an appropriate recipient according to your configured delivery policy, integrated with the AI Delivery Verification Engine™.';
    }

    return 'I can help you with shipment tracking, delivery status, ETA predictions, delivery preferences, and verification information. What would you like to know?';
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">AI ASSISTANT</h1>
              <p className="text-xs text-zinc-400">LogiCortex AI Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-cyan-500/20' 
                    : 'bg-gradient-to-br from-cyan-500 to-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-cyan-500/20 border border-cyan-500/30'
                    : 'bg-zinc-900/50 border border-zinc-800/50'
                }`}>
                  <p className="text-sm text-white leading-relaxed">{message.content}</p>
                  <p className="text-[10px] text-zinc-500 mt-1">{message.timestamp}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4"
          >
            <p className="text-xs text-zinc-400 mb-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(question)}
                  className="px-3 py-2 bg-zinc-900/50 border border-zinc-800/50 rounded-lg text-xs text-zinc-300 hover:border-cyan-500/50 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/50 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about your delivery..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            className="flex-1 px-4 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}