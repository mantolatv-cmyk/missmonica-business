'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

interface DialogueTurn {
  sender: 'ai' | 'user';
  text: string;
}

const lessonsData: Record<string, any> = {
  "1": {
    title: "Small Talks & Presentations",
    aiRole: "International Colleague",
    contextTip: "Focus on using 'Nice to meet you' and 'Working on'. Maintain a polite and friendly tone.",
    phrasalVerbs: [
      { verb: "Catch up", meaning: "To exchange the latest news." },
      { verb: "Work on", meaning: "To be engaged in a project." }
    ],
    dialogue: [
      { sender: 'ai', text: "Hey! I'm John from the London office. We haven't met yet. How are things on your end before we start the meeting?" },
      { sender: 'user', text: "Hi John, nice to meet you. I'm doing well, thank you. Things are quite busy here with the new project launch." },
      { sender: 'ai', text: "I can imagine! It's always a bit hectic during a launch. Are you working remotely today or are you in the office?" },
      { sender: 'user', text: "I'm working from home today. We have a flexible schedule, so I usually come into the office only a few times a week." },
      { sender: 'ai', text: "That's great. We have something similar in London. Well, let's get started with the presentation, shall we?" },
      { sender: 'user', text: "Yes, let's. I'll share my screen to show the initial slides." }
    ]
  },
  "2": {
    title: "Meetings & Communication",
    aiRole: "Project Manager",
    contextTip: "Use 'I agree' or 'I see your point' before expressing a different opinion.",
    phrasalVerbs: [
      { verb: "Follow up", meaning: "To take further action on a task." },
      { verb: "Push back", meaning: "To delay a deadline." }
    ],
    dialogue: [
      { sender: 'ai', text: "Alright team, let's look at the agenda. We need to push back the deadline for the Q3 release. What's the status on the backend update?" },
      { sender: 'user', text: "I understand the urgency. I've been working on the API integration, and I expect it to be ready by Friday." },
      { sender: 'ai', text: "Friday? That's cutting it close. Is there any way we can speed up the process?" },
      { sender: 'user', text: "Let me check with the team. I agree that we need to stay on schedule, but we must ensure the quality is not compromised." },
      { sender: 'ai', text: "Fair enough. I'll follow up with you tomorrow morning for a final update." },
      { sender: 'user', text: "I'll send you an update as soon as I have more information." }
    ]
  },
  "3": {
    title: "Interviews & HR",
    aiRole: "HR Recruiter",
    contextTip: "Talk about your 'Strengths' and 'Experience' clearly and confidently.",
    phrasalVerbs: [
      { verb: "Walk through", meaning: "To explain something step by step." },
      { verb: "Take on", meaning: "To accept a responsibility." }
    ],
    dialogue: [
      { sender: 'ai', text: "Thank you for joining us today. Looking at your CV, you have strong experience. Can you walk me through your biggest professional achievement?" },
      { sender: 'user', text: "Certainly. At my previous company, I led a team that optimized our logistics process, which reduced costs by 15%." },
      { sender: 'ai', text: "That's impressive. What would you say is your biggest weakness when working in a team?" },
      { sender: 'user', text: "I sometimes take on too much responsibility myself, but I'm learning to delegate more effectively to my team members." },
      { sender: 'ai', text: "Great self-awareness. Why do you want to join our multinational company specifically?" },
      { sender: 'user', text: "I'm looking for a position that offers international exposure and the chance to contribute my skills to global projects." }
    ]
  },
  "4": {
    title: "Professional Emails",
    aiRole: "Enterprise Client",
    contextTip: "Use formal phrases like 'Please find attached' and 'Thank you for your time'.",
    phrasalVerbs: [
      { verb: "Send over", meaning: "To transfer a document to someone." },
      { verb: "Look into", meaning: "To investigate an issue." }
    ],
    dialogue: [
      { sender: 'ai', text: "Hi, I received the draft, but the schedule document seems to be missing. Could you please send it over as soon as possible?" },
      { sender: 'user', text: "I apologize for the oversight. Please find the schedule attached to this email." },
      { sender: 'ai', text: "Thank you. Also, could you confirm your availability for a brief call tomorrow to discuss the next steps?" },
      { sender: 'user', text: "I am available between 2 PM and 4 PM. Please let me know which time works best for you." },
      { sender: 'ai', text: "2 PM works for me. I'll send a meeting invite shortly. Thank you for your time." },
      { sender: 'user', text: "You're welcome. I look forward to our call." }
    ]
  },
  "5": {
    title: "Networking & Events",
    aiRole: "Conference Attendee",
    contextTip: "Use 'What do you do?' to learn more about people you meet. Mention your industry and career goals.",
    phrasalVerbs: [
      { verb: "Set up", meaning: "To establish a company or project." },
      { verb: "Reach out", meaning: "To contact someone for networking." }
    ],
    dialogue: [
      { sender: 'ai', text: "Great keynote, wasn't it? Hi, I'm Sarah from TechCorp. What industry are you in?" },
      { sender: 'user', text: "It was indeed! I'm in the IT sector, specifically focusing on cloud infrastructure. And you?" },
      { sender: 'ai', text: "I work in HR for a multinational firm. We're looking to expand our remote workforce. Do you have a business card?" },
      { sender: 'user', text: "Yes, here it is. I'd love to reach out and discuss how my skills might align with your company's needs." },
      { sender: 'ai', text: "Perfect. It was nice talking to you, let's stay in touch!" },
      { sender: 'user', text: "It was a pleasure meeting you too. Enjoy the rest of the conference!" }
    ]
  },
  "6": {
    title: "Teams & Online Calls",
    aiRole: "Remote Colleague",
    contextTip: "Troubleshoot common audio/video issues with phrases like 'Your microphone is muted' and 'I'll share my screen'.",
    phrasalVerbs: [
      { verb: "Cut out", meaning: "When audio/video suddenly stops working." },
      { verb: "Speak up", meaning: "To talk louder." }
    ],
    dialogue: [
      { sender: 'ai', text: "Hello? Can you hear me? I think my connection is a bit unstable. Let me try to share my screen..." },
      { sender: 'user', text: "Yes, I can hear you, but your audio is cutting out occasionally. I can see your screen now." },
      { sender: 'ai', text: "Sorry about that. Is my microphone muted? I'm having some internet issues today." },
      { sender: 'user', text: "No, your microphone is on, but you might need to speak up a bit. Should I repeat what I just said?" },
      { sender: 'ai', text: "Yes, please. I missed the last part about the Q4 projections." },
      { sender: 'user', text: "Of course. I'll share my screen and go over the projections one more time." }
    ]
  }
};

