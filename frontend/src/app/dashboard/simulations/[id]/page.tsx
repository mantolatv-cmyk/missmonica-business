'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, AlertCircle, CheckCircle2, Mic } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function ConversationalSimulator({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: "Good morning. I've reviewed the proposed contract for Q4. To be frank, our budget for this quarter is extremely tight. Can you lower the price by 15%?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: "I understand your constraints regarding material costs, but we have strict directives from the board. Is there any room for negotiation if we extend the contract duration?" 
      }]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-8 bg-[#0B1120]">
      {/* Simulation Header */}
      <div className="h-16 border-b border-[#1E293B] bg-[#0F172A] px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1E293B] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-4 w-px bg-[#1E293B] mr-4"></div>
          <span className="px-2.5 py-0.5 bg-[#D97706]/10 border border-[#D97706]/30 rounded text-[10px] font-bold text-[#D97706] uppercase tracking-widest mr-3">
            Mission 01
          </span>
          <h1 className="font-serif font-bold text-[#F8FAFC] text-lg">
            Supplier Negotiation
          </h1>
        </div>
        
        <Link href={`/dashboard/simulations/${params.id}/debrief`} className="text-sm font-semibold text-[#F8FAFC] bg-[#1E293B] px-4 py-2 rounded-lg hover:bg-[#334155] transition-colors border border-[#334155]">
          End Simulation & View Debrief
        </Link>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Chat Interface */}
        <div className="flex-1 flex flex-col relative">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-2xl p-5 rounded-2xl text-[15px] font-sans leading-relaxed shadow-sm
                    ${msg.sender === 'user' 
                      ? 'bg-[#1E293B] text-[#F8FAFC] rounded-br-sm border border-[#334155]' 
                      : 'bg-[#0F172A] text-gray-200 rounded-bl-sm border border-[#1E293B]'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded bg-[#D97706] text-white flex items-center justify-center text-xs font-bold mr-2">AI</div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Procurement Director</span>
                      </div>
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl rounded-bl-sm p-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-[#0F172A] border-t border-[#1E293B]">
            <div className="max-w-4xl mx-auto flex items-end bg-[#0B1120] border border-[#1E293B] rounded-xl overflow-hidden focus-within:border-[#D97706] transition-colors shadow-inner">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Type your diplomatic response..."
                className="flex-1 bg-transparent text-[#F8FAFC] placeholder-gray-600 p-4 max-h-32 min-h-[56px] resize-none focus:outline-none font-sans"
              />
              <div className="p-2 flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-[#D97706] transition-colors rounded-lg">
                  <Mic size={20} />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-[#D97706] disabled:bg-[#1E293B] disabled:text-gray-500 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            <div className="text-center mt-3 text-xs text-gray-500">
              Press <kbd className="bg-[#1E293B] px-1.5 py-0.5 rounded text-gray-400">Enter</kbd> to send
            </div>
          </div>
        </div>

        {/* Right Side: Executive Prompter */}
        <div className="w-80 border-l border-[#1E293B] bg-[#0F172A] flex flex-col shrink-0">
          <div className="p-6 border-b border-[#1E293B] flex items-center">
            <Sparkles className="text-[#D97706] mr-2" size={20} />
            <h2 className="font-serif font-bold text-lg text-[#F8FAFC]">Executive Prompter</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4">
              <h3 className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <CheckCircle2 size={14} className="text-[#10B981] mr-1.5" /> Context Tip
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                The client is pressing on budget. Avoid saying <span className="text-red-400">"we can't do this"</span>. Instead, anchor the value of your materials.
              </p>
            </div>

            <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4">
              <h3 className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <AlertCircle size={14} className="text-[#D97706] mr-1.5" /> Suggested Phrasal Verbs
              </h3>
              <ul className="space-y-3">
                <li className="text-sm border-l-2 border-[#D97706] pl-3">
                  <span className="text-white font-semibold block mb-0.5">Push back</span>
                  <span className="text-gray-500 text-xs">To delay or politely decline.</span>
                </li>
                <li className="text-sm border-l-2 border-[#D97706] pl-3">
                  <span className="text-white font-semibold block mb-0.5">Meet halfway</span>
                  <span className="text-gray-500 text-xs">To compromise with the partner.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
