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
      { sender: 'ai', text: "That's great. We have something similar in London. By the way, have you had a chance to look at the team introduction slides?" },
      { sender: 'user', text: "Yes, I have. They look very professional. I think they really capture our team's dynamic well." },
      { sender: 'ai', text: "Glad you liked them! We're trying to make sure everyone in the multinational company feels connected. Do you often work with the London team?" },
      { sender: 'user', text: "Not as often as I'd like, but I'm looking forward to more collaboration in the future. It's a great opportunity to learn from different perspectives." },
      { sender: 'ai', text: "Absolutely. Well, let's get started with the presentation, shall we? I'm excited to hear your thoughts on the first few modules." },
      { sender: 'user', text: "Yes, let's. I'll share my screen and we can walk through the initial phases together." },
      { sender: 'ai', text: "Perfect. I'm all ears!" },
      { sender: 'user', text: "Great. First, I'd like to present the coordinator's role in this project..." }
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
      { sender: 'ai', text: "Alright team, let's look at the agenda for today's meeting. First item: we need to discuss the project deadline for the Q3 release. What's the current status?" },
      { sender: 'user', text: "I agree that we need to review the timeline. Regarding the update on my tasks, I've completed the initial phase, but I need more feedback from the design team." },
      { sender: 'ai', text: "I see. The design team is currently focused on the mobile layout. Can you repeat the part about the feedback you need?" },
      { sender: 'user', text: "Certainly. I need clarification on the brand guidelines before I can finalize the backend integration. Can you repeat that last part about the mobile layout?" },
      { sender: 'ai', text: "Yes, they are finalizing the mobile assets today. We might need to push back the team alignment session to Thursday." },
      { sender: 'user', text: "Let me check my schedule for Thursday. I think I have a follow-up meeting with the client then, but I can make it work." },
      { sender: 'ai', text: "Great. Also, we need to ensure everyone is on the same page regarding the new feature set. Any concerns?" },
      { sender: 'user', text: "I think we should prioritize the core features first to ensure we meet the primary deadline. What do you think?" },
      { sender: 'ai', text: "That's a valid point. Let's focus on the essential tasks first and keep the extra features as secondary objectives." },
      { sender: 'user', text: "Agreed. I'll send you an update via email with the revised task breakdown later today." },
      { sender: 'ai', text: "Thank you. Please ensure the project update is shared with everyone before the meeting ends. Do you have any other points for the agenda?" },
      { sender: 'user', text: "No other points from my side. I'll also follow up with the design team right after this call." }
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
      { sender: 'ai', text: "Thank you for joining this interview session today. We are looking for a candidate with strong international experience for this position. Can you walk me through your professional background?" },
      { sender: 'user', text: "Thank you for the opportunity. As you can see on my Resume, I have over five years of experience in project management, specifically working with multinational teams." },
      { sender: 'ai', text: "That's a solid foundation. In this position, you'll need to handle high-pressure skills. What would you say are your main strengths and weaknesses?" },
      { sender: 'user', text: "My main strength is my ability to adapt to new environments quickly. As for a weakness, I sometimes focus too much on details, but I'm working on balancing that with the bigger picture." },
      { sender: 'ai', text: "I appreciate the honesty. How do you handle conflict within a remote team?" },
      { sender: 'user', text: "I believe in clear communication and setting expectations early. My experience has taught me that most issues can be resolved with a quick alignment call." },
      { sender: 'ai', text: "That's a good approach. Can you give me an example of a time you had to take on a task outside of your usual scope?" },
      { sender: 'user', text: "Certainly. Last year, I stepped in to lead the client presentation when our supervisor was unavailable. It was a challenging but rewarding experience." },
      { sender: 'ai', text: "Impressive. And what are your expectations for your career growth within our company?" },
      { sender: 'user', text: "I'm looking for a position that offers international exposure and the chance to contribute my skills to global projects while growing into a leadership role." },
      { sender: 'ai', text: "Excellent. We will be in touch soon regarding the next steps of the recruitment process." },
      { sender: 'user', text: "Thank you for your time. I look forward to hearing from you." }
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
      { sender: 'ai', text: "Hi, I received your request for the Q4 information, but the schedule document seems to be missing from the thread. Could you please send it over?" },
      { sender: 'user', text: "I apologize for the oversight. Please find attached the updated schedule and the budget confirmation document you requested." },
      { sender: 'ai', text: "Thank you. I see the attachment now. Also, I need to check your availability for a brief meeting next week. Does Monday work for you?" },
      { sender: 'user', text: "Could you help me with the specific time? I have some availability in the afternoon. Thank you for your time and for looking into this so quickly." },
      { sender: 'ai', text: "Monday at 3 PM would be perfect. I'll send a calendar invite shortly to confirm the schedule." },
      { sender: 'user', text: "That works for me. By the way, did you receive the confirmation for the last payment?" },
      { sender: 'ai', text: "Let me check... Yes, it was processed yesterday. We'll send the official receipt by the end of the week." },
      { sender: 'user', text: "That's great to hear. Is there anything else you need from my side before our meeting?" },
      { sender: 'ai', text: "Not for now. I'll review the documents you sent and we can discuss them in detail on Monday." },
      { sender: 'user', text: "Understood. I'll make sure to have all the necessary information ready." },
      { sender: 'ai', text: "Perfect. Have a great weekend!" },
      { sender: 'user', text: "Thank you, you too. Talk to you on Monday." }
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
      { sender: 'ai', text: "The networking session is quite busy today! Hi, I'm Sarah from an international tech firm. Which company do you work for?" },
      { sender: 'user', text: "Hi Sarah! It's a great conference. I work for a multinational industry leader in IT. What do you do at your firm?" },
      { sender: 'ai', text: "I work in HR, focusing on career development and talent opportunity. Is this your first time at this workshop?" },
      { sender: 'user', text: "Yes, it is! I'm here to expand my professional contact list and learn about new trends in the industry. It's a great opportunity." },
      { sender: 'ai', text: "Absolutely. I've heard your company is doing some amazing things with cloud infrastructure lately. Are you involved in that?" },
      { sender: 'user', text: "Yes, I am. I'm currently working on a project to optimize our data center efficiency. It's been quite a challenge!" },
      { sender: 'ai', text: "I can imagine. We're also looking to improve our tech stack in the coming months. Perhaps we could share some insights?" },
      { sender: 'user', text: "I'd love that. It's always beneficial to see how others in the industry are tackling similar issues." },
      { sender: 'ai', text: "Definitely. Here is my business card. We should stay in touch regarding future projects." },
      { sender: 'user', text: "Thank you. I'll make sure to reach out to you on LinkedIn as well." },
      { sender: 'ai', text: "Great! It was nice talking to you, Sarah. Enjoy the rest of the event!" },
      { sender: 'user', text: "It was a pleasure meeting you too. Have a great time at the remaining workshops!" }
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
      { sender: 'ai', text: "Hello? Can you hear me? I think my connection is a bit unstable today. Wait, I think your microphone is muted." },
      { sender: 'user', text: "Sorry about that! Can you hear me now? I was having a minor audio issue with my headset." },
      { sender: 'ai', text: "Yes, much better. I'll share my screen now to show you the latest project metrics. Can you see the camera feed as well?" },
      { sender: 'user', text: "I can see your screen, but the connection seems a bit slow. Could you repeat that last part, please? You cut out for a second." },
      { sender: 'ai', text: "Sure. I said the internet issue might be on my end. I'll try to turn off my camera to save bandwidth. Better now?" },
      { sender: 'user', text: "Yes, the audio is much clearer now. Thank you for making that adjustment." },
      { sender: 'ai', text: "No problem. Now, looking at the graph on the screen, do you see the dip in engagement for Q3?" },
      { sender: 'user', text: "I see it. I think we need to look into the external factors that might have caused that." },
      { sender: 'ai', text: "Agreed. I'll send you the detailed report after this call so you can analyze it further." },
      { sender: 'user', text: "That would be very helpful. I'll also share my thoughts on it during our next call." },
      { sender: 'ai', text: "Perfect. Let's continue with the rest of the slides. Oh, wait, I think I'm having another connection issue..." },
      { sender: 'user', text: "Don't worry, I can still hear you. Let's keep going, and if it gets worse, we can switch to an audio-only call." }
    ]
  },
  "7": {
    title: "Prepositions & Travel",
    aiRole: "Airport Agent",
    contextTip: "Use prepositions like 'in', 'on', 'next to' and 'between' to describe locations accurately.",
    phrasalVerbs: [
      { verb: "Check in", meaning: "To register at an airport or hotel." },
      { verb: "Go through", meaning: "To pass through security or a gate." }
    ],
    dialogue: [
      { sender: 'ai', text: "Welcome to the airport. To proceed with your check-in, where is your passport?" },
      { sender: 'user', text: "It is in my bag. Let me get it for you." },
      { sender: 'ai', text: "Thank you. Please place your suitcase on the scale next to the counter." },
      { sender: 'user', text: "Okay, it is on the scale now. Is the weight acceptable?" },
      { sender: 'ai', text: "Yes, it's perfect. Now, please stand in front of the camera for the identification photo." },
      { sender: 'user', text: "I am in front of the camera. Should I look directly at the lens?" },
      { sender: 'ai', text: "Yes, please. Thank you. Your gate is number 12. It is next to the restaurant, between the pharmacy and the café." },
      { sender: 'user', text: "Thank you. Is the restaurant behind the security check area?" },
      { sender: 'ai', text: "Exactly, it is behind security. The coffee shop is also right next to it." },
      { sender: 'user', text: "I see it. Oh, I think my phone is under the chair. Let me grab it before I go." },
      { sender: 'ai', text: "No problem. Once you have it, you can go through gate 12. Have a safe flight!" },
      { sender: 'user', text: "Thank you for your help. Have a great day!" }
    ]
  }
};

export default function ConversationalSimulator({ params }: { params: Promise<{ id: string }> }) {
  const { id: lessonId } = React.use(params);
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
        
        <Link href={`/dashboard/simulations/${lessonId}/debrief`} className={`text-sm font-semibold text-[#F8FAFC] bg-[#1E293B] px-4 py-2 rounded-lg hover:bg-[#334155] transition-colors border border-[#334155] ${!isFinished ? 'opacity-50 pointer-events-none' : ''}`}>
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
                <Link href={`/dashboard/simulations/${lessonId}/debrief`} className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
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
