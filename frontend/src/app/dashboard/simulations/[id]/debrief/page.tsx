'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BarChart2, 
  Award,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const data = [
  { name: 'Diplomacy', score: 85, fill: '#10B981' },
  { name: 'Tech Terms', score: 92, fill: '#D97706' },
  { name: 'Clarity', score: 78, fill: '#3B82F6' },
];

export default function DebriefScreen({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col max-w-4xl mx-auto py-8">
      
      <div className="flex items-center mb-10">
        <Link href="/dashboard" className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1E293B] transition-colors mr-4">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F8FAFC]">Executive Debrief</h1>
          <p className="text-gray-400 text-sm mt-1">Mission 01: Supplier Negotiation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Score Radial Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-1 bg-[#0B1120] border border-[#1E293B] rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706] rounded-full blur-3xl opacity-10 pointer-events-none"></div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 w-full text-left">Overall Performance</h3>
          
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={10} data={data}>
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: '#1E293B' }}
                  dataKey="score"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full mt-4 space-y-2">
            {data.map(item => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.score}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Feedback */}
        <div className="md:col-span-2 space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-6"
          >
            <div className="flex items-center mb-4">
              <Award className="text-[#D97706] mr-2" size={20} />
              <h3 className="font-serif text-xl font-bold text-white">Executive Summary</h3>
            </div>
            <p className="text-gray-300 font-sans leading-relaxed text-sm">
              You handled the pressure well. Your negotiation tactics were grounded in facts rather than emotions, which is excellent for dealing with strict suppliers. However, your clarity dipped slightly when explaining the alternative timelines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0F172A] border border-[#10B981]/30 rounded-2xl p-5"
            >
              <h4 className="flex items-center text-[#10B981] font-bold text-sm mb-2">
                <CheckCircle2 size={16} className="mr-2" /> What went well
              </h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Used "Push back" naturally.</li>
                <li>• Maintained a polite tone despite aggressive AI prompts.</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0F172A] border border-[#D97706]/30 rounded-2xl p-5"
            >
              <h4 className="flex items-center text-[#D97706] font-bold text-sm mb-2">
                <AlertTriangle size={16} className="mr-2" /> Areas for Growth
              </h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Avoid using "I want". Use "We require".</li>
                <li>• Work on transitional phrases for smoother topic shifts.</li>
              </ul>
            </motion.div>
          </div>

          <Link href="/dashboard" className="block w-full text-center bg-[#D97706] text-white font-bold py-4 rounded-xl hover:bg-[#B45309] transition-colors shadow-lg">
            Return to Mission Control
          </Link>

        </div>
      </div>
    </div>
  );
}
