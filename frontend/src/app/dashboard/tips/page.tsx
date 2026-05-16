'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Target, Users, Zap, Award, BookOpen, Clock, Languages, ShieldAlert, MessageCircle, TrendingUp, HelpCircle, HeartHandshake } from 'lucide-react';

interface Tip {
  id: string;
  category: string;
  title: string;
  date: string;
  content: string;
  translation: string;
  icon: React.ReactNode;
  impact: 'High' | 'Medium';
}

const tipsData: Tip[] = [
  {
    id: '1',
    category: 'Negotiation',
    title: "Master the 'Power Pause'",
    date: 'May 15, 2026',
    content: "In high-stakes negotiations, a 3-second pause after a key point projects authority and gives the other party time to process your value. Silence is a professional tool, not a weakness. It often compels the other side to fill the gap, sometimes with concessions.",
    translation: "Em negociações de alto nível, uma pausa de 3 segundos após um ponto-chave projeta autoridade e dá à outra parte tempo para processar seu valor. O silêncio é uma ferramenta profissional, não uma fraqueza. Muitas vezes, ele força o outro lado a preencher o vazio, às vezes com concessões.",
    icon: <Clock size={24} />,
    impact: 'High'
  },
  {
    id: '2',
    category: 'Communication',
    title: 'The "Bottom-Line Up" Method',
    date: 'May 14, 2026',
    content: "When emailing executives, put your request or the main conclusion in the first sentence. They read for action, not for context. Provide the 'why' only after the 'what'. This respects their time and increases your response rate.",
    translation: "Ao enviar e-mails para executivos, coloque seu pedido ou a conclusão principal na primeira frase. Eles leem para agir, não pelo contexto. Forneça o 'porquê' somente após o 'quê'. Isso respeita o tempo deles e aumenta sua taxa de resposta.",
    icon: <Zap size={24} />,
    impact: 'High'
  },
  {
    id: '3',
    category: 'Networking',
    title: 'Focus on "Farming, not Hunting"',
    date: 'May 13, 2026',
    content: "Building a professional network is about long-term cultivation. Instead of asking for a job or a lead immediately, ask: 'How can I support your current project?' Trust is the currency of high-level business.",
    translation: "Construir uma rede profissional é sobre cultivo a longo prazo. Em vez de pedir um emprego ou um contato imediatamente, pergunte: 'Como posso apoiar seu projeto atual?'. A confiança é a moeda dos negócios de alto nível.",
    icon: <Users size={24} />,
    impact: 'Medium'
  },
  {
    id: '4',
    category: 'Presentation',
    title: 'The 10-20-30 Rule',
    date: 'May 12, 2026',
    content: "For pitch decks: 10 slides, 20 minutes, 30-point font. If you can't explain your value proposition within these constraints, you haven't simplified it enough for your audience.",
    translation: "Para apresentações de impacto: 10 slides, 20 minutos, fonte tamanho 30. Se você não consegue explicar sua proposta de valor dentro dessas restrições, você não a simplificou o suficiente para seu público.",
    icon: <Target size={24} />,
    impact: 'High'
  },
  {
    id: '5',
    category: 'Leadership',
    title: 'Extreme Ownership',
    date: 'May 11, 2026',
    content: "As a leader, you own the failures and your team owns the successes. When a mistake happens, look at your instructions first. Clear communication is the leader's primary responsibility.",
    translation: "Como líder, você é o dono das falhas e sua equipe é a dona dos sucessos. Quando um erro acontece, analise suas instruções primeiro. A comunicação clara é a responsabilidade primária do líder.",
    icon: <Award size={24} />,
    impact: 'High'
  },
  {
    id: '6',
    category: 'Etiquette',
    title: 'The "Wait 24 Hours" Rule',
    date: 'May 10, 2026',
    content: "Before sending an angry or emotional email, save it as a draft and wait 24 hours. Most of the time, you'll choose to rewrite it more professionally or not send it at all.",
    translation: "Antes de enviar um e-mail irritado ou emocional, salve-o como rascunho e aguarde 24 horas. Na maioria das vezes, você escolherá reescrevê-lo de forma mais profissional ou nem enviá-lo.",
    icon: <ShieldAlert size={24} />,
    impact: 'Medium'
  },
  {
    id: '7',
    category: 'Communication',
    title: 'Active Listening Ratio',
    date: 'May 09, 2026',
    content: "High-level communication is 20% speaking and 80% listening. When you listen more than you speak, you gather more intelligence and project more confidence.",
    translation: "A comunicação de alto nível é 20% fala e 80% escuta. Quando você ouve mais do que fala, você coleta mais inteligência e projeta mais confiança.",
    icon: <MessageCircle size={24} />,
    impact: 'High'
  },
  {
    id: '8',
    category: 'Strategy',
    title: 'The "Elevator Pitch" Ready',
    date: 'May 08, 2026',
    content: "Always have a 30-second summary of what you're working on ready. You never know when you'll bump into a key decision-maker in the elevator or cafeteria.",
    translation: "Sempre tenha pronto um resumo de 30 segundos sobre o que você está trabalhando. Você nunca sabe quando encontrará um tomador de decisão importante no elevador ou na cafeteria.",
    icon: <TrendingUp size={24} />,
    impact: 'Medium'
  },
  {
    id: '9',
    category: 'Decisions',
    title: 'Reversible Decisions',
    date: 'May 07, 2026',
    content: "If you can't decide between two options, choose the one that is reversible. Speed is often more valuable than perfect accuracy in business for minor decisions.",
    translation: "Se você não consegue decidir entre duas opções, escolha a que for reversível. A velocidade é muitas vezes mais valiosa do que a precisão perfeita em negócios para decisões menores.",
    icon: <HelpCircle size={24} />,
    impact: 'Medium'
  },
  {
    id: '10',
    category: 'Culture',
    title: 'Radical Candor',
    date: 'May 06, 2026',
    content: "Be direct in your feedback but show that you care personally. This builds a culture of trust and high performance where issues are solved quickly.",
    translation: "Seja direto em seu feedback, mas mostre que você se importa pessoalmente. Isso constrói uma cultura de confiança e alta performance, onde os problemas são resolvidos rapidamente.",
    icon: <HeartHandshake size={24} />,
    impact: 'High'
  }
];

