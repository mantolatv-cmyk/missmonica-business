'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Layers, 
  Brain, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const practiceModules = [
  {
    id: 'grammar-1',
    title: 'Polite Requests',
    category: 'Grammar',
    description: 'Master modal verbs to make polite requests and suggestions in meetings.',
    level: 'Intermediate',
    icon: <BookOpen className="text-[#3B82F6]" size={24} />,
    color: 'blue',
    href: '/dashboard/practice/grammar-1'
  },
  {
    id: 'vocab-1',
    title: 'Corporate Idioms',
    category: 'Vocabulary',
    description: 'Learn the most common idioms used in international business environments.',
    level: 'Advanced',
    icon: <Brain className="text-[#D97706]" size={24} />,
    color: 'amber',
    href: '/dashboard/practice/vocab-1'
  },
  {
    id: 'grammar-2',
    title: 'Business Conditionals',
    category: 'Grammar',
    description: 'Learn how to use "If" clauses for negotiations and strategic planning.',
    level: 'Advanced',
    icon: <Layers className="text-[#10B981]" size={24} />,
    color: 'emerald',
    href: '/dashboard/practice/grammar-2'
  },
  {
    id: 'vocab-2',
    title: 'Financial Vocabulary',
    category: 'Vocabulary',
    description: 'Key terms for reporting revenue, overhead, and ROI to stakeholders.',
    level: 'Intermediate',
    icon: <Zap className="text-[#8B5CF6]" size={24} />,
    color: 'violet',
    href: '/dashboard/practice/vocab-2'
  }
];

export default function PracticeLab() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-[#1E293B] pb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#F8FAFC] tracking-tight neon-text">
            Practice Lab
          </h1>
          <p className="font-sans text-gray-400 mt-2 text-sm flex items-center">
            <Sparkles size={14} className="mr-2 text-[#D97706]" />
            Sharpen your business communication skills with targeted interactive modules.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practiceModules.map((module, index) => (
          <Link href={module.href} key={module.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: '#D97706' }}
              className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-6 group transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0F172A] rounded-xl border border-[#1E293B] group-hover:border-[#334155] transition-colors">
                    {module.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                      {module.category} • {module.level}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D97706] transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2 max-w-xs">
                      {module.description}
                    </p>
                  </div>
                </div>
                <div className="text-gray-600 group-hover:text-[#D97706] group-hover:translate-x-1 transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
              
              {/* Progress Bar (Mock) */}
              <div className="mt-6">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase mb-2">
                  <span>Module Progress</span>
                  <span className="text-gray-400">0%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-[#D97706] rounded-full"></div>
                </div>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#D97706]/10 transition-colors"></div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Recommended Section */}
      <div className="mt-8 bg-[#0F172A] border border-[#1E293B] rounded-2xl p-8 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#D97706]/20 flex items-center justify-center">
            <CheckCircle2 className="text-[#D97706]" size={18} />
          </div>
          <h2 className="font-serif text-xl font-bold text-white">Daily Challenge</h2>
        </div>
        <p className="text-gray-400 text-sm max-w-xl">
          Complete today's specific grammar challenge on "Formal Negotiations" to earn a performance badge and boost your Executive Rank.
        </p>
        <button className="mt-6 px-6 py-3 bg-[#D97706] text-white rounded-xl font-bold text-sm hover:bg-[#B45309] transition-colors">
          Start Challenge
        </button>
      </div>
    </div>
  );
}
