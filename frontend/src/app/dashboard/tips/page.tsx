'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, Target, Users, Zap, Award, BookOpen, Clock } from 'lucide-react';

interface Tip {
  id: string;
  category: string;
  title: string;
  date: string;
  content: string;
  icon: React.ReactNode;
  impact: 'High' | 'Medium';
}

const tipsData: Tip[] = [
  {
    id: '1',
    category: 'Negotiation',
    title: "Master the 'Power Pause'",
    date: 'May 15, 2026',
    content: "In high-stakes negotiations, a 3-second pause after a key point projects authority and gives the other party time to process your value. Silence is a professional tool, not a weakness. It often compels the other side to fill the gap, sometimes with concessions.",
    icon: <Clock size={24} />,
    impact: 'High'
  },
  {
    id: '2',
    category: 'Communication',
    title: 'The "Bottom-Line Up" Method',
    date: 'May 14, 2026',
    content: "When emailing executives, put your request or the main conclusion in the first sentence. They read for action, not for context. Provide the 'why' only after the 'what'. This respects their time and increases your response rate.",
    icon: <Zap size={24} />,
    impact: 'High'
  },
  {
    id: '3',
    category: 'Networking',
    title: 'Focus on "Farming, not Hunting"',
    date: 'May 13, 2026',
    content: "Building a professional network is about long-term cultivation. Instead of asking for a job or a lead immediately, ask: 'How can I support your current project?' Trust is the currency of high-level business.",
    icon: <Users size={24} />,
    impact: 'Medium'
  },
  {
    id: '4',
    category: 'Presentation',
    title: 'The 10-20-30 Rule',
    date: 'May 12, 2026',
    content: "For pitch decks: 10 slides, 20 minutes, 30-point font. If you can't explain your value proposition within these constraints, you haven't simplified it enough for your audience.",
    icon: <Target size={24} />,
    impact: 'High'
  },
  {
    id: '5',
    category: 'Leadership',
    title: 'Extreme Ownership',
    date: 'May 11, 2026',
    content: "As a leader, you own the failures and your team owns the successes. When a mistake happens, look at your instructions first. Clear communication is the leader's primary responsibility.",
    icon: <Award size={24} />,
    impact: 'High'
  }
];

export default function ExecutiveTipsPage() {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-3 text-[#D97706]">
          <Lightbulb size={24} />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Strategy Lab</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white mb-4">Executive Tips</h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          A curated collection of high-impact strategies for modern business leadership and communication. 
          Updated daily with insights from top global executives.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {tipsData.map((tip, idx) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0B1120] border border-[#1E293B] rounded-3xl p-8 relative overflow-hidden group hover:border-[#D97706]/40 transition-all shadow-xl"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              {tip.icon}
            </div>

            <div className="flex flex-col md:flex-row gap-8 relative z-10">
              <div className="p-4 bg-[#D97706]/10 text-[#D97706] rounded-2xl h-fit shadow-[0_0_15px_rgba(217,119,6,0.1)]">
                {tip.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-2 py-0.5 bg-[#D97706]/20 text-[#D97706] text-[10px] font-black rounded uppercase tracking-widest border border-[#D97706]/30">
                    {tip.category}
                  </span>
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{tip.date}</span>
                  {tip.impact === 'High' && (
                    <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                      <Sparkles size={12} /> High Impact
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-[#D97706] transition-colors">
                  {tip.title}
                </h2>
                
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                  {tip.content}
                </p>
              </div>
            </div>

            {/* Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#D97706]"></div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-[#0F172A] border border-[#1E293B] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-xl">
            <BookOpen className="text-gray-400" size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold">Want more insights?</h3>
            <p className="text-sm text-gray-500">Subscribe to our weekly Executive Briefing.</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-[#0F172A] rounded-xl font-bold text-sm hover:bg-gray-100 transition-all shadow-xl">
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
