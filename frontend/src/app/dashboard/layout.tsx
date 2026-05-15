'use client';

import React from 'react';
import { 
  Target, 
  Settings,
  Search,
  UserCircle
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0F172A] text-[#F8FAFC]">
      {/* Sidebar - Slim & Elegant */}
      <aside className="w-20 lg:w-64 bg-[#0B1120] flex flex-col items-center lg:items-start py-8 px-4 border-r border-[#1E293B] transition-all duration-300">
        <div className="mb-12 flex items-center justify-center lg:justify-start w-full px-2">
          <div className="w-10 h-10 rounded bg-[#D97706] flex items-center justify-center font-serif text-white font-bold text-xl shadow-lg">
            M
          </div>
          <span className="hidden lg:block ml-3 font-serif font-semibold text-white tracking-wide">
            Business
          </span>
        </div>

        <nav className="flex-1 w-full space-y-4">
          <NavItem icon={<Target size={20} />} label="Mission Control" active />
        </nav>

        <div className="w-full mt-auto">
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 bg-[#0F172A] border-b border-[#1E293B] px-8 flex items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search missions..." 
              className="w-full pl-10 pr-4 py-2 bg-[#1E293B] border border-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-[#D97706] focus:border-transparent text-sm font-sans transition-all text-[#F8FAFC] placeholder-gray-500"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Executive Rank</span>
              <span className="text-sm font-bold text-[#D97706] font-serif">Director</span>
            </div>
            
            <div className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
              <UserCircle size={28} />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-8 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link href="/dashboard" className={`flex items-center justify-center lg:justify-start w-full p-3 rounded-lg transition-colors duration-200 group ${active ? 'bg-[#1E293B] text-[#D97706]' : 'text-gray-500 hover:bg-[#1E293B] hover:text-white'}`}>
      <span className={`${active ? 'text-[#D97706]' : 'text-gray-500 group-hover:text-white'}`}>{icon}</span>
      <span className="hidden lg:block ml-3 text-sm font-medium">{label}</span>
    </Link>
  );
}
