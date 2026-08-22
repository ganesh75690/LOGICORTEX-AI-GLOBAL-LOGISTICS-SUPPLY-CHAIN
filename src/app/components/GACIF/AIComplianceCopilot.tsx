import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target, 
  Globe, 
  FileText, 
  Shield, 
  Brain, 
  Lightbulb, 
  X, 
  User, 
  Bot, 
  Zap, 
  BookOpen,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Copy,
  Download
} from 'lucide-react';

interface ComplianceQuestion {
  id: string;
  question: string;
  answer: string;
  category: 'documentation' | 'regulations' | 'risk' | 'certification' | 'general';
  timestamp: string;
  confidence: number;
  relatedShipments: string[];
  aiContext: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  context?: string;
  suggestions?: string[];
  confidence?: number;
}

const AIComplianceCopilot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'MSG-001',
      type: 'ai',
      content: 'Hello! I am your AI Compliance Copilot. I can help you with compliance questions, document analysis, risk assessment, and regulatory guidance. How can I assist you today?',
      timestamp: '2024-08-10 10:00',
      suggestions: [
        'What documents are required for shipping to Germany?',
        'What are the current risks for my upcoming shipment?',
        'How do I renew an expired CE certificate?'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFaq, setShowFaq] = useState(true);

  const faqQuestions: ComplianceQuestion[] = [
    {
      id: 'FAQ-001',
      question: 'What documents are required for shipping electronic components to the EU?',
      answer: 'For shipping electronic components to the EU, you typically need: 1) Commercial Invoice with HS Code classification, 2) Packing List, 3) Bill of Lading, 4) CE Certificate (mandatory for most electronic products), 5) Declaration of Conformity, 6) Technical documentation file. Additional requirements may apply depending on the specific product type and country of origin.',
      category: 'documentation',
      timestamp: '2024-08-10',
      confidence: 98,
      relatedShipments: ['SHP-002', 'SHP-004'],
      aiContext: 'Based on EU customs regulations and CE marking requirements for electronic products.'
    },
    {
      id: 'FAQ-002',
      question: 'What is the current risk level for shipments to the United States?',
      answer: 'Current risk level for US shipments is MODERATE. Recent updates: 1) FDA has updated documentation requirements for medical devices effective September 2024, 2) No major port congestion reported, 3) Standard customs processing times of 24-48 hours. AI predicts 92% compliance rate for properly documented shipments.',
      category: 'risk',
      timestamp: '2024-08-10',
      confidence: 94,
      relatedShipments: ['SHP-001', 'SHP-004'],
      aiContext: 'Based on real-time trade risk monitoring and US customs data.'
    },
    {
      id: 'FAQ-003',
      question: 'How do I renew an expired CE certificate?',
      answer: 'To renew an expired CE certificate: 1) Contact a Notified Body accredited for your product category, 2) Submit updated technical documentation, 3) Undergo product testing if required, 4) Receive new CE certificate, 5) Update Declaration of Conformity. Typical processing time: 10-14 days. Cost varies by product complexity. Critical: Do not ship to EU with expired certificate - 95% rejection rate.',
      category: 'certification',
      timestamp: '2024-08-10',
      confidence: 96,
      relatedShipments: ['SHP-002'],
      aiContext: 'Based on EU CE marking renewal procedures and historical data.'
    },
    {
      id: 'FAQ-004',
      question: 'What are the new US customs requirements effective September 2024?',
      answer: 'New US customs requirements effective September 2024: 1) Updated FDA declaration format with additional fields, 2) Enhanced electronic filing requirements, 3) New supplier disclosure requirements, 4) Updated HS Code classifications for certain electronic components. AI recommends updating documentation templates immediately to avoid delays.',
      category: 'regulations',
      timestamp: '2024-08-09',
      confidence: 91,
      relatedShipments: ['SHP-004'],
      aiContext: 'Based on US CBP announcements and FDA regulatory updates.'
    },
    {
      id: 'FAQ-005',
      question: 'What is the compliance confidence score for shipment SHP-002?',
      answer: 'Shipment SHP-002 has a compliance confidence score of 72% (AT RISK). Main issue: CE Certificate expired on 2024-07-15. Risk factors: 25% inspection probability, 15% customs rejection probability, estimated 2-3 day delay. AI Recommendation: Renew CE certificate immediately before shipment reaches EU border.',
      category: 'risk',
      timestamp: '2024-08-10',
      confidence: 97,
      relatedShipments: ['SHP-002'],
      aiContext: 'Based on real-time compliance analysis and digital twin simulation.'
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `MSG-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `MSG-${Date.now() + 1}`,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toLocaleString(),
        confidence: Math.floor(Math.random() * 10) + 90,
        suggestions: [
          'Tell me more about this regulation',
          'What documents do I need?',
          'How long will this take?'
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('document') || lowerQuestion.includes('certificate')) {
      return 'Based on your question about documentation, I can provide detailed guidance. The specific requirements depend on your destination country and product type. For accurate information, please specify the destination country and product category.';
    } else if (lowerQuestion.includes('risk') || lowerQuestion.includes('compliance')) {
      return 'I can help you assess compliance risks. The current global trade risk level is MODERATE with active alerts in Eastern Europe (trade restrictions) and Southeast Asia (port congestion). Would you like me to analyze a specific shipment or route?';
    } else if (lowerQuestion.includes('germany') || lowerQuestion.includes('eu')) {
      return 'For Germany/EU shipments, the key requirements are: CE Certificate, Commercial Invoice with HS Code, Packing List, and Declaration of Conformity. Current compliance rate for properly documented shipments is 92%. Is there a specific aspect you need help with?';
    } else if (lowerQuestion.includes('usa') || lowerQuestion.includes('united states')) {
      return 'For US shipments, requirements include: Commercial Invoice, Packing List, Bill of Lading, and FDA declaration for medical devices. New documentation requirements effective September 2024. Average clearance time: 24-48 hours. Do you need details on any specific requirement?';
    } else {
      return 'I understand your question. To provide the most accurate guidance, could you please specify: 1) The destination country, 2) Product type, 3) Current documentation status. This will help me give you precise compliance recommendations.';
    }
  };

  const handleFaqClick = (faq: ComplianceQuestion) => {
    const userMessage: ChatMessage = {
      id: `MSG-${Date.now()}`,
      type: 'user',
      content: faq.question,
      timestamp: new Date().toLocaleString()
    };

    const aiMessage: ChatMessage = {
      id: `MSG-${Date.now() + 1}`,
      type: 'ai',
      content: faq.answer,
      timestamp: new Date().toLocaleString(),
      context: faq.aiContext,
      confidence: faq.confidence
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
    setShowFaq(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'documentation': return 'bg-blue-500/20 text-blue-400';
      case 'regulations': return 'bg-purple-500/20 text-purple-400';
      case 'risk': return 'bg-red-500/20 text-red-400';
      case 'certification': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            AI Compliance Copilot™
          </h2>
          <p className="text-slate-400">Intelligent compliance advisor with explainable AI insights</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-400">AI Model: v2.4</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Chat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Frequently Asked Questions
              </h3>
              <button
                onClick={() => setShowFaq(!showFaq)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {showFaq ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
            
            <AnimatePresence>
              {showFaq && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  {faqQuestions.map((faq, idx) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleFaqClick(faq)}
                      className="p-3 rounded-lg border border-slate-700/50 hover:border-yellow-500/50 cursor-pointer transition-all hover:bg-slate-700/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(faq.category)}`}>
                          {faq.category}
                        </span>
                        <span className="text-xs text-slate-400">{faq.confidence}% confidence</span>
                      </div>
                      <p className="text-sm text-white line-clamp-2">{faq.question}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
                Compliance Chat
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Session ID: GACIF-2024-001</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-purple-500/20 border border-purple-500/30' 
                      : 'bg-slate-700/50 border border-slate-600/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-purple-400" />
                      ) : (
                        <Bot className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className="text-xs text-slate-400">{message.timestamp}</span>
                      {message.confidence && (
                        <span className="text-xs text-green-400">{message.confidence}% confidence</span>
                      )}
                    </div>
                    <p className="text-sm text-white mb-2">{message.content}</p>
                    {message.context && (
                      <div className="text-xs text-slate-400 italic mt-2">
                        {message.context}
                      </div>
                    )}
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => setInputMessage(suggestion)}
                            className="text-xs text-slate-400 hover:text-white text-left w-full p-2 bg-slate-600/50 rounded hover:bg-slate-600 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-700/50 border border-slate-600/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-yellow-400" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ask about compliance, regulations, documentation..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-4 pr-12 py-3 text-white placeholder-slate-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setInputMessage('What are the current risks for my shipments?')}
            className="p-4 rounded-lg border border-slate-700/50 hover:border-red-500/50 transition-all hover:bg-slate-700/50 text-left"
          >
            <AlertTriangle className="w-5 h-5 text-red-400 mb-2" />
            <div className="text-sm font-medium text-white">Check Current Risks</div>
            <div className="text-xs text-slate-400">Analyze risk events</div>
          </button>
          <button
            onClick={() => setInputMessage('What documents do I need for my next shipment?')}
            className="p-4 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-all hover:bg-slate-700/50 text-left"
          >
            <FileText className="w-5 h-5 text-blue-400 mb-2" />
            <div className="text-sm font-medium text-white">Document Requirements</div>
            <div className="text-xs text-slate-400">Get compliance checklist</div>
          </button>
          <button
            onClick={() => setInputMessage('What is the compliance status of my shipments?')}
            className="p-4 rounded-lg border border-slate-700/50 hover:border-green-500/50 transition-all hover:bg-slate-700/50 text-left"
          >
            <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
            <div className="text-sm font-medium text-white">Compliance Status</div>
            <div className="text-xs text-slate-400">Check shipment status</div>
          </button>
          <button
            onClick={() => setInputMessage('What regulations apply to my products?')}
            className="p-4 rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-all hover:bg-slate-700/50 text-left"
          >
            <Shield className="w-5 h-5 text-purple-400 mb-2" />
            <div className="text-sm font-medium text-white">Regulation Check</div>
            <div className="text-xs text-slate-400">Applicable regulations</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIComplianceCopilot;