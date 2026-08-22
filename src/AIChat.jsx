import React, { useState } from 'react';
import { askAI } from './ai';
import { MessageCircle, Send, Loader2, Bot } from 'lucide-react';

/**
 * AIChat Component - Supply Chain AI Assistant
 * Provides an interactive chat interface for supply chain queries using Google Gemini AI
 */
export function AIChat() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim() || isLoading) return;
    
    // Add user message to history
    const userMessage = { type: 'user', text: query };
    setChatHistory(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    setResponse(''); // Clear previous response
    
    try {
      // Call AI API
      const aiResponse = await askAI(query);
      setResponse(aiResponse);
      
      // Add AI response to history
      const aiMessage = { type: 'ai', text: aiResponse };
      setChatHistory(prev => [...prev, aiMessage]);
      
    } catch (error) {
      setResponse('Failed to get AI response. Please try again.');
    } finally {
      setIsLoading(false);
      setQuery(''); // Clear input field
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50 p-6 h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5C4] to-[#00D4A8] flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Supply Chain AI Assistant</h3>
          <p className="text-sm text-slate-400">Powered by Google Gemini</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[300px]">
        {chatHistory.length === 0 && !response && (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-sm">Ask me anything about supply chain management</p>
            <p className="text-slate-500 text-xs mt-2">Examples: inventory optimization, route planning, demand forecasting</p>
          </div>
        )}
        
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black'
                  : 'bg-slate-800/50 text-white border border-slate-700/50'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/50 text-white border border-slate-700/50 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Ask about supply chain optimization, inventory management, logistics..."
            className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00F5C4]/50 focus:border-[#00F5C4]/50 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-[#00F5C4] to-[#00D4A8] text-black disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#00F5C4]/20 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Quick Suggestions */}
        <div className="flex flex-wrap gap-2">
          {[
            'Optimize inventory levels',
            'Reduce transportation costs',
            'Improve delivery times',
            'Supply chain risk assessment'
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setQuery(suggestion)}
              className="px-3 py-1 text-xs bg-slate-800/30 text-slate-400 rounded-lg hover:bg-slate-700/50 hover:text-white transition-all"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
