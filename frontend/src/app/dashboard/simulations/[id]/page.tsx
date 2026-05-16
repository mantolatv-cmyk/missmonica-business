'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Play, Languages, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface DialogueTurn {
  sender: 'ai' | 'user';
  text: string;
  translation: string;
}

const lessonsData: Record<string, any> = {
  "1": {
    title: "Small Talks & Presentations",
    aiRole: "International Colleague",
    difficultySettings: {
      Beginner: {
        contextTip: "Focus on basic greetings. Use 'Hi', 'Hello', and 'How are you?'.",
        goal: "Introduce yourself simply and mention your city.",
        keyVocabulary: ["Hi", "Meeting", "Office", "Name"]
      },
      Intermediate: {
        contextTip: "Focus on building rapport. Use 'Nice to meet you' and ask about their work.",
        goal: "Engage in small talk about remote work and team dynamics.",
        keyVocabulary: ["Catch up", "Remote work", "Schedule", "Multinational"]
      },
      Advanced: {
        contextTip: "Focus on executive nuances. Use 'Rapport', 'Stakeholder', and lead the transition to business.",
        goal: "Manage a complex professional introduction and set the agenda for the meeting.",
        keyVocabulary: ["Stakeholder", "Rapport", "Strategic", "Keynote"]
      }
    },
    introduction: {
      scenario: "You are joining an online meeting a few minutes early. You meet John, a colleague from the London office, whom you've never spoken to before.",
      scenarioTranslation: "Você está entrando em uma reunião online alguns minutos mais cedo. Você encontra John, um colega do escritório de Londres, com quem você nunca falou antes.",
    },
    phrasalVerbs: [
      { verb: "Catch up", meaning: "To exchange the latest news." },
      { verb: "Work on", meaning: "To be engaged in a project." }
    ],
    dialogue: [
      { sender: 'ai', text: "Hey! I'm John from the London office. We haven't met yet. How are things on your end before we start the meeting?", translation: "Ei! Eu sou o John do escritório de Londres. Nós ainda não nos conhecemos. Como estão as coisas por aí antes de começarmos a reunião?" },
      { sender: 'user', text: "Hi John, nice to meet you. I'm doing well, thank you. Things are quite busy here with the new project launch.", translation: "Oi John, prazer em conhecê-lo. Estou bem, obrigado. As coisas estão bem movimentadas aqui com o lançamento do novo projeto." },
      { sender: 'ai', text: "I can imagine! It's always a bit hectic during a launch. Are you working remotely today or are you in the office?", translation: "Eu imagino! É sempre um pouco caótico durante um lançamento. Você está trabalhando remotamente hoje ou está no escritório?" },
      { sender: 'user', text: "I'm working from home today. We have a flexible schedule, so I usually come into the office only a few times a week.", translation: "Estou trabalhando de casa hoje. Temos um horário flexível, então geralmente vou ao escritório apenas algumas vezes por semana." },
      { sender: 'ai', text: "That's great. We have something similar in London. By the way, have you had a chance to look at the team introduction slides?", translation: "Que ótimo. Temos algo parecido em Londres. Aliás, você teve a chance de dar uma olhada nos slides de introdução da equipe?" },
      { sender: 'user', text: "Yes, I have. They look very professional. I think they really capture our team's dynamic well.", translation: "Sim, eu vi. Eles parecem muito profissionais. Acho que capturam muito bem a dinâmica da nossa equipe." },
      { sender: 'ai', text: "Glad you liked them! We're trying to make sure everyone in the multinational company feels connected. Do you often work with the London team?", translation: "Fico feliz que tenha gostado! Estamos tentando garantir que todos na empresa multinacional se sintam conectados. Você trabalha com frequência com a equipe de Londres?" },
      { sender: 'user', text: "Not as often as I'd like, but I'm looking forward to more collaboration in the future. It's a great opportunity to learn from different perspectives.", translation: "Não tão frequentemente quanto eu gostaria, mas estou ansioso por mais colaboração no futuro. É uma ótima oportunidade para aprender com diferentes perspectivas." },
      { sender: 'ai', text: "Absolutely. Well, let's get started with the presentation, shall we? I'm excited to hear your thoughts on the first few modules.", translation: "Com certeza. Bem, vamos começar a apresentação, então? Estou animado para ouvir seus pensamentos sobre os primeiros módulos." },
      { sender: 'user', text: "Yes, let's. I'll share my screen and we can walk through the initial phases together.", translation: "Sim, vamos. Vou compartilhar minha tela e podemos passar pelas fases iniciais juntos." },
      { sender: 'ai', text: "Perfect. I'm all ears!", translation: "Perfeito. Sou todo ouvidos!" },
      { sender: 'user', text: "Great. First, I'd like to present the coordinator's role in this project...", translation: "Ótimo. Primeiro, eu gostaria de apresentar o papel do coordenador neste projeto..." }
    ]
  },
  "2": {
    title: "Meetings & Communication",
    aiRole: "Project Manager",
    difficultySettings: {
      Beginner: {
        contextTip: "Use 'Yes' and 'No' clearly. Practice 'I can' and 'I will'.",
        goal: "Confirm your attendance and mention your current task.",
        keyVocabulary: ["Meeting", "Task", "Yes", "Now"]
      },
      Intermediate: {
        contextTip: "Use 'I agree' or 'I see your point' before expressing a different opinion.",
        goal: "Communicate task progress, request feedback, and handle schedule changes professionally.",
        keyVocabulary: ["Deadline", "Feedback", "Agenda", "Push back"]
      },
      Advanced: {
        contextTip: "Focus on strategic alignment. Use 'Prioritize', 'Bandwidth', and 'Bottleneck'.",
        goal: "Lead the meeting discussion, address resource bottlenecks, and redefine project milestones.",
        keyVocabulary: ["Prioritize", "Milestone", "Bottleneck", "Stakeholder"]
      }
    },
    introduction: {
      scenario: "You are in a weekly alignment meeting. The Project Manager is reviewing the Q3 release schedule and needs status updates.",
      scenarioTranslation: "Você está em uma reunião semanal de alinhamento. O Gerente de Projeto está revisando o cronograma de lançamento do terceiro trimestre e precisa de atualizações de status.",
    },
    phrasalVerbs: [
      { verb: "Follow up", meaning: "To take further action on a task." },
      { verb: "Push back", meaning: "To delay a deadline." }
    ],
    dialogue: [
      { sender: 'ai', text: "Alright team, let's look at the agenda for today's meeting. First item: we need to discuss the project deadline for the Q3 release. What's the current status?", translation: "Tudo bem equipe, vamos olhar a pauta da reunião de hoje. Primeiro item: precisamos discutir o prazo do projeto para o lançamento do terceiro trimestre. Qual é o status atual?" },
      { sender: 'user', text: "I agree that we need to review the timeline. Regarding the update on my tasks, I've completed the initial phase, but I need more feedback from the design team.", translation: "Eu concordo que precisamos revisar o cronograma. Sobre a atualização das minhas tarefas, concluí a fase inicial, mas preciso de mais feedback da equipe de design." },
      { sender: 'ai', text: "I see. The design team is currently focused on the mobile layout. Can you repeat the part about the feedback you need?", translation: "Entendo. A equipe de design está focada no layout mobile no momento. Você pode repetir a parte sobre o feedback que você precisa?" },
      { sender: 'user', text: "Certainly. I need clarification on the brand guidelines before I can finalize the backend integration. Can you repeat that last part about the mobile layout?", translation: "Com certeza. Preciso de esclarecimentos sobre as diretrizes da marca antes de finalizar a integração do backend. Você pode repetir aquela última parte sobre o layout mobile?" },
      { sender: 'ai', text: "Yes, they are finalizing the mobile assets today. We might need to push back the team alignment session to Thursday.", translation: "Sim, eles estão finalizando os recursos mobile hoje. Talvez precisemos adiar a sessão de alinhamento da equipe para quinta-feira." },
      { sender: 'user', text: "Let me check my schedule for Thursday. I think I have a follow-up meeting with the client then, but I can make it work.", translation: "Deixe-me verificar minha agenda para quinta-feira. Acho que tenho uma reunião de acompanhamento com o cliente, mas posso dar um jeito." },
      { sender: 'ai', text: "Great. Also, we need to ensure everyone is on the same page regarding the new feature set. Any concerns?", translation: "Ótimo. Além disso, precisamos garantir que todos estejam na mesma página em relação ao novo conjunto de recursos. Alguma preocupação?" },
      { sender: 'user', text: "I think we should prioritize the core features first to ensure we meet the primary deadline. What do you think?", translation: "Acho que deveríamos priorizar os recursos principais primeiro para garantir que cumpramos o prazo principal. O que você acha?" },
      { sender: 'ai', text: "That's a valid point. Let's focus on the essential tasks first and keep the extra features as secondary objectives.", translation: "Esse é um ponto válido. Vamos focar nas tarefas essenciais primeiro e manter os recursos extras como objetivos secundários." },
      { sender: 'user', text: "Agreed. I'll send you an update via email with the revised task breakdown later today.", translation: "Concordo. Vou enviar uma atualização por e-mail com a divisão de tarefas revisada ainda hoje." },
      { sender: 'ai', text: "Thank you. Please ensure the project update is shared with everyone before the meeting ends. Do you have any other points for the agenda?", translation: "Obrigado. Por favor, certifique-se de que a atualização do projeto seja compartilhada com todos antes que a reunião termine. Você tem algum outro ponto para a pauta?" },
      { sender: 'user', text: "No other points from my side. I'll also follow up with the design team right after this call.", translation: "Sem outros pontos da minha parte. Também vou fazer o acompanhamento com a equipe de design logo após esta chamada." }
    ]
  },
  "3": { title: "Interviews & HR", aiRole: "HR Recruiter", difficultySettings: { Beginner: { contextTip: "Practice your name and role.", goal: "Introduce yourself.", keyVocabulary: ["Name", "Job"] }, Intermediate: { contextTip: "Talk about strengths.", goal: "Explain experience.", keyVocabulary: ["Resume", "Skills"] }, Advanced: { contextTip: "Focus on STAR method.", goal: "Demonstrate leadership.", keyVocabulary: ["Leadership", "Stakeholder"] } }, introduction: { scenario: "HR Interview.", scenarioTranslation: "Entrevista de RH." }, phrasalVerbs: [], dialogue: [] },
  "4": { title: "Professional Emails", aiRole: "Client", difficultySettings: { Beginner: { contextTip: "Use 'Hi' and 'Thanks'.", goal: "Send a short note.", keyVocabulary: ["Email", "File"] }, Intermediate: { contextTip: "Use 'Please find attached'.", goal: "Send a formal request.", keyVocabulary: ["Attached", "Request"] }, Advanced: { contextTip: "Focus on tone and clarity.", goal: "Handle a complex dispute.", keyVocabulary: ["Oversight", "Clarify"] } }, introduction: { scenario: "Email exchange.", scenarioTranslation: "Troca de e-mails." }, phrasalVerbs: [], dialogue: [] },
  "5": { title: "Networking & Events", aiRole: "Sarah", difficultySettings: { Beginner: { contextTip: "Practice 'What do you do?'.", goal: "Exchange names.", keyVocabulary: ["Company", "Meet"] }, Intermediate: { contextTip: "Ask about their industry.", goal: "Connect on LinkedIn.", keyVocabulary: ["Network", "LinkedIn"] }, Advanced: { contextTip: "Focus on value proposition.", goal: "Pitch your services.", keyVocabulary: ["Insight", "Strategy"] } }, introduction: { scenario: "Networking event.", scenarioTranslation: "Evento de networking." }, phrasalVerbs: [], dialogue: [] },
  "6": { title: "Teams & Online Calls", aiRole: "Alex", difficultySettings: { Beginner: { contextTip: "Say 'I can't hear you'.", goal: "Fix audio issues.", keyVocabulary: ["Audio", "Video"] }, Intermediate: { contextTip: "Say 'Your mic is muted'.", goal: "Manage technical glitches.", keyVocabulary: ["Muted", "Connection"] }, Advanced: { contextTip: "Focus on collaborative tools.", goal: "Lead a virtual workshop.", keyVocabulary: ["Bandwidth", "Screen"] } }, introduction: { scenario: "Video call.", scenarioTranslation: "Chamada de vídeo." }, phrasalVerbs: [], dialogue: [] },
  "7": { title: "Prepositions & Travel", aiRole: "Agent", difficultySettings: { Beginner: { contextTip: "Use 'on' and 'in'.", goal: "Find your bag.", keyVocabulary: ["Bag", "Scale"] }, Intermediate: { contextTip: "Use 'between' and 'next to'.", goal: "Navigate the airport.", keyVocabulary: ["Between", "Gate"] }, Advanced: { contextTip: "Use complex spatial terms.", goal: "Explain a lost item location.", keyVocabulary: ["Identification", "Behind"] } }, introduction: { scenario: "Airport check-in.", scenarioTranslation: "Check-in no aeroporto." }, phrasalVerbs: [], dialogue: [] },
  "8": { title: "DO / CAN / TO", aiRole: "Agent", difficultySettings: { Beginner: { contextTip: "Answer with 'Yes, I do'.", goal: "Respond to basic questions.", keyVocabulary: ["Yes", "Passport"] }, Intermediate: { contextTip: "Ask 'Can I have...?'.", goal: "Make polite requests.", keyVocabulary: ["Can", "Water"] }, Advanced: { contextTip: "Focus on conditional usage.", goal: "Negotiate a travel change.", keyVocabulary: ["Could", "If"] } }, introduction: { scenario: "Travel interactions.", scenarioTranslation: "Interações de viagem." }, phrasalVerbs: [], dialogue: [] },
  "9": { title: "Present To Be", aiRole: "Social Contact", difficultySettings: { Beginner: { contextTip: "Use 'I am' and 'She is'.", goal: "Introduce family.", keyVocabulary: ["Brazil", "Wife"] }, Intermediate: { contextTip: "Use 'We are' and 'They are'.", goal: "Talk about groups.", keyVocabulary: ["Vacation", "Excited"] }, Advanced: { contextTip: "Use 'To be' in states.", goal: "Describe professional roles.", keyVocabulary: ["Ready", "Expert"] } }, introduction: { scenario: "Social interactions.", scenarioTranslation: "Interações sociais." }, phrasalVerbs: [], dialogue: [] }
};

