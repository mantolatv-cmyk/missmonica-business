'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Users, Briefcase, Mail, Radio, Video, Plane, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const lessons = [
  {
    id: 1,
    title: "Lesson 1: Small Talks & Presentations",
    difficulty: "Beginner",
    objective: "Se apresentar para um colega internacional e conversa casual antes de uma reunião online.",
    vocab: "Employee, Team, Meeting, Schedule, Remote work",
    icon: <Users className="text-[#94A3B8]" size={20} />,
    image: "/lessons/lesson_1.png",
    href: "/dashboard/simulations/1"
  },
  {
    id: 2,
    title: "Lesson 2: Meetings & Communication",
    difficulty: "Intermediate",
    objective: "Como concordar, discordar e pedir esclarecimentos. Simulação rápida com atualização de tarefas.",
    vocab: "Deadline, Feedback, Project, Update, Agenda, Task",
    icon: <Briefcase className="text-[#10B981]" size={20} />,
    image: "/lessons/lesson_2.png",
    href: "/dashboard/simulations/2"
  },
  {
    id: 3,
    title: "Lesson 3: Interviews & HR",
    difficulty: "Advanced",
    objective: "Entrevistar um candidato internacional ou falar sobre experiência profissional.",
    vocab: "Resume / CV, Candidate, Interview, Skills, Experience",
    icon: <MessageSquare className="text-[#D97706]" size={20} />,
    image: "/lessons/lesson_3.png",
    href: "/dashboard/simulations/3"
  },
  {
    id: 4,
    title: "Lesson 4: Professional Emails",
    difficulty: "Intermediate",
    objective: "Estrutura de e-mail, frases formais, pedidos e respostas educadas.",
    vocab: "Attached, Request, Information, Confirmation, Schedule",
    icon: <Mail className="text-[#3B82F6]" size={20} />,
    image: "/lessons/lesson_4.png",
    href: "/dashboard/simulations/4"
  },
  {
    id: 5,
    title: "Lesson 5: Networking & Events",
    difficulty: "Advanced",
    objective: "Manter conversa profissional em conferências internacionais e eventos.",
    vocab: "Conference, Workshop, Networking, Industry, Career",
    icon: <Radio className="text-[#8B5CF6]" size={20} />,
    image: "/lessons/lesson_5.png",
    href: "/dashboard/simulations/5"
  },
  {
    id: 6,
    title: "Lesson 6: Teams & Online Calls",
    difficulty: "Intermediate",
    objective: "Simulação de reunião com problemas técnicos, confirmar informações e pedir repetição.",
    vocab: "Microphone, Camera, Connection, Screen sharing, Mute",
    icon: <Video className="text-[#EC4899]" size={20} />,
    image: "/lessons/lesson_6.png",
    href: "/dashboard/simulations/6"
  },
  {
    id: 7,
    title: "Lesson 7: Prepositions & Travel",
    difficulty: "Beginner",
    objective: "Entender posições e localização no contexto de aeroporto e viagens.",
    vocab: "At, In, On, Under, Behind, In front of, Between, Next to",
    icon: <Plane className="text-[#38BDF8]" size={20} />,
    image: "/lessons/lesson_7.png",
    href: "/dashboard/simulations/7"
  },
  {
    id: 8,
    title: "Lesson 8: DO / CAN / TO",
    difficulty: "Beginner",
    objective: "Aprenda quando usar DO, CAN e TO em perguntas e pedidos.",
    vocab: "Do, Can, To, Passport, Speak, Help, Water",
    icon: <Sparkles className="text-[#F59E0B]" size={20} />,
    image: "/lessons/lesson_8.png",
    href: "/dashboard/simulations/8"
  }
];

export default function LessonControl() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-[#1E293B] pb-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#F8FAFC] tracking-tight neon-text">
            Lesson Control
          </h1>
          <p className="font-sans text-gray-400 mt-2 text-sm flex items-center">
            <Sparkles size={14} className="mr-2 text-[#D97706]" />
            Select a business lesson to initiate your immersive conversational simulation.
          </p>
        </div>
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="h-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-[#0B1120] rounded-2xl overflow-hidden h-full flex flex-col group cursor-pointer neon-border relative shadow-2xl"
            >
              {/* Image Header */}
              <div className="relative h-44 w-full overflow-hidden bg-[#0F172A]">
                <Image 
                  src={lesson.image} 
                  alt={lesson.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent"></div>
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center border border-[#334155] shadow-lg">
                  {lesson.icon}
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                   <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter border
                    ${lesson.difficulty === 'Advanced' ? 'text-[#D97706] border-[#D97706]/50 bg-[#D97706]/20' : 
                      lesson.difficulty === 'Intermediate' ? 'text-[#10B981] border-[#10B981]/50 bg-[#10B981]/20' : 
                      'text-gray-400 border-gray-700 bg-gray-900/50'}`}
                  >
                    {lesson.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-serif text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#D97706] transition-colors line-clamp-1">
                  {lesson.title}
                </h2>
                <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2 h-8">
                  {lesson.objective}
                </p>

                <div className="mt-auto">
                  <div className="bg-[#0F172A] p-3 rounded-xl border border-[#1E293B] group-hover:border-[#D97706]/30 transition-colors">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Target Vocab</span>
                    <p className="text-[10px] text-gray-300 italic truncate">
                      {lesson.vocab}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <Link href={lesson.href} className="flex-1 text-center bg-[#D97706]/10 border border-[#D97706]/30 text-[#D97706] py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#D97706] hover:text-white transition-all">
                      Simulation
                    </Link>
                    <Link href={`/dashboard/practice/lesson-${lesson.id}`} className="flex-1 text-center bg-[#1E293B] border border-[#334155] text-gray-400 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-[#D97706]/50 hover:text-white transition-all">
                      Practice Lab
                    </Link>
                  </div>
                </div>
              </div>

              {/* Neon Glow Footer Line */}
              <div className="h-1 w-0 group-hover:w-full bg-[#D97706] transition-all duration-500 shadow-[0_0_10px_#D97706]"></div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
