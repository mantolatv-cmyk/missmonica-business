'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Volume2, Search, Sparkles, Languages, ChevronRight, Star, Brain, Lightbulb, Trophy } from 'lucide-react';
import Link from 'next/link';

interface VocabItem {
  english: string;
  portuguese: string;
  example: string;
  category: 'Business' | 'Action' | 'Tool' | 'Travel' | 'Grammar';
}

interface LessonData {
  title: string;
  items: VocabItem[];
  culturalTip: string;
}

const vocabularyData: Record<string, LessonData> = {
  '1': {
    title: 'Small Talk & Presentations',
    culturalTip: "In English-speaking business cultures, small talk is essential for building 'rapport'. Stick to safe topics like the weather, travel, or the event itself. Avoid personal questions about age, salary, or religion early on.",
    items: [
      { english: 'Small Talk', portuguese: 'Conversa fiada / casual', example: 'We did some small talk before the meeting.', category: 'Business' },
      { english: 'Employee', portuguese: 'Funcionário / Empregado', example: 'The company has over 500 employees.', category: 'Business' },
      { english: 'Schedule', portuguese: 'Cronograma / Agenda / Programar', example: 'Let\'s schedule a call for tomorrow.', category: 'Action' },
      { english: 'Remote work', portuguese: 'Trabalho remoto / Home office', example: 'Remote work is becoming very popular.', category: 'Business' },
      { english: 'Catch up', portuguese: 'Colocar o papo em dia / Alcançar', example: 'It was great to catch up with you.', category: 'Action' },
      { english: 'Nice to meet you', portuguese: 'Prazer em conhecê-lo', example: 'Hi John, nice to meet you in person.', category: 'Business' },
      { english: 'Hectic', portuguese: 'Agitado / Caótico', example: 'It\'s always a bit hectic during a launch.', category: 'Business' },
      { english: 'Multinational', portuguese: 'Multinacional', example: 'She works for a large multinational company.', category: 'Business' },
      { english: 'Rapport', portuguese: 'Sintonia / Rapport', example: 'It\'s important to build rapport with clients.', category: 'Business' },
      { english: 'Break the ice', portuguese: 'Quebrar o gelo', example: 'A joke can help to break the ice.', category: 'Action' },
      { english: 'Stakeholder', portuguese: 'Parte interessada / Stakeholder', example: 'We need to update all stakeholders.', category: 'Business' },
      { english: 'Keynote', portuguese: 'Palestra principal / Keynote', example: 'He will deliver the keynote speech.', category: 'Business' },
      { english: 'Background', portuguese: 'Contexto / Histórico', example: 'Can you provide some background on this?', category: 'Business' },
      { english: 'Insight', portuguese: 'Ideia / Percepção / Insight', example: 'That was a very valuable insight.', category: 'Business' },
    ]
  },
  '2': {
    title: 'Meetings & Communication',
    culturalTip: "Time is money. In American business culture, 'on time' actually means 5 minutes early. In the UK, punctuality is equally strict. If you are going to be even 2 minutes late, send a quick note immediately.",
    items: [
      { english: 'Deadline', portuguese: 'Prazo final', example: 'We must meet the project deadline.', category: 'Business' },
      { english: 'Feedback', portuguese: 'Retorno / Comentários / Avaliação', example: 'I need some feedback on my presentation.', category: 'Business' },
      { english: 'Agenda', portuguese: 'Pauta / Ordem do dia', example: 'The first item on the agenda is the budget.', category: 'Tool' },
      { english: 'Push back', portuguese: 'Adiar / Postergar', example: 'We might need to push back the meeting.', category: 'Action' },
      { english: 'Follow up', portuguese: 'Acompanhamento / Acompanhar', example: 'I\'ll follow up with the client today.', category: 'Action' },
      { english: 'Agree', portuguese: 'Concordar', example: 'I agree with your point about the timeline.', category: 'Action' },
      { english: 'Clarify', portuguese: 'Esclarecer', example: 'Could you clarify that last point?', category: 'Action' },
      { english: 'Asset', portuguese: 'Recurso / Ativo', example: 'They are finalizing the mobile assets.', category: 'Tool' },
      { english: 'Minutes', portuguese: 'Ata de reunião', example: 'Who is taking the minutes today?', category: 'Tool' },
      { english: 'Wrap up', portuguese: 'Encerrar / Finalizar', example: 'Let\'s wrap up the meeting now.', category: 'Action' },
      { english: 'Circle back', portuguese: 'Retomar / Voltar a falar', example: 'Let\'s circle back to this later.', category: 'Action' },
      { english: 'Action item', portuguese: 'Tarefa / Item de ação', example: 'I have three action items from this call.', category: 'Business' },
      { english: 'On the same page', portuguese: 'Em sintonia / Alinhados', example: 'Are we all on the same page?', category: 'Business' },
      { english: 'Brainstorm', portuguese: 'Brainstorming / Chuva de ideias', example: 'We need to brainstorm some new ideas.', category: 'Action' },
    ]
  },
  '3': {
    title: 'Interviews & HR',
    culturalTip: "Self-promotion is expected in US interviews but should be backed by 'STAR' method examples (Situation, Task, Action, Result). In British interviews, a bit more modesty is common, though results still matter most.",
    items: [
      { english: 'Resume / CV', portuguese: 'Currículo', example: 'Please send your resume to our HR team.', category: 'Tool' },
      { english: 'Background', portuguese: 'Histórico / Experiência / Formação', example: 'Tell me about your professional background.', category: 'Business' },
      { english: 'Strengths', portuguese: 'Pontos fortes', example: 'One of my main strengths is adaptability.', category: 'Business' },
      { english: 'Leadership', portuguese: 'Liderança', example: 'I am looking for a leadership role.', category: 'Business' },
      { english: 'Walk through', portuguese: 'Passar por / Explicar passo a passo', example: 'Can you walk me through your CV?', category: 'Action' },
      { english: 'Take on', portuguese: 'Assumir (responsabilidade)', example: 'I am ready to take on more responsibilities.', category: 'Action' },
      { english: 'Competency', portuguese: 'Competência', example: 'The interview includes competency-based questions.', category: 'Business' },
      { english: 'Exposure', portuguese: 'Exposição / Experiência', example: 'I\'m looking for international exposure.', category: 'Business' },
      { english: 'Soft skills', portuguese: 'Habilidades interpessoais', example: 'Soft skills are vital for managers.', category: 'Business' },
      { english: 'Hard skills', portuguese: 'Habilidades técnicas', example: 'My hard skills include Python and SQL.', category: 'Business' },
      { english: 'Candidate', portuguese: 'Candidato', example: 'He is a very strong candidate.', category: 'Business' },
      { english: 'Headhunter', portuguese: 'Recrutador de executivos', example: 'A headhunter contacted me yesterday.', category: 'Business' },
      { english: 'Benefits package', portuguese: 'Pacote de benefícios', example: 'The company offers a great benefits package.', category: 'Business' },
      { english: 'Performance review', portuguese: 'Avaliação de desempenho', example: 'I have my performance review tomorrow.', category: 'Business' },
    ]
  },
  '4': {
    title: 'Professional Emails',
    culturalTip: "Email tone should be 'professional yet conversational'. Use clear subject lines. In the US, people often use first names immediately; in more formal European contexts, titles (Mr./Ms.) might be preferred initially.",
    items: [
      { english: 'Attached', portuguese: 'Em anexo', example: 'Please find the report attached.', category: 'Tool' },
      { english: 'Oversight', portuguese: 'Descuido / Lapso', example: 'I apologize for the oversight.', category: 'Business' },
      { english: 'Availability', portuguese: 'Disponibilidade', example: 'Please check your availability for Monday.', category: 'Business' },
      { english: 'Shortly', portuguese: 'Em breve', example: 'I will send the invite shortly.', category: 'Business' },
      { english: 'Send over', portuguese: 'Enviar', example: 'Could you please send over the document?', category: 'Action' },
      { english: 'Look into', portuguese: 'Investigar / Verificar', example: 'I will look into this issue immediately.', category: 'Action' },
      { english: 'Request', portuguese: 'Pedido / Solicitação', example: 'I received your request for information.', category: 'Business' },
      { english: 'Thread', portuguese: 'Conversa / Fio (de e-mail)', example: 'The document is missing from the thread.', category: 'Tool' },
      { english: 'Forward', portuguese: 'Encaminhar', example: 'I will forward this email to the team.', category: 'Action' },
      { english: 'CC', portuguese: 'Com cópia', example: 'Please CC me on that email.', category: 'Tool' },
      { english: 'BCC', portuguese: 'Com cópia oculta', example: 'Use BCC for the large mailing list.', category: 'Tool' },
      { english: 'Best regards', portuguese: 'Atenciosamente / Melhores cumprimentos', example: 'Best regards, Monica.', category: 'Business' },
      { english: 'ASAP', portuguese: 'O mais rápido possível', example: 'I need the confirmation ASAP.', category: 'Business' },
      { english: 'Subject line', portuguese: 'Assunto (do e-mail)', example: 'The subject line should be clear.', category: 'Tool' },
    ]
  },
  '5': {
    title: 'Networking & Events',
    culturalTip: "Networking is about 'farming, not hunting'. Focus on how you can help others before asking for favors. Always follow up with a personalized LinkedIn message within 24 hours of meeting someone.",
    items: [
      { english: 'Firm', portuguese: 'Empresa / Firma', example: 'I work for an international tech firm.', category: 'Business' },
      { english: 'Trends', portuguese: 'Tendências', example: 'We need to stay updated on industry trends.', category: 'Business' },
      { english: 'Insights', portuguese: 'Ideias / Percepções / Insights', example: 'Perhaps we could share some insights.', category: 'Business' },
      { english: 'LinkedIn', portuguese: 'LinkedIn (Rede social profissional)', example: 'Let\'s connect on LinkedIn.', category: 'Tool' },
      { english: 'Set up', portuguese: 'Estabelecer / Configurar', example: 'They set up a new branch in London.', category: 'Action' },
      { english: 'Reach out', portuguese: 'Entrar em contato', example: 'I\'ll reach out to you next week.', category: 'Action' },
      { english: 'Networking', portuguese: 'Networking / Rede de contatos', example: 'Networking is essential for career growth.', category: 'Business' },
      { english: 'Workshop', portuguese: 'Workshop / Oficina', example: 'Is this your first time at this workshop?', category: 'Business' },
      { english: 'Business card', portuguese: 'Cartão de visitas', example: 'Do you have a business card?', category: 'Tool' },
      { english: 'Elevator pitch', portuguese: 'Apresentação rápida / Pitch', example: 'I need to polish my elevator pitch.', category: 'Business' },
      { english: 'Partnership', portuguese: 'Parceria', example: 'We are looking for a new partnership.', category: 'Business' },
      { english: 'Trade show', portuguese: 'Feira de negócios', example: 'Are you attending the trade show?', category: 'Business' },
      { english: 'Referral', portuguese: 'Indicação', example: 'He got the job through a referral.', category: 'Business' },
      { english: 'Industry', portuguese: 'Indústria / Setor', example: 'The tech industry is evolving fast.', category: 'Business' },
    ]
  },
  '6': {
    title: 'Teams & Online Calls',
    culturalTip: "Virtual etiquette: Keep your camera on unless you have a poor connection. Use the 'raise hand' feature in large groups. Mute yourself when not speaking to avoid background noise interference.",
    items: [
      { english: 'Unstable', portuguese: 'Instável', example: 'My internet connection is a bit unstable.', category: 'Tool' },
      { english: 'Muted', portuguese: 'Silenciado / No mudo', example: 'Your microphone is muted.', category: 'Tool' },
      { english: 'Headset', portuguese: 'Fone de ouvido com microfone', example: 'I had an issue with my headset.', category: 'Tool' },
      { english: 'Bandwidth', portuguese: 'Largura de banda', example: 'I\'ll turn off my camera to save bandwidth.', category: 'Tool' },
      { english: 'Cut out', portuguese: 'Falhar (áudio/vídeo)', example: 'You cut out for a second.', category: 'Action' },
      { english: 'Speak up', portuguese: 'Falar mais alto', example: 'Could you please speak up?', category: 'Action' },
      { english: 'Screen sharing', portuguese: 'Compartilhamento de tela', example: 'I\'ll start screen sharing now.', category: 'Tool' },
      { english: 'Troubleshoot', portuguese: 'Resolver problemas', example: 'Let\'s troubleshoot this connection issue.', category: 'Action' },
      { english: 'Lag', portuguese: 'Atraso / Lentidão', example: 'There is a lot of lag on this call.', category: 'Tool' },
      { english: 'Echo', portuguese: 'Eco', example: 'I can hear an echo on your end.', category: 'Tool' },
      { english: 'Background noise', portuguese: 'Ruído de fundo', example: 'Sorry for the background noise.', category: 'Tool' },
      { english: 'Host', portuguese: 'Anfitrião / Organizador', example: 'The host will start the meeting soon.', category: 'Tool' },
      { english: 'Join', portuguese: 'Entrar / Participar', example: 'Click the link to join the meeting.', category: 'Action' },
      { english: 'Breakout room', portuguese: 'Sala de apoio / Sala simultânea', example: 'We will move to breakout rooms now.', category: 'Tool' },
    ]
  },
  '7': {
    title: 'Prepositions & Travel',
    culturalTip: "In many countries, 'business casual' is the standard for travel, but for important meetings, always lean towards 'business formal'. Keep your travel documents organized and easily accessible.",
    items: [
      { english: 'Suitcase', portuguese: 'Mala', example: 'Place your suitcase on the scale.', category: 'Travel' },
      { english: 'Scale', portuguese: 'Balança', example: 'The scale is next to the counter.', category: 'Travel' },
      { english: 'Pharmacy', portuguese: 'Farmácia', example: 'The gate is between the pharmacy and the café.', category: 'Travel' },
      { english: 'Identification', portuguese: 'Identificação', example: 'Please show your identification photo.', category: 'Travel' },
      { english: 'Check in', portuguese: 'Fazer o check-in / Registro', example: 'Where is the check-in counter?', category: 'Action' },
      { english: 'Go through', portuguese: 'Passar por', example: 'You need to go through security.', category: 'Action' },
      { english: 'Boarding pass', portuguese: 'Cartão de embarque', example: 'Here is your boarding pass.', category: 'Travel' },
      { english: 'Gate', portuguese: 'Portão', example: 'Your flight departs from gate 12.', category: 'Travel' },
      { english: 'Layover', portuguese: 'Conexão / Escala', example: 'I have a three-hour layover in Paris.', category: 'Travel' },
      { english: 'Terminal', portuguese: 'Terminal', example: 'Go to terminal 3 for international flights.', category: 'Travel' },
      { english: 'Departure', portuguese: 'Partida', example: 'What is the departure time?', category: 'Travel' },
      { english: 'Arrival', portuguese: 'Chegada', example: 'The arrival area is on the first floor.', category: 'Travel' },
      { english: 'Customs', portuguese: 'Alfândega', example: 'You need to clear customs first.', category: 'Travel' },
      { english: 'Duty-free', portuguese: 'Livre de impostos / Duty-free', example: 'I bought this at the duty-free shop.', category: 'Travel' },
    ]
  },
  '8': {
    title: 'DO / CAN / TO',
    culturalTip: "Politeness over directness: In English, using 'Could you...' or 'Would it be possible to...' is often preferred over a direct 'Do this' or 'I want this', especially in service situations.",
    items: [
      { english: 'Passport', portuguese: 'Passaporte', example: 'Do you have your passport?', category: 'Travel' },
      { english: 'Water', portuguese: 'Água', example: 'Can I get some water, please?', category: 'Travel' },
      { english: 'Help', portuguese: 'Ajuda / Ajudar', example: 'Can you help me with my bags?', category: 'Action' },
      { english: 'Speak', portuguese: 'Falar', example: 'Do you speak English?', category: 'Action' },
      { english: 'Sugar', portuguese: 'Açúcar', example: 'Do you want sugar in your coffee?', category: 'Travel' },
      { english: 'Medical insurance', portuguese: 'Seguro médico', example: 'Do you have medical insurance?', category: 'Travel' },
      { english: 'Window seat', portuguese: 'Assento na janela', example: 'Can I have a window seat?', category: 'Travel' },
      { english: 'Ready', portuguese: 'Pronto / Preparado', example: 'Are you ready to board?', category: 'Grammar' },
      { english: 'Order', portuguese: 'Pedir / Encomendar', example: 'Can I order a sandwich?', category: 'Action' },
      { english: 'Receipt', portuguese: 'Recibo', example: 'Do you need a receipt?', category: 'Tool' },
      { english: 'Change', portuguese: 'Troco', example: 'Here is your change.', category: 'Tool' },
      { english: 'Book', portuguese: 'Reservar', example: 'Can you book a taxi for me?', category: 'Action' },
      { english: 'Direct flight', portuguese: 'Voo direto', example: 'Is it a direct flight?', category: 'Travel' },
      { english: 'Carry-on', portuguese: 'Bagagem de mão', example: 'This is my carry-on bag.', category: 'Travel' },
    ]
  },
  '9': {
    title: 'Present To Be',
    culturalTip: "When arriving in a new city for business, it's polite to mention something positive about the place or the weather during your first meeting. It helps set a friendly tone for the relationship.",
    items: [
      { english: 'Brazil', portuguese: 'Brasil', example: 'I am from Brazil.', category: 'Travel' },
      { english: 'Husband', portuguese: 'Marido', example: 'He is my husband.', category: 'Travel' },
      { english: 'Ready', portuguese: 'Pronto', example: 'We are ready to explore the city.', category: 'Grammar' },
      { english: 'Tired', portuguese: 'Cansado', example: 'I am not tired after the flight.', category: 'Grammar' },
      { english: 'Vacation', portuguese: 'Férias', example: 'We are on vacation.', category: 'Travel' },
      { english: 'Airport', portuguese: 'Aeroporto', example: 'They are at the airport.', category: 'Travel' },
      { english: 'Excited', portuguese: 'Animado / Empolgado', example: 'We are very excited about the trip.', category: 'Grammar' },
      { english: 'Lens', portuguese: 'Lente', example: 'Look directly at the lens.', category: 'Travel' },
      { english: 'Late', portuguese: 'Atrasado', example: 'Is the flight late?', category: 'Grammar' },
      { english: 'Early', portuguese: 'Adiantado / Cedo', example: 'We are early for the meeting.', category: 'Grammar' },
      { english: 'Safe', portuguese: 'Seguro', example: 'The city is very safe.', category: 'Grammar' },
      { english: 'Busy', portuguese: 'Ocupado / Movimentado', example: 'The airport is very busy today.', category: 'Grammar' },
      { english: 'Hungry', portuguese: 'Com fome', example: 'Are you hungry after the trip?', category: 'Grammar' },
      { english: 'Thirsty', portuguese: 'Com sede', example: 'I am very thirsty.', category: 'Grammar' },
    ]
  },
  '10': {
    title: 'Simple Present x Present Continuous',
    culturalTip: "In professional communication, mixing up routine work ('I write reports every day') and current work ('I am writing a report now') can lead to confusion about deadlines. Be explicit about frequencies.",
    items: [
      { english: 'Usually', portuguese: 'Geralmente', example: 'I usually start working at 9 AM.', category: 'Grammar' },
      { english: 'Always', portuguese: 'Sempre', example: 'She always double-checks her files.', category: 'Grammar' },
      { english: 'Every day', portuguese: 'Todos os dias', example: 'We have stand-up meetings every day.', category: 'Grammar' },
      { english: 'Now', portuguese: 'Agora', example: 'I am reviewing the spreadsheet now.', category: 'Grammar' },
      { english: 'Right now', portuguese: 'Agora mesmo', example: 'They are leading a client call right now.', category: 'Grammar' },
      { english: 'At the moment', portuguese: 'No momento', example: 'He is working from home at the moment.', category: 'Grammar' },
      { english: 'Today', portuguese: 'Hoje', example: 'Today, I am focusing on the Q3 budget.', category: 'Grammar' },
      { english: 'This week', portuguese: 'Esta semana', example: 'This week, we are finalizing the design assets.', category: 'Grammar' },
      { english: 'Routine', portuguese: 'Rotina', example: 'Stand-ups are part of our daily routine.', category: 'Business' },
      { english: 'Habit', portuguese: 'Hábito', example: 'Taking notes is a very good business habit.', category: 'Business' },
      { english: 'Temporary', portuguese: 'Temporário', example: 'We are using a temporary workspace this month.', category: 'Business' },
      { english: 'Work', portuguese: 'Trabalhar', example: 'I work in the financial department.', category: 'Action' },
      { english: 'Study', portuguese: 'Estudar', example: 'She studies global market trends.', category: 'Action' },
      { english: 'Live', portuguese: 'Morar / Viver', example: 'They live in London, but they are living in a hotel today.', category: 'Travel' }
    ]
  }
};

