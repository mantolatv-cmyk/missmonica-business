'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Send, 
  Lightbulb, 
  Clock, 
  MoreHorizontal,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const phraseBank = [
  { id: 1, text: "In regards to your previous email...", category: "Opening" },
  { id: 2, text: "Moving forward, we propose...", category: "Action" },
  { id: 3, text: "To mitigate the current supply chain delays...", category: "Solution" },
  { id: 4, text: "Please let me know if you need further clarification.", category: "Closing" },
];

export default function SimulationPage() {
  const [isPhraseBankOpen, setIsPhraseBankOpen] = useState(true);
  const [inputText, setInputText] = useState("");

  const insertPhrase = (text: string) => {
    setInputText(prev => prev + (prev.length > 0 && !prev.endsWith(' ') ? ' ' : '') + text + ' ');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-8">
      {/* Simulation Header */}
      <div className="h-16 border-b border-[#E2E8F0] bg-white px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4 p-2 text-gray-400 hover:text-[#0F172A] rounded-full hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-4 w-px bg-gray-300 mr-4"></div>
          <span className="px-2.5 py-0.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[10px] font-bold text-gray-500 uppercase tracking-widest mr-3">
            Module 4
          </span>
          <h1 className="font-serif font-bold text-[#0F172A] text-lg">
            Client De-escalation Email
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500 font-sans text-sm">
            <Clock size={16} className="mr-1.5" /> 14:59 remaining
          </div>
          <button className="bg-[#0F172A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1E293B] transition-colors flex items-center shadow-sm">
            <Send size={14} className="mr-2" /> Submit Review
          </button>
        </div>
      </div>

      {/* Split Screen Workspace */}
      <div className="flex flex-1 overflow-hidden bg-[#F8FAFC]">
        
        {/* Left Side: Briefing */}
        <div className="w-1/2 p-8 overflow-y-auto border-r border-[#E2E8F0]">
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-[#0F172A] mb-6">Scenario Briefing</h2>
            
            <div className="prose prose-slate max-w-none font-sans text-[#0F172A]">
              <p className="text-lg leading-relaxed mb-6">
                You are the Account Manager for a key enterprise client. They have just emailed you expressing severe dissatisfaction because their Q3 deliverables are delayed by two weeks.
              </p>
              
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-8 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#D97706] rounded-l-xl"></div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Incoming Email from Client</h4>
                <p className="italic text-gray-600 mb-0">
                  "This delay is unacceptable. We built our entire Q4 launch strategy around these deliverables. We need to know exactly what is being done to fix this immediately, or we will have to escalate this to your executive team."
                </p>
              </div>

              <h3 className="font-bold text-lg mb-3">Your Objective</h3>
              <ul className="space-y-3 mb-8 list-none pl-0">
                <li className="flex items-start">
                  <CheckCircle2 size={18} className="text-[#10B981] mr-2 mt-0.5 shrink-0" />
                  <span>Acknowledge their frustration professionally.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={18} className="text-[#10B981] mr-2 mt-0.5 shrink-0" />
                  <span>Provide a clear, actionable timeline for resolution.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 size={18} className="text-[#10B981] mr-2 mt-0.5 shrink-0" />
                  <span>Avoid making promises you cannot keep (use diplomatic language).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Input Area */}
        <div className="w-1/2 p-8 relative flex flex-col bg-white">
          <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
            <div className="mb-4 flex items-center text-sm text-gray-500 border-b border-gray-100 pb-4">
              <span className="w-16 font-semibold">To:</span> client@enterprise.com
            </div>
            <div className="mb-4 flex items-center text-sm text-gray-500 border-b border-gray-100 pb-4">
              <span className="w-16 font-semibold">Subject:</span> Update regarding Q3 deliverables timeline
            </div>
            
            <textarea
              className="flex-1 w-full resize-none outline-none font-sans text-gray-800 leading-relaxed placeholder-gray-300 py-4"
              placeholder="Start drafting your response here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Floating Professional Phrase Bank Widget */}
          <AnimatePresence>
            {isPhraseBankOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-8 right-8 w-80 bg-[#0F172A] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#1E293B]">
                  <div className="flex items-center text-white">
                    <Lightbulb size={16} className="text-[#D97706] mr-2" />
                    <h3 className="font-sans text-sm font-semibold">Phrase Bank</h3>
                  </div>
                  <button 
                    onClick={() => setIsPhraseBankOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                
                <div className="p-2 max-h-64 overflow-y-auto">
                  {phraseBank.map((phrase) => (
                    <button
                      key={phrase.id}
                      onClick={() => insertPhrase(phrase.text)}
                      className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors group flex items-start"
                    >
                      <ChevronRight size={14} className="text-gray-500 mt-1 mr-2 group-hover:text-[#D97706] shrink-0 transition-colors" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">{phrase.category}</span>
                        <span className="text-sm text-gray-300 leading-snug group-hover:text-white transition-colors">"{phrase.text}"</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isPhraseBankOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsPhraseBankOpen(true)}
              className="absolute bottom-8 right-8 w-12 h-12 bg-[#0F172A] rounded-full shadow-xl flex items-center justify-center text-[#D97706] hover:bg-[#1E293B] transition-colors"
            >
              <Lightbulb size={20} />
            </motion.button>
          )}

        </div>
      </div>
    </div>
  );
}
