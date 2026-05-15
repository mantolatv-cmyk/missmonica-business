'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  Clock, 
  ArrowUpRight,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const fluencyData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 74 },
  { month: 'Apr', score: 72 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 89 },
];

export default function ExecutiveDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#0F172A] tracking-tight">
            War Room
          </h1>
          <p className="font-sans text-gray-500 mt-2 text-sm">
            Overview of your executive communication metrics.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">
            Current Level
          </p>
          <div className="inline-flex items-center px-4 py-1.5 rounded bg-white border border-[#E2E8F0] shadow-sm">
            <span className="font-serif font-bold text-[#D97706] text-lg">C1</span>
            <span className="ml-2 font-sans text-sm font-medium text-[#0F172A]">Advanced</span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Next Meeting Simulation */}
        <motion.div 
          whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(217, 119, 6, 0.1)' }}
          className="lg:col-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm relative overflow-hidden group transition-all duration-300"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97706] rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center text-white shadow-md">
                <Briefcase size={24} />
              </div>
              <div className="ml-4">
                <h2 className="font-serif text-2xl font-bold text-[#0F172A]">Board Presentation Prep</h2>
                <p className="font-sans text-sm text-gray-500 flex items-center mt-1">
                  <Clock size={14} className="mr-1" /> Due in 2 days
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
              Simulation
            </span>
          </div>

          <div className="bg-[#F8FAFC] rounded-xl p-5 border border-[#E2E8F0] mb-8">
            <p className="font-sans text-[#0F172A] text-sm leading-relaxed">
              <span className="font-semibold">Scenario:</span> You are required to present the Q3 financial results to the international board of directors, addressing the recent supply chain delays and proposing the Q4 mitigation strategy.
            </p>
          </div>

          <Link href="/dashboard/simulations" className="w-full bg-[#0F172A] text-white font-sans font-medium py-4 rounded-xl hover:bg-[#1E293B] transition-colors shadow-md flex items-center justify-center">
            <PlayCircle size={18} className="mr-2" /> Start Immersive Simulation
          </Link>
        </motion.div>

        {/* Card 2: Fluency KPI */}
        <motion.div 
          whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}
          className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="font-sans text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Fluency KPI
            </h3>
            <div className="flex items-end">
              <span className="font-serif text-5xl font-bold text-[#0F172A]">89</span>
              <span className="text-sm font-medium text-[#10B981] flex items-center ml-3 mb-1 bg-emerald-50 px-2 py-0.5 rounded">
                <ArrowUpRight size={14} className="mr-1" /> +4%
              </span>
            </div>
          </div>

          <div className="h-40 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fluencyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#0F172A', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="score" stroke="#0F172A" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Card 3: Word of the Day */}
        <motion.div 
          whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(217, 119, 6, 0.1)' }}
          className="bg-[#0F172A] rounded-2xl p-8 shadow-xl text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-sans text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Business Idiom
            </h3>
            <button className="text-gray-400 hover:text-[#D97706] transition-colors">
              <PlayCircle size={24} />
            </button>
          </div>

          <div>
            <h4 className="font-serif text-3xl font-bold mb-2">Think outside the box</h4>
            <p className="font-sans text-sm text-gray-400 italic mb-6">
              /θɪŋk aʊtˈsaɪd ðə bɒks/
            </p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-sm font-medium leading-relaxed">
                <span className="text-[#D97706] mr-2">Usage:</span>
                "To solve this supply chain issue, we really need to think outside the box."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Quick Actions / Milestones */}
        <motion.div 
          whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}
          className="lg:col-span-2 bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-[#10B981] mr-4">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0F172A]">Milestone Unlocked</h3>
              <p className="text-sm text-gray-500 font-sans">Successfully negotiated 5 emails with positive sentiment.</p>
            </div>
          </div>
          <button className="text-sm font-semibold text-[#0F172A] border border-[#0F172A] px-5 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors">
            View Certificate
          </button>
        </motion.div>

      </div>
    </div>
  );
}
