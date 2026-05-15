import React from 'react';
import { BookOpen, Briefcase, Mic, Trophy } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      {/* Header */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, João! 👋
          </h1>
          <p className="text-slate-500 mt-1">Ready to master your next negotiation?</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium flex items-center">
            <Trophy className="w-4 h-4 mr-2" />
            Level: B2 Intermediate
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md"></div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Track Section */}
        <section className="col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full opacity-50 -z-10"></div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-indigo-600" />
              Current Track: Cross-Cultural Meetings
            </h2>
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              60% Completed
            </span>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-3 mb-8">
            <div className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 w-[60%]"></div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center p-4 border border-slate-100 rounded-2xl hover:border-indigo-300 hover:shadow-md transition cursor-pointer group">
              <div className="bg-indigo-100 p-3 rounded-xl mr-4 group-hover:bg-indigo-600 group-hover:text-white transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Lesson 3: Interrupting Politely</h3>
                <p className="text-sm text-slate-500">Learn how to jump into the conversation seamlessly.</p>
              </div>
              <button className="px-5 py-2 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-indigo-600 transition">
                Continue
              </button>
            </div>
          </div>
        </section>

        {/* Workplace Simulation CTA */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="bg-white/20 w-max p-3 rounded-2xl mb-6 backdrop-blur-sm">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pending Simulation</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              You have a pending scenario from your teacher: "Dealing with an angry stakeholder on a Zoom call."
            </p>
          </div>
          <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-indigo-50 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Start Audio Simulation
          </button>
        </section>

      </div>
    </div>
  );
}
