'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  Flame, 
  TrendingUp,
  MapPin,
  Calendar,
  Briefcase,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  User
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const stats = [
    { label: 'Lessons Done', value: '12', icon: <CheckCircle size={20} className="text-emerald-400" /> },
    { label: 'Vocab Mastered', value: '148', icon: <BookOpen size={20} className="text-blue-400" /> },
    { label: 'Study Streak', value: '5 Days', icon: <Flame size={20} className="text-orange-500" /> },
    { label: 'Success Rate', value: '94%', icon: <TrendingUp size={20} className="text-[#D97706]" /> }
  ];

  const recentActivity = [
    { title: 'Completed Lesson 3', subtitle: 'Advanced Business Interviews', time: '2 hours ago', icon: <Trophy size={16} /> },
    { title: 'Mastered 15 new words', subtitle: 'In Professional Emails', time: 'Yesterday', icon: <StarIcon size={16} /> },
    { title: 'High Score in Practice Lab', subtitle: '98% accuracy in Lesson 2', time: '3 days ago', icon: <Target size={16} /> }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
        </Link>
      </div>

      {/* Profile Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0B1120] border border-[#1E293B] rounded-3xl overflow-hidden shadow-2xl mb-8"
      >
        <div className="h-48 bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#D97706]/20 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-8">
            <div className="w-32 h-32 rounded-3xl bg-[#0F172A] border-4 border-[#0B1120] overflow-hidden shadow-2xl flex items-center justify-center text-gray-500 relative group">
              <div className="w-full h-full bg-[#1E293B] flex items-center justify-center">
                <User size={48} className="text-gray-600" />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="text-[10px] font-bold text-white uppercase">Change</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-serif text-3xl font-bold text-white">Monica Executive</h1>
                <span className="px-2 py-0.5 bg-[#D97706]/20 border border-[#D97706]/50 text-[#D97706] text-[10px] font-black rounded uppercase tracking-widest">
                  Director
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1.5"><MapPin size={14} /> São Paulo, BR</div>
                <div className="flex items-center gap-1.5"><Briefcase size={14} /> Senior Project Manager</div>
                <div className="flex items-center gap-1.5"><Calendar size={14} /> Joined April 2024</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="px-6 py-3 bg-[#D97706] text-white rounded-xl font-bold text-sm hover:bg-[#B45309] transition-all shadow-lg shadow-[#D97706]/10">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-[#0F172A] border border-[#1E293B] rounded-2xl flex items-center gap-4 group hover:border-[#D97706]/30 transition-all">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">{stat.label}</span>
                  <span className="text-lg font-bold text-white">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-white">Recent Activity</h2>
            <button className="text-xs font-bold text-[#D97706] hover:underline uppercase tracking-widest">View All</button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="p-6 bg-[#0B1120] border border-[#1E293B] rounded-2xl flex items-center gap-6 hover:border-[#1E293B] hover:bg-[#1E293B]/10 transition-all">
                <div className="p-3 bg-[#D97706]/10 text-[#D97706] rounded-xl">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold">{activity.title}</h4>
                  <p className="text-sm text-gray-500">{activity.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Level Progress */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-2xl font-bold text-white">Learning Path</h2>
          
          <div className="p-8 bg-[#0F172A] border border-[#D97706]/20 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Trophy size={80} className="text-[#D97706]" />
            </div>
            
            <span className="text-[10px] font-black text-[#D97706] uppercase tracking-[0.3em] block mb-4">Current Level</span>
            <h3 className="text-3xl font-bold text-white mb-6">Executive <span className="text-[#D97706]">B2+</span></h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span className="text-gray-400">Next Milestone</span>
                <span className="text-[#D97706]">68%</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  className="h-full bg-gradient-to-r from-[#D97706] to-amber-400 shadow-[0_0_10px_rgba(217,119,6,0.5)]"
                ></motion.div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                "You're only 3 lessons away from reaching the C1 Advanced Professional tier."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StarIcon({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