export default function ConversationalSimulator({ params }: { params: { id: string } }) {
  const lessonId = params.id;
  const lesson = lessonsData[lessonId] || lessonsData["1"];

  const [visibleStep, setVisibleStep] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleStep]);

  const handleNext = () => {
    if (visibleStep < lesson.dialogue.length) {
      setVisibleStep(prev => prev + 1);
    }
  };

  const isFinished = visibleStep >= lesson.dialogue.length;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-8 bg-[#0B1120]">
      {/* Simulation Header */}
      <div className="h-16 border-b border-[#1E293B] bg-[#0F172A] px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1E293B] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-4 w-px bg-[#1E293B] mr-4"></div>
          <span className="px-2.5 py-0.5 bg-[#D97706]/10 border border-[#D97706]/30 rounded text-[10px] font-bold text-[#D97706] uppercase tracking-widest mr-3">
            Lesson {lessonId}
          </span>
          <h1 className="font-serif font-bold text-[#F8FAFC] text-lg">
            {lesson.title}
          </h1>
        </div>
        
        <Link href={`/dashboard/simulations/${params.id}/debrief`} className={`text-sm font-semibold text-[#F8FAFC] bg-[#1E293B] px-4 py-2 rounded-lg hover:bg-[#334155] transition-colors border border-[#334155] ${!isFinished ? 'opacity-50 pointer-events-none' : ''}`}>
          {isFinished ? 'View Debrief' : 'Finish Dialogue first'}
        </Link>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Structured Dialogue Interface */}
        <div className="flex-1 flex flex-col relative">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <AnimatePresence>
              {lesson.dialogue.slice(0, visibleStep).map((turn: DialogueTurn, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: turn.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${turn.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-2xl p-5 rounded-2xl text-[15px] font-sans leading-relaxed shadow-sm
                    ${turn.sender === 'user' 
                      ? 'bg-[#1E293B] text-[#F8FAFC] rounded-br-sm border border-[#334155]' 
                      : 'bg-[#0F172A] text-gray-200 rounded-bl-sm border border-[#1E293B]'}`}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold mr-2 ${turn.sender === 'user' ? 'bg-[#334155] text-white' : 'bg-[#D97706] text-white'}`}>
                        {turn.sender === 'user' ? 'YOU' : 'AI'}
                      </div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {turn.sender === 'user' ? 'Professional' : lesson.aiRole}
                      </span>
                    </div>
                    {turn.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Interaction Area */}
          <div className="p-10 bg-[#0F172A] border-t border-[#1E293B] flex flex-col items-center">
            {!isFinished ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="group flex items-center bg-[#D97706] text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:bg-[#B45309] transition-all"
              >
                <ChevronRight className="mr-2 group-hover:translate-x-1 transition-transform" size={24} />
                Continue Dialogue
              </motion.button>
            ) : (
              <div className="text-center">
                <p className="text-[#10B981] font-serif text-xl font-bold mb-4 flex items-center justify-center">
                  <CheckCircle2 className="mr-2" /> Role Play Completed
                </p>
                <Link href={`/dashboard/simulations/${params.id}/debrief`} className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  <Play className="mr-2" size={20} /> Get Executive Feedback
                </Link>
              </div>
            )}
            <p className="mt-4 text-xs text-gray-500 font-sans">
              Click to reveal the next step of the business interaction.
            </p>
          </div>
        </div>

        {/* Right Side: Executive Prompter */}
        <div className="w-80 border-l border-[#1E293B] bg-[#0F172A] flex flex-col shrink-0">
          <div className="p-6 border-b border-[#1E293B] flex items-center">
            <Sparkles className="text-[#D97706] mr-2" size={20} />
            <h2 className="font-serif font-bold text-lg text-[#F8FAFC]">Executive Prompter</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4">
              <h3 className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <CheckCircle2 size={14} className="text-[#10B981] mr-1.5" /> Context Tip
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                {lesson.contextTip}
              </p>
            </div>

            <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4">
              <h3 className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <AlertCircle size={14} className="text-[#D97706] mr-1.5" /> Suggested Phrasal Verbs
              </h3>
              <ul className="space-y-3">
                {lesson.phrasalVerbs.map((pv: any, index: number) => (
                  <li key={index} className="text-sm border-l-2 border-[#D97706] pl-3">
                    <span className="text-white font-semibold block mb-0.5">{pv.verb}</span>
                    <span className="text-gray-500 text-xs">{pv.meaning}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