export default function ConversationalSimulator({ params }: { params: Promise<{ id: string }> }) {
  const { id: lessonId } = React.use(params);
  const searchParams = useSearchParams();
  const difficulty = (searchParams.get('difficulty') || 'Beginner') as 'Beginner' | 'Intermediate' | 'Advanced';
  
  const lesson = lessonsData[lessonId] || lessonsData["1"];
  const diffSettings = lesson.difficultySettings[difficulty] || lesson.difficultySettings['Beginner'];

  const [visibleStep, setVisibleStep] = useState(1);
  const [showBriefing, setShowBriefing] = useState(true);
  const [briefingTranslations, setBriefingTranslations] = useState<Record<string, boolean>>({});
  const [showTranslations, setShowTranslations] = useState<Record<number, boolean>>({});
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

  const toggleTranslation = (index: number) => {
    setShowTranslations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isFinished = visibleStep >= lesson.dialogue.length;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-8 bg-[#0B1120] relative">
      <AnimatePresence>
        {showBriefing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#0B1120]/95 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-2xl w-full bg-[#0F172A] border border-[#1E293B] rounded-3xl p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97706] rounded-full blur-3xl opacity-5 -mr-32 -mt-32"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 flex items-center justify-center text-[#D97706]">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Mission Briefing</h2>
                    <h3 className="font-serif text-2xl font-bold text-white">{lesson.title}</h3>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                  ${difficulty === 'Advanced' ? 'text-[#D97706] border-[#D97706]/50 bg-[#D97706]/10' : 
                    difficulty === 'Intermediate' ? 'text-[#10B981] border-[#10B981]/50 bg-[#10B981]/10' : 
                    'text-blue-500 border-blue-500/50 bg-blue-500/10'}`}
                >
                  {difficulty}
                </span>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider">The Scenario</h4>
                    <span className="text-[10px] text-gray-500 italic">Click text to translate</span>
                  </div>
                  <div 
                    onClick={() => setBriefingTranslations(prev => ({ ...prev, scenario: !prev.scenario }))}
                    className="cursor-pointer group"
                  >
                    <p className="text-gray-300 leading-relaxed italic transition-colors group-hover:text-white">
                      "{lesson.introduction.scenario}"
                    </p>
                    <AnimatePresence>
                      {briefingTranslations.scenario && (
                        <motion.p 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-[#D97706] text-sm mt-2 italic border-t border-[#D97706]/20 pt-2"
                        >
                          "{lesson.introduction.scenarioTranslation}"
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Primary Goal ({difficulty})</h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed transition-colors group-hover:text-white">
                    {diffSettings.goal}
                  </p>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-3">Key Vocabulary</h4>
                  <div className="flex flex-wrap gap-2">
                    {diffSettings.keyVocabulary.map((word: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-[#1E293B] border border-[#334155] rounded-lg text-xs text-gray-300 font-medium">
                        {word}
                      </span>
                    ))}
                  </div>
                </section>

                <button 
                  onClick={() => setShowBriefing(false)}
                  className="w-full py-4 bg-[#D97706] text-white rounded-xl font-bold hover:bg-[#B45309] transition-all flex items-center justify-center group"
                >
                  Accept Mission & Start Simulation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simulation Header */}
      <div className="h-16 border-b border-[#1E293B] bg-[#0F172A] px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1E293B] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-4 w-px bg-[#1E293B] mr-4"></div>
          <span className={`px-2.5 py-0.5 border rounded text-[10px] font-bold uppercase tracking-widest mr-3
            ${difficulty === 'Advanced' ? 'text-[#D97706] border-[#D97706]/30 bg-[#D97706]/10' : 
              difficulty === 'Intermediate' ? 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10' : 
              'text-blue-500 border-blue-500/30 bg-blue-500/10'}`}
          >
            {difficulty} Level
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
              {lesson.dialogue.length > 0 ? (
                lesson.dialogue.slice(0, visibleStep).map((turn: DialogueTurn, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: turn.sender === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${turn.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`group max-w-2xl p-5 rounded-2xl text-[15px] font-sans leading-relaxed shadow-sm transition-all duration-300 relative
                      ${turn.sender === 'user' 
                        ? 'bg-[#1E293B] text-[#F8FAFC] rounded-br-sm border border-[#334155]' 
                        : 'bg-[#0F172A] text-gray-200 rounded-bl-sm border border-[#1E293B]'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold mr-2 ${turn.sender === 'user' ? 'bg-[#334155] text-white' : 'bg-[#D97706] text-white'}`}>
                            {turn.sender === 'user' ? 'YOU' : 'AI'}
                          </div>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {turn.sender === 'user' ? 'Professional' : lesson.aiRole}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => toggleTranslation(index)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-[#D97706] transition-all"
                          title="Ver tradução"
                        >
                          <Languages size={16} />
                        </button>
                      </div>

                      <div className="relative">
                        <p>{turn.text}</p>
                        
                        <AnimatePresence>
                          {showTranslations[index] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 pt-3 border-t border-dashed border-[#334155] text-sm text-[#D97706] italic">
                                {turn.translation}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 italic">
                  <Sparkles className="mb-4 opacity-20" size={48} />
                  <p>Dialogue variation for {difficulty} is being generated...</p>
                </div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Interaction Area */}
          <div className="p-10 bg-[#0F172A] border-t border-[#1E293B] flex flex-col items-center">
            {!isFinished && lesson.dialogue.length > 0 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className={`group flex items-center px-8 py-4 rounded-xl font-bold shadow-2xl transition-all text-white
                  ${difficulty === 'Advanced' ? 'bg-[#D97706] hover:bg-[#B45309]' : 
                    difficulty === 'Intermediate' ? 'bg-[#10B981] hover:bg-[#059669]' : 
                    'bg-blue-600 hover:bg-blue-700'}`}
              >
                <ChevronRight className="mr-2 group-hover:translate-x-1 transition-transform" size={24} />
                Continue Dialogue
              </motion.button>
            ) : isFinished && lesson.dialogue.length > 0 ? (
              <div className="text-center">
                <p className="text-[#10B981] font-serif text-xl font-bold mb-4 flex items-center justify-center">
                  <CheckCircle2 className="mr-2" /> Role Play Completed
                </p>
                <Link href={`/dashboard/simulations/${lessonId}/debrief`} className="inline-flex items-center bg-white text-[#0F172A] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  <Play className="mr-2" size={20} /> Get Executive Feedback
                </Link>
              </div>
            ) : (
              <Link href="/dashboard" className="text-gray-400 hover:text-white underline text-sm">
                Return to Dashboard
              </Link>
            )}
            <p className="mt-4 text-xs text-gray-500 font-sans">
              Click to reveal the next step or hover a message to see translation.
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
                <CheckCircle2 size={14} className="text-[#10B981] mr-1.5" /> {difficulty} Tip
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed">
                {diffSettings.contextTip}
              </p>
            </div>

            <div className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4">
              <h3 className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                <AlertCircle size={14} className="text-[#D97706] mr-1.5" /> Suggested Phrasal Verbs
              </h3>
              <ul className="space-y-3">
                {lesson.phrasalVerbs.length > 0 ? (
                  lesson.phrasalVerbs.map((pv: any, index: number) => (
                    <li key={index} className="text-sm border-l-2 border-[#D97706] pl-3">
                      <span className="text-white font-semibold block mb-0.5">{pv.verb}</span>
                      <span className="text-gray-500 text-xs">{pv.meaning}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-500 italic">No specific verbs suggested for this lesson.</li>
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