export default function ExecutiveTipsPage() {
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setShowTranslations(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-3 text-[#D97706]">
          <Lightbulb size={24} />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Strategy Lab</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white mb-4">Executive Tips</h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          A curated collection of high-impact strategies for modern business leadership and communication. 
          Each tip includes a translation to ensure full understanding of executive nuances.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {tipsData.map((tip, idx) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0B1120] border border-[#1E293B] rounded-3xl p-8 relative overflow-hidden group hover:border-[#D97706]/40 transition-all shadow-xl"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              {tip.icon}
            </div>

            <div className="flex flex-col md:flex-row gap-8 relative z-10">
              <div className="p-4 bg-[#D97706]/10 text-[#D97706] rounded-2xl h-fit shadow-[0_0_15px_rgba(217,119,6,0.1)]">
                {tip.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-[#D97706]/20 text-[#D97706] text-[10px] font-black rounded uppercase tracking-widest border border-[#D97706]/30">
                      {tip.category}
                    </span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{tip.date}</span>
                    {tip.impact === 'High' && (
                      <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        <Sparkles size={12} /> High Impact
                      </span>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => toggleTranslation(tip.id)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all
                      ${showTranslations[tip.id] ? 'bg-[#D97706] text-white' : 'bg-[#1E293B] text-gray-400 hover:text-white border border-[#334155]'}`}
                  >
                    <Languages size={14} />
                    {showTranslations[tip.id] ? 'Ver Original' : 'Ver Tradução'}
                  </button>
                </div>
                
                <h2 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-[#D97706] transition-colors">
                  {tip.title}
                </h2>
                
                <div className="relative">
                  <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                    {tip.content}
                  </p>
                  
                  <AnimatePresence>
                    {showTranslations[tip.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-dashed border-[#334155] text-sm lg:text-base text-[#D97706] italic leading-relaxed">
                          {tip.translation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#D97706]"></div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-[#0F172A] border border-[#1E293B] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-xl">
            <BookOpen className="text-gray-400" size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold">Want more insights?</h3>
            <p className="text-sm text-gray-500">Subscribe to our weekly Executive Briefing.</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-[#0F172A] rounded-xl font-bold text-sm hover:bg-gray-100 transition-all shadow-xl">
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
