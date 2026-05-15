'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Coffee, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const missions = [
  {
    id: 1,
    title: "Contract Negotiation (Supplier)",
    difficulty: "Advanced",
    objective: "Negotiate a 15% discount using diplomatic language without harming the relationship.",
    icon: <Briefcase className="text-[#D97706]" size={24} />,
    href: "/dashboard/simulations/1"
  },
  {
    id: 2,
    title: "Q3 Results Presentation",
    difficulty: "Intermediate",
    objective: "Present financial metrics clearly and field hostile questions from the board.",
    icon: <TrendingUp className="text-[#10B981]" size={24} />,
    href: "/dashboard/simulations/2"
  },
  {
    id: 3,
    title: "Elevator Pitch to CEO",
    difficulty: "Beginner",
    objective: "Deliver a concise, impactful summary of your new project in under 60 seconds.",
    icon: <Coffee className="text-[#94A3B8]" size={24} />,
    href: "/dashboard/simulations/3"
  },
  {
    id: 4,
    title: "Performance Review Feedback",
    difficulty: "Advanced",
    objective: "Deliver constructive criticism to an underperforming employee politely.",
    icon: <AlertTriangle className="text-red-400" size={24} />,
    href: "/dashboard/simulations/4"
  }
];

export default function MissionControl() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-[#1E293B] pb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Mission Control
          </h1>
          <p className="font-sans text-gray-400 mt-2 text-sm">
            Select a corporate scenario to initiate your immersive conversational simulation.
          </p>
        </div>
      </div>

      {/* Grid of Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((mission, index) => (
          <Link href={mission.href} key={mission.id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: '#1E293B' }}
              className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-6 h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D97706]/0 via-[#D97706]/10 to-[#D97706]/0 opacity-0 group-hover:opacity-100 transition duration-500 blur-lg pointer-events-none"></div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1E293B] flex items-center justify-center border border-[#334155]">
                    {mission.icon}
                  </div>
                  <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider border
                    ${mission.difficulty === 'Advanced' ? 'text-[#D97706] border-[#D97706]/30 bg-[#D97706]/10' : 
                      mission.difficulty === 'Intermediate' ? 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10' : 
                      'text-gray-300 border-gray-600 bg-gray-800'}`}
                  >
                    {mission.difficulty}
                  </span>
                </div>
                
                <h2 className="font-serif text-2xl font-bold text-[#F8FAFC] mb-3 group-hover:text-[#D97706] transition-colors">
                  {mission.title}
                </h2>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  {mission.objective}
                </p>
              </div>

              <div className="mt-8 flex items-center text-sm font-semibold text-[#D97706] group-hover:translate-x-2 transition-transform">
                Initiate Simulation <ArrowRight size={16} className="ml-2" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