export default function VocabularyModule({ params }: { params: Promise<{ id: string }> }) {
  const { id: lessonId } = React.use(params);
  const lesson = vocabularyData[lessonId] || vocabularyData['1'];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = lesson.items.filter(item => 
    item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.portuguese.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleReveal = (index: number) => {
    if (revealedIds.includes(index)) {
      setRevealedIds(revealedIds.filter(id => id !== index));
    } else {
      setRevealedIds([...revealedIds, index]);
    }
  };

  const toggleFavorite = (english: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(english)) {
      setFavorites(favorites.filter(id => id !== english));
    } else {
      setFavorites([...favorites, english]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-8 bg-[#0B1120] relative overflow-hidden">
      <div className="h-20 bg-[#0F172A] border-b border-[#1E293B] shrink-0 z-10 shadow-xl">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1E293B] transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="h-6 w-px bg-[#1E293B]"></div>
            <div>
              <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest block">Lesson {lessonId}</span>
              <h1 className="font-serif font-bold text-white text-xl">{lesson.title}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFlashcardMode(!flashcardMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${flashcardMode ? 'bg-[#D97706] text-white' : 'bg-[#1E293B] text-gray-400 hover:text-white'}`}
            >
              <Brain size={14} />
              {flashcardMode ? 'Grid View' : 'Flashcards'}
            </button>
            <div className="hidden md:flex items-center bg-[#0B1120] border border-[#1E293B] rounded-xl px-4 py-2 focus-within:border-[#D97706] transition-all w-48 shadow-inner">
              <Search size={18} className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-5xl mx-auto w-full pb-20">
          
          {flashcardMode ? (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg aspect-[4/3] relative perspective-1000 group cursor-pointer"
                onClick={() => toggleReveal(currentIndex)}
              >
                <div className="bg-[#0F172A] border-2 border-[#1E293B] rounded-[32px] p-12 h-full flex flex-col items-center justify-center text-center shadow-2xl group-hover:border-[#D97706]/30 transition-all">
                  <span className="text-[10px] font-black text-[#D97706] uppercase tracking-[0.4em] mb-8">{lesson.items[currentIndex].category}</span>
                  <h4 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">{lesson.items[currentIndex].english}</h4>
                  
                  <AnimatePresence mode="wait">
                    {revealedIds.includes(currentIndex) ? (
                      <motion.div
                        key="trans"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <p className="text-2xl text-[#D97706] font-medium">{lesson.items[currentIndex].portuguese}</p>
                        <p className="text-sm text-gray-500 italic max-w-xs">"{lesson.items[currentIndex].example}"</p>
                      </motion.div>
                    ) : (
                      <motion.div key="hint" className="text-gray-600 text-sm flex items-center gap-2">
                        <ChevronRight size={16} /> Tap to flip card
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={(e) => toggleFavorite(lesson.items[currentIndex].english, e)}
                    className={`absolute top-8 right-8 p-3 rounded-full transition-all ${favorites.includes(lesson.items[currentIndex].english) ? 'text-[#D97706] bg-[#D97706]/10 shadow-[0_0_15px_rgba(217,119,6,0.2)]' : 'text-gray-700 hover:text-gray-400'}`}
                  >
                    <Star size={24} fill={favorites.includes(lesson.items[currentIndex].english) ? "currentColor" : "none"} />
                  </button>
                </div>
              </motion.div>

              <div className="mt-12 flex items-center gap-8">
                <button 
                  onClick={() => { setCurrentIndex(prev => Math.max(0, prev - 1)); setRevealedIds([]); }}
                  disabled={currentIndex === 0}
                  className="p-4 bg-[#1E293B] rounded-full text-white disabled:opacity-20 transition-all hover:bg-[#334155]"
                >
                  <ArrowLeft size={24} />
                </button>
                <span className="text-gray-500 font-bold tracking-widest">{currentIndex + 1} / {lesson.items.length}</span>
                <button 
                  onClick={() => { setCurrentIndex(prev => Math.min(lesson.items.length - 1, prev + 1)); setRevealedIds([]); }}
                  disabled={currentIndex === lesson.items.length - 1}
                  className="p-4 bg-[#1E293B] rounded-full text-white disabled:opacity-20 transition-all hover:bg-[#334155]"
                >
                  <ChevronRight size={24} className="rotate-0" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-[#D97706]" size={18} />
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Vocabulary Lab</h2>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white mb-4">Master Essential Phrasing</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Explore the key terminology and professional expressions used in this lesson. 
                    Save your favorites and try the Flashcard mode for active recall.
                  </p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#D97706]/30 rounded-2xl p-6 relative overflow-hidden group shadow-2xl"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Lightbulb size={60} className="text-[#D97706]" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-[#D97706]" size={14} />
                    <span className="text-[10px] font-black text-[#D97706] uppercase tracking-widest">Cultural Insight</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic relative z-10">
                    "{lesson.culturalTip}"
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.english}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => toggleReveal(index)}
                      className="group cursor-pointer"
                    >
                      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 hover:border-[#D97706]/50 transition-all relative overflow-hidden shadow-lg h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border
                            ${item.category === 'Business' ? 'text-blue-400 border-blue-400/30 bg-blue-400/5' : 
                              item.category === 'Action' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5' : 
                              item.category === 'Grammar' ? 'text-violet-400 border-violet-400/30 bg-violet-400/5' :
                              item.category === 'Travel' ? 'text-amber-400 border-amber-400/30 bg-amber-400/5' :
                              'text-gray-400 border-gray-400/30 bg-gray-400/5'}`}
                          >
                            {item.category}
                          </span>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={(e) => toggleFavorite(item.english, e)}
                              className={`p-1 transition-all ${favorites.includes(item.english) ? 'text-[#D97706]' : 'text-gray-700 hover:text-gray-400'}`}
                            >
                              <Star size={18} fill={favorites.includes(item.english) ? "currentColor" : "none"} />
                            </button>
                            <Volume2 size={16} className="text-gray-600 group-hover:text-[#D97706] transition-colors" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#D97706] transition-colors">
                            {item.english}
                          </h4>
                          
                          <div className="min-h-[40px] flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                              {revealedIds.includes(index) ? (
                                <motion.div
                                  key="translation"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="flex items-center gap-2 text-[#D97706] font-medium"
                                >
                                  <Languages size={14} />
                                  <span>{item.portuguese}</span>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="hidden"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-gray-600 text-sm italic flex items-center gap-2"
                                >
                                  <ChevronRight size={14} />
                                  <span>Click to reveal translation</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#1E293B]">
                          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Practical Usage</span>
                          <p className="text-xs text-gray-400 italic leading-relaxed">
                            "{item.example}"
                          </p>
                        </div>

                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#D97706]"></div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {!flashcardMode && filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <Search size={48} className="text-gray-700 mx-auto mb-4 opacity-20" />
              <p className="text-gray-500 font-serif text-xl italic">No vocabulary found for your search.</p>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Sparkles size={16} className="text-[#D97706]" />
              <span>Ready to practice these words?</span>
            </div>
            <div className="flex gap-4">
              <Link 
                href={`/dashboard/simulations/${lessonId}`}
                className="px-6 py-3 bg-[#1E293B] border border-[#334155] text-white rounded-xl font-bold text-sm hover:border-[#D97706]/50 transition-all"
              >
                Start Simulation
              </Link>
              <Link 
                href={`/dashboard/practice/lesson-${lessonId}`}
                className="px-6 py-3 bg-[#D97706] text-white rounded-xl font-bold text-sm hover:bg-[#B45309] transition-all shadow-lg shadow-[#D97706]/10"
              >
                Go to Practice Lab
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
