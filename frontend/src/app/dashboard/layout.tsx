'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Target, 
  Settings,
  Search,
  Bell
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar - Slim & Elegant */}
      <aside className="w-20 lg:w-64 bg-[#0F172A] flex flex-col items-center lg:items-start py-8 px-4 border-r border-[#1E293B] transition-all duration-300">
        <div className="mb-12 flex items-center justify-center lg:justify-start w-full px-2">
          <div className="w-10 h-10 rounded bg-[#D97706] flex items-center justify-center font-serif text-white font-bold text-xl shadow-lg">
            M
          </div>
          <span className="hidden lg:block ml-3 font-serif font-semibold text-white tracking-wide">
            Business
          </span>
        </div>

        <nav className="flex-1 w-full space-y-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<BookOpen size={20} />} label="Library" />
          <NavItem icon={<Briefcase size={20} />} label="Simulations" />
          <NavItem icon={<Target size={20} />} label="Goals" />
        </nav>

        <div className="w-full mt-auto">
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-20 bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search modules, idioms..." 
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D97706] focus:border-transparent text-sm font-sans transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Daily Executive Goal</span>
              <div className="flex items-center mt-1">
                <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-3">
                  <div className="h-full bg-[#10B981] w-[75%] rounded-full"></div>
                </div>
                <span className="text-sm font-bold text-[#0F172A]">75%</span>
              </div>
            </div>
            
            <button className="relative p-2 text-gray-400 hover:text-[#0F172A] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D97706] rounded-full"></span>
            </button>
            
            <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
              {/* Profile placeholder */}
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-8">
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
    <Link href="#" className={`flex items-center justify-center lg:justify-start w-full p-3 rounded-lg transition-colors duration-200 group ${active ? 'bg-[#1E293B] text-[#D97706]' : 'text-gray-400 hover:bg-[#1E293B] hover:text-white'}`}>
      <span className={`${active ? 'text-[#D97706]' : 'text-gray-400 group-hover:text-white'}`}>{icon}</span>
      <span className="hidden lg:block ml-3 text-sm font-medium">{label}</span>
    </Link>
  );
}
