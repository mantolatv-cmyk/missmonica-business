'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Users, Briefcase, Mail, Radio, Video, Plane } from 'lucide-react';
import Link from 'next/link';

const lessons = [
  {
    id: 1,
    title: "Lesson 1: Small Talks & Presentations",
    difficulty: "Beginner",
    objective: "Se apresentar para um colega internacional e conversa casual antes de uma reunião online.",
    vocab: "Employee, Team, Meeting, Schedule, Remote work, Multinational company",
    icon: <Users className="text-[#94A3B8]" size={24} />,
    href: "/dashboard/simulations/1"
  },
  {
    id: 2,
    title: "Lesson 2: Meetings & Communication",
    difficulty: "Intermediate",
    objective: "Como concordar, discordar e pedir esclarecimentos. Simulação rápida com atualização de tarefas.",
    vocab: "Deadline, Feedback, Project, Update, Agenda, Task, Follow-up",
    icon: <Briefcase className="text-[#10B981]" size={24} />,
    href: "/dashboard/simulations/2"
  },
  {
    id: 3,
    title: "Lesson 3: Interviews & HR",
    difficulty: "Advanced",
    objective: "Entrevistar um candidato internacional ou falar sobre experiência profissional.",
    vocab: "Resume / CV, Candidate, Interview, Skills, Experience, Strengths, Weaknesses",
    icon: <MessageSquare className="text-[#D97706]" size={24} />,
    href: "/dashboard/simulations/3"
  },
  {
    id: 4,
    title: "Lesson 4: Professional Emails",
    difficulty: "Intermediate",
    objective: "Estrutura de e-mail, frases formais, pedidos e respostas educadas.",
    vocab: "Attached, Request, Information, Confirmation, Availability, Schedule",
    icon: <Mail className="text-[#3B82F6]" size={24} />,
    href: "/dashboard/simulations/4"
  },
  {
    id: 5,
    title: "Lesson 5: Networking & Events",
    difficulty: "Advanced",
    objective: "Manter conversa profissional em conferências internacionais e eventos.",
    vocab: "Conference, Workshop, Networking, Business card, Industry, Career",
    icon: <Radio className="text-[#8B5CF6]" size={24} />,
    href: "/dashboard/simulations/5"
  },
  {
    id: 6,
    title: "Lesson 6: Teams & Online Calls",
    difficulty: "Intermediate",
    objective: "Simulação de reunião com problemas técnicos, confirmar informações e pedir repetição.",
    vocab: "Microphone, Camera, Connection, Screen sharing, Mute, Internet issue",
    icon: <Video className="text-[#EC4899]" size={24} />,
    href: "/dashboard/simulations/6"
  },
  {
    id: 7,
    title: "Lesson 7: Prepositions & Travel",
    difficulty: "Beginner",
    objective: "Entender posições e localização no contexto de aeroporto e viagens.",
    vocab: "At, In, On, Under, Behind, In front of, Between, Next to",
    icon: <Plane className="text-[#38BDF8]" size={24} />,
    href: "/dashboard/simulations/7"
  }
];

export default function LessonControl() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-[#1E293B] pb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Lesson Control
          </h1>
          <p className="font-sans text-gray-400 mt-2 text-sm">
            Select a business lesson to initiate your immersive conversational simulation.
          </p>
        </div>
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => (
          <Link href={lesson.href} key={lesson.id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: '#1E293B' }}
              className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-6 h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden shadow-lg"
            >
              {/* Subtle hover glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D97706]/0 via-[#D97706]/10 to-[#D97706]/0 opacity-0 group-hover:opacity-100 transition duration-500 blur-lg pointer-events-none"></div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1E293B] flex items-center justify-center border border-[#334155]">
                    {lesson.icon}
                  </div>
                  <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider border
                    ${lesson.difficulty === 'Advanced' ? 'text-[#D97706] border-[#D97706]/30 bg-[#D97706]/10' : 
                      lesson.difficulty === 'Intermediate' ? 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10' : 
                      'text-gray-300 border-gray-600 bg-gray-800'}`}
                  >
                    {lesson.difficulty}
                  </span>
                </div>
                
                <h2 className="font-serif text-xl font-bold text-[#F8FAFC] mb-2 group-hover:text-[#D97706] transition-colors">
                  {lesson.title}
                </h2>
                <p className="font-sans text-sm text-gray-400 leading-relaxed mb-4">
                  {lesson.objective}
                </p>

                <div className="bg-[#1E293B]/50 p-3 rounded-lg border border-[#334155]/50">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Target Vocab:</span>
                  <p className="text-xs text-gray-300 italic line-clamp-2">
                    {lesson.vocab}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm font-semibold text-[#D97706] group-hover:translate-x-2 transition-transform">
                Initiate Role Play <ArrowRight size={16} className="ml-2" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
