import { Brain, MessageCircle, Send, Bot, Sparkles, TrendingUp, AlertTriangle, Package, BarChart3, Lightbulb, Zap, Clock, CheckCircle, Mic, MicOff } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { askAI } from '../../../ai';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  category?: 'inventory' | 'forecasting' | 'optimization' | 'general';
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
}

const mockAIResponses = {
  inventory: "Based on current inventory levels, I recommend prioritizing restocking for LED Bulbs (SKU-5678) and Circuit Board A (SKU-7845) as they have the highest stockout risk at 85% and 45% respectively.",
  forecasting: "The AI demand forecast predicts a 23% increase in demand for electronics over the next quarter. Consider increasing safety stock levels by 15% to accommodate this trend.",
  optimization: "Warehouse optimization analysis shows that West Warehouse has the highest efficiency at 81.7% utilization. Consider redistributing excess inventory from East Warehouse (60% utilization) to balance the load.",
  general: "I'm your AI supply chain assistant. I can help you with inventory analysis, demand forecasting, warehouse optimization, and general supply chain management questions."
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI Supply Chain Assistant. I can help you analyze inventory data, forecast demand, optimize warehouse operations, and provide intelligent recommendations. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Voice Assistant State
  const [isListening, setIsListening] = useState(false);
  const [voiceResponse, setVoiceResponse] = useState('');
  const recognitionRef = useRef<any>(null);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Inventory Analysis',
      description: 'Get insights on current inventory levels and stockout risks',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      action: () => handleQuickAction('inventory')
    },
    {
      id: '2',
      title: 'Demand Forecast',
      description: 'View AI-powered demand predictions and trends',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      action: () => handleQuickAction('forecasting')
    },
    {
      id: '3',
      title: 'Warehouse Optimization',
      description: 'Optimize warehouse distribution and efficiency',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      action: () => handleQuickAction('optimization')
    },
    {
      id: '4',
      title: 'Risk Assessment',
      description: 'Identify potential supply chain risks and mitigation strategies',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      action: () => handleQuickAction('risk')
    }
  ];

  async function handleQuickAction(category: string) {
    const prompts = {
      inventory: "Analyze current inventory levels and provide recommendations for stock optimization",
      forecasting: "Provide demand forecasting insights and trends for supply chain planning",
      optimization: "Suggest warehouse and logistics optimization strategies",
      general: "Provide an overview of your AI supply chain capabilities"
    };
    
    const prompt = prompts[category as keyof typeof prompts] || prompts.general;
    const response = await askAI(prompt);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `Tell me about ${category}`,
      timestamp: new Date().toLocaleTimeString(),
      category: category as any
    };

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date().toLocaleTimeString(),
      category: category as any
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Real AI response using Gemini API
    try {
      const response = await askAI(inputMessage);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '⚠️ AI service temporarily unavailable. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsTyping(false);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('inventory') || input.includes('stock')) {
      return "Based on current inventory analysis, I've identified 3 critical items requiring immediate attention: LED Bulbs (85% stockout risk), Brake Pads (65% stockout risk), and Circuit Board A (45% stockout risk). I recommend placing orders within the next 24 hours to prevent disruptions.";
    } else if (input.includes('forecast') || input.includes('demand')) {
      return "My demand forecasting models predict a 15-20% increase in electronics demand over the next quarter, with seasonal peaks in months 2 and 4. Automotive parts show steady growth of 8% year-over-year. Would you like me to generate detailed forecast reports?";
    } else if (input.includes('warehouse') || input.includes('distribution')) {
      return "Warehouse optimization analysis shows West Warehouse operating at peak efficiency (81.7% utilization). East Warehouse has capacity for additional inventory. I recommend redistributing 1,200 units from West to East to balance utilization rates.";
    } else if (input.includes('risk') || input.includes('problem')) {
      return "I've identified 3 potential risks: 1) Supplier reliability for LightTech Solutions at 94% (below target), 2) Transportation delays affecting 12% of shipments, 3) Seasonal demand spikes in Q2. Mitigation strategies include diversifying suppliers and increasing safety stock.";
    } else {
      return "I understand you're asking about " + userInput + ". Let me analyze the current supply chain data and provide you with intelligent recommendations. Based on real-time data, I suggest reviewing your inventory turnover rates and considering automated reorder points for optimal efficiency.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGetSuggestions = () => {
    const suggestions = [
      "What are my current inventory levels?",
      "Show me demand forecast for next quarter",
      "Which products need immediate restocking?",
      "How can I optimize warehouse distribution?",
      "What are the main supply chain risks?",
      "Show me analytics dashboard insights"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setInputMessage(randomSuggestion);
  };

  // Voice Assistant Effect
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceResponse('Listening...');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setVoiceResponse(`Heard: "${transcript}"`);
        
        // Auto-send the message after voice input
        setTimeout(() => {
          handleSendMessage();
        }, 1000);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setVoiceResponse('Sorry, I didn\'t catch that. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [inputMessage]);

  const toggleVoiceAssistant = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    } else {
      setVoiceResponse('Voice recognition is not supported in your browser');
      setTimeout(() => setVoiceResponse(''), 3000);
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'inventory': return <Package className="w-4 h-4" />;
      case 'forecasting': return <TrendingUp className="w-4 h-4" />;
      case 'optimization': return <BarChart3 className="w-4 h-4" />;
      case 'general': return <Bot className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'inventory': return 'text-blue-400 bg-blue-400/20';
      case 'forecasting': return 'text-green-400 bg-green-400/20';
      case 'optimization': return 'text-purple-400 bg-purple-400/20';
      case 'general': return 'text-slate-400 bg-slate-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00F5C4]/20 rounded-lg">
            <Brain className="w-6 h-6 text-[#00F5C4]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Assistant</h2>
            <p className="text-slate-400">Intelligent supply chain management support</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">Online</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-[#00F5C4] transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-white font-medium mb-1">{action.title}</h4>
              <p className="text-slate-400 text-sm">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'assistant' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getCategoryColor(message.category)}`}>
                {getCategoryIcon(message.category)}
              </div>
            )}
            <div className={`max-w-2xl ${message.type === 'user' ? 'order-1' : ''}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-[#00F5C4] text-slate-900'
                  : 'bg-slate-800 text-white border border-slate-700'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              <div className={`text-xs text-slate-500 mt-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                {message.timestamp}
              </div>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-[#00F5C4] flex items-center justify-center flex-shrink-0 order-2">
                <MessageCircle className="w-4 h-4 text-slate-900" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-slate-400" />
            </div>
            <div className="bg-slate-800 rounded-2xl px-4 py-3 border border-slate-700">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Response Display */}
      {voiceResponse && (
        <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-400 animate-pulse' : 'bg-blue-400'}`} />
            <p className="text-sm text-slate-300">{voiceResponse}</p>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 border-t border-slate-700">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your supply chain..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#00F5C4] pr-12"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
              <button 
                onClick={toggleVoiceAssistant}
                className={`p-1 rounded transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'hover:bg-slate-700 text-slate-400'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleGetSuggestions}
                className="p-1 hover:bg-slate-700 rounded transition-colors" 
                title="Get suggestions"
              >
                <Lightbulb className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-3 bg-[#00F5C4] text-slate-900 rounded-xl font-medium hover:bg-[#00D4A8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Powered by AI</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Response time: ~1.5s</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>95% accuracy rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
