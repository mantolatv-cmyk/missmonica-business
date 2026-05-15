'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Play, Languages } from 'lucide-react';
import Link from 'next/link';

interface DialogueTurn {
  sender: 'ai' | 'user';
  text: string;
  translation: string;
}

const lessonsData: Record<string, any> = {
  "1": {
    title: "Small Talks & Presentations",
    aiRole: "International Colleague",
    contextTip: "Focus on using 'Nice to meet you' and 'Working on'. Maintain a polite and friendly tone.",
    introduction: {
      scenario: "You are joining an online meeting a few minutes early. You meet John, a colleague from the London office, whom you've never spoken to before.",
      goal: "Build rapport through casual conversation (small talk) before the official meeting begins.",
      keyVocabulary: ["Catch up", "Remote work", "Schedule", "Multinational"]
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
    contextTip: "Use 'I agree' or 'I see your point' before expressing a different opinion.",
    introduction: {
      scenario: "You are in a weekly alignment meeting. The Project Manager is reviewing the Q3 release schedule and needs status updates.",
      goal: "Communicate task progress, request feedback, and handle schedule changes professionally.",
      keyVocabulary: ["Deadline", "Feedback", "Agenda", "Push back"]
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
  "3": {
    title: "Interviews & HR",
    aiRole: "HR Recruiter",
    contextTip: "Talk about your 'Strengths' and 'Experience' clearly and confidently.",
    introduction: {
      scenario: "You are being interviewed for a senior position at a global technology company. The recruiter wants to hear about your experience with multinational teams.",
      goal: "Present your professional background confidently and answer competency-based questions.",
      keyVocabulary: ["Resume", "Background", "Strengths", "Leadership"]
    },
    phrasalVerbs: [
      { verb: "Walk through", meaning: "To explain something step by step." },
      { verb: "Take on", meaning: "To accept a responsibility." }
    ],
    dialogue: [
      { sender: 'ai', text: "Thank you for joining this interview session today. We are looking for a candidate with strong international experience for this position. Can you walk me through your professional background?", translation: "Obrigado por participar desta sessão de entrevista hoje. Estamos procurando um candidato com forte experiência internacional para esta posição. Você pode me contar sobre sua trajetória profissional?" },
      { sender: 'user', text: "Thank you for the opportunity. As you can see on my Resume, I have over five years of experience in project management, specifically working with multinational teams.", translation: "Obrigado pela oportunidade. Como você pode ver no meu currículo, tenho mais de cinco anos de experiência em gestão de projetos, trabalhando especificamente com equipes multinacionais." },
      { sender: 'ai', text: "That's a solid foundation. In this position, you'll need to handle high-pressure skills. What would you say are your main strengths and weaknesses?", translation: "Essa é uma base sólida. Nesta posição, você precisará lidar com habilidades sob alta pressão. Quais você diria que são seus principais pontos fortes e fracos?" },
      { sender: 'user', text: "My main strength is my ability to adapt to new environments quickly. As for a weakness, I sometimes focus too much on details, but I'm working on balancing that with the bigger picture.", translation: "Meu principal ponto forte é minha habilidade de me adaptar a novos ambientes rapidamente. Quanto a um ponto fraco, às vezes foco demais nos detalhes, mas estou trabalhando para equilibrar isso com a visão geral." },
      { sender: 'ai', text: "I appreciate the honesty. How do you handle conflict within a remote team?", translation: "Agradeço a honestidade. Como você lida com conflitos dentro de uma equipe remota?" },
      { sender: 'user', text: "I believe in clear communication and setting expectations early. My experience has taught me that most issues can be resolved with a quick alignment call.", translation: "Acredito em uma comunicação clara e em definir expectativas cedo. Minha experiência me ensinou que a maioria dos problemas pode ser resolvida com uma rápida chamada de alinhamento." },
      { sender: 'ai', text: "That's a good approach. Can you give me an example of a time you had to take on a task outside of your usual scope?", translation: "Essa é uma boa abordagem. Você pode me dar um exemplo de uma vez em que teve que assumir uma tarefa fora do seu escopo habitual?" },
      { sender: 'user', text: "Certainly. Last year, I stepped in to lead the client presentation when our supervisor was unavailable. It was a challenging but rewarding experience.", translation: "Com certeza. No ano passado, assumi a liderança da apresentação para o cliente quando nosso supervisor estava indisponível. Foi uma experiência desafiadora, mas gratificante." },
      { sender: 'ai', text: "Impressive. And what are your expectations for your career growth within our company?", translation: "Impressionante. E quais são suas expectativas para o crescimento da sua carreira dentro da nossa empresa?" },
      { sender: 'user', text: "I'm looking for a position that offers international exposure and the chance to contribute my skills to global projects while growing into a leadership role.", translation: "Estou procurando uma posição que ofereça exposição internacional e a chance de contribuir com minhas habilidades em projetos globais, crescendo para um papel de liderança." },
      { sender: 'ai', text: "Excellent. We will be in touch soon regarding the next steps of the recruitment process.", translation: "Excelente. Entraremos em contato em breve sobre os próximos passos do processo de recrutamento." },
      { sender: 'user', text: "Thank you for your time. I look forward to hearing from you.", translation: "Obrigado pelo seu tempo. Estou ansioso para ouvir de você." }
    ]
  },
  "4": {
    title: "Professional Emails",
    aiRole: "Enterprise Client",
    contextTip: "Use formal phrases like 'Please find attached' and 'Thank you for your time'.",
    introduction: {
      scenario: "A client is asking for missing documentation from a previous email thread. You need to provide the files and schedule a follow-up call.",
      goal: "Practice formal email language, apologies for oversights, and professional scheduling.",
      keyVocabulary: ["Attached", "Oversight", "Availability", "Shortly"]
    },
    phrasalVerbs: [
      { verb: "Send over", meaning: "To transfer a document to someone." },
      { verb: "Look into", meaning: "To investigate an issue." }
    ],
    dialogue: [
      { sender: 'ai', text: "Hi, I received your request for the Q4 information, but the schedule document seems to be missing from the thread. Could you please send it over?", translation: "Oi, recebi seu pedido para as informações do quarto trimestre, mas o documento de cronograma parece estar faltando na conversa. Você poderia enviá-lo?" },
      { sender: 'user', text: "I apologize for the oversight. Please find attached the updated schedule and the budget confirmation document you requested.", translation: "Peço desculpas pelo descuido. Por favor, encontre em anexo o cronograma atualizado e o documento de confirmação do orçamento que você solicitou." },
      { sender: 'ai', text: "Thank you. I see the attachment now. Also, I need to check your availability for a brief meeting next week. Does Monday work for you?", translation: "Obrigado. Vejo o anexo agora. Além disso, preciso verificar sua disponibilidade para uma breve reunião na próxima semana. Segunda-feira funciona para você?" },
      { sender: 'user', text: "Could you help me with the specific time? I have some availability in the afternoon. Thank you for your time and for looking into this so quickly.", translation: "Você poderia me ajudar com o horário específico? Tenho alguma disponibilidade à tarde. Obrigado pelo seu tempo e por verificar isso tão rapidamente." },
      { sender: 'ai', text: "Monday at 3 PM would be perfect. I'll send a calendar invite shortly to confirm the schedule.", translation: "Segunda-feira às 15h seria perfeito. Vou enviar um convite de calendário em breve para confirmar o cronograma." },
      { sender: 'user', text: "That works for me. By the way, did you receive the confirmation for the last payment?", translation: "Isso funciona para mim. Aliás, você recebeu a confirmação do último pagamento?" },
      { sender: 'ai', text: "Let me check... Yes, it was processed yesterday. We'll send the official receipt by the end of the week.", translation: "Deixe-me verificar... Sim, foi processado ontem. Enviaremos o recibo oficial até o final da semana." },
      { sender: 'user', text: "That's great to hear. Is there anything else you need from my side before our meeting?", translation: "Que bom ouvir isso. Tem mais alguma coisa que você precisa da minha parte antes da nossa reunião?" },
      { sender: 'ai', text: "Not for now. I'll review the documents you sent and we can discuss them in detail on Monday.", translation: "Por enquanto não. Vou revisar os documentos que você enviou e podemos discuti-los em detalhes na segunda-feira." },
      { sender: 'user', text: "Understood. I'll make sure to have all the necessary information ready.", translation: "Entendido. Vou garantir que todas as informações necessárias estejam prontas." },
      { sender: 'ai', text: "Perfect. Have a great weekend!", translation: "Perfeito. Tenha um ótimo final de semana!" },
      { sender: 'user', text: "Thank you, you too. Talk to you on Monday.", translation: "Obrigado, você também. Falamos na segunda-feira." }
    ]
  },
  "5": {
    title: "Networking & Events",
    aiRole: "Conference Attendee",
    contextTip: "Use 'What do you do?' to learn more about people you meet. Mention your industry and career goals.",
    introduction: {
      scenario: "You are at an international industry conference during a coffee break. You meet Sarah, a professional from another tech firm.",
      goal: "Practice networking, introducing your company, and exchanging business contact information.",
      keyVocabulary: ["Firm", "Trends", "Insights", "LinkedIn"]
    },
    phrasalVerbs: [
      { verb: "Set up", meaning: "To establish a company or project." },
      { verb: "Reach out", meaning: "To contact someone for networking." }
    ],
    dialogue: [
      { sender: 'ai', text: "The networking session is quite busy today! Hi, I'm Sarah from an international tech firm. Which company do you work for?", translation: "A sessão de networking está bem movimentada hoje! Oi, eu sou a Sarah de uma empresa de tecnologia internacional. Para qual empresa você trabalha?" },
      { sender: 'user', text: "Hi Sarah! It's a great conference. I work for a multinational industry leader in IT. What do you do at your firm?", translation: "Oi Sarah! É uma ótima conferência. Trabalho para uma líder multinacional da indústria de TI. O que você faz na sua empresa?" },
      { sender: 'ai', text: "I work in HR, focusing on career development and talent opportunity. Is this your first time at this workshop?", translation: "Trabalho no RH, com foco em desenvolvimento de carreira e oportunidades de talentos. É sua primeira vez neste workshop?" },
      { sender: 'user', text: "Yes, it is! I'm here to expand my professional contact list and learn about new trends in the industry. It's a great opportunity.", translation: "Sim, é! Estou aqui para expandir minha lista de contatos profissionais e aprender sobre novas tendências no setor. É uma ótima oportunidade." },
      { sender: 'ai', text: "Absolutely. I've heard your company is doing some amazing things with cloud infrastructure lately. Are you involved in that?", translation: "Com certeza. Ouvi dizer que sua empresa está fazendo coisas incríveis com infraestrutura de nuvem ultimamente. Você está envolvido nisso?" },
      { sender: 'user', text: "Yes, I am. I'm currently working on a project to optimize our data center efficiency. It's been quite a challenge!", translation: "Sim, estou. No momento, estou trabalhando em um projeto para otimizar a eficiência do nosso data center. Tem sido um grande desafio!" },
      { sender: 'ai', text: "I can imagine. We're also looking to improve our tech stack in the coming months. Perhaps we could share some insights?", translation: "Eu imagino. Também estamos procurando melhorar nossa stack tecnológica nos próximos meses. Talvez pudéssemos compartilhar algumas ideias?" },
      { sender: 'user', text: "I'd love that. It's always beneficial to see how others in the industry are tackling similar issues.", translation: "Eu adoraria. É sempre benéfico ver como outros na indústria estão lidando com problemas semelhantes." },
      { sender: 'ai', text: "Definitely. Here is my business card. We should stay in touch regarding future projects.", translation: "Definitivamente. Aqui está meu cartão de visitas. Devemos manter contato sobre projetos futuros." },
      { sender: 'user', text: "Thank you. I'll make sure to reach out to you on LinkedIn as well.", translation: "Obrigado. Vou garantir de entrar em contato com você no LinkedIn também." },
      { sender: 'ai', text: "Great! It was nice talking to you, Sarah. Enjoy the rest of the event!", translation: "Ótimo! Foi bom conversar com você, Sarah. Aproveite o resto do evento!" },
      { sender: 'user', text: "It was a pleasure meeting you too. Have a great time at the remaining workshops!", translation: "Foi um prazer conhecê-la também. Divirta-se nos workshops restantes!" }
    ]
  },
  "6": {
    title: "Teams & Online Calls",
    aiRole: "Remote Colleague",
    contextTip: "Troubleshoot common audio/video issues with phrases like 'Your microphone is muted' and 'I'll share my screen'.",
    introduction: {
      scenario: "You are on a video call with a remote colleague. There are some technical issues with the connection and microphone.",
      goal: "Practice technical troubleshooting language and maintaining professional communication during disruptions.",
      keyVocabulary: ["Unstable", "Muted", "Headset", "Bandwidth"]
    },
    phrasalVerbs: [
      { verb: "Cut out", meaning: "When audio/video suddenly stops working." },
      { verb: "Speak up", meaning: "To talk louder." }
    ],
    dialogue: [
      { sender: 'ai', text: "Hello? Can you hear me? I think my connection is a bit unstable today. Wait, I think your microphone is muted.", translation: "Alô? Você pode me ouvir? Acho que minha conexão está um pouco instável hoje. Espere, acho que seu microfone está silenciado." },
      { sender: 'user', text: "Sorry about that! Can you hear me now? I was having a minor audio issue with my headset.", translation: "Desculpe por isso! Pode me ouvir agora? Eu estava tendo um pequeno problema de áudio com meu headset." },
      { sender: 'ai', text: "Yes, much better. I'll share my screen now to show you the latest project metrics. Can you see the camera feed as well?", translation: "Sim, muito melhor. Vou compartilhar minha tela agora para mostrar as últimas métricas do projeto. Você consegue ver o feed da câmera também?" },
      { sender: 'user', text: "I can see your screen, but the connection seems a bit slow. Could you repeat that last part, please? You cut out for a second.", translation: "Consigo ver sua tela, mas a conexão parece um pouco lenta. Você poderia repetir aquela última parte, por favor? Você falhou por um segundo." },
      { sender: 'ai', text: "Sure. I said the internet issue might be on my end. I'll try to turn off my camera to save bandwidth. Better now?", translation: "Claro. Eu disse que o problema de internet pode ser do meu lado. Vou tentar desligar minha câmera para economizar largura de banda. Melhor agora?" },
      { sender: 'user', text: "Yes, the audio is much clearer now. Thank you for making that adjustment.", translation: "Sim, o áudio está muito mais claro agora. Obrigado por fazer esse ajuste." },
      { sender: 'ai', text: "No problem. Now, looking at the graph on the screen, do you see the dip in engagement for Q3?", translation: "Sem problemas. Agora, olhando para o gráfico na tela, você vê a queda no engajamento no terceiro trimestre?" },
      { sender: 'user', text: "I see it. I think we need to look into the external factors that might have caused that.", translation: "Eu vejo. Acho que precisamos investigar os fatores externos que podem ter causado isso." },
      { sender: 'ai', text: "Agreed. I'll send you the detailed report after this call so you can analyze it further.", translation: "Concordo. Vou enviar o relatório detalhado após esta chamada para que você possa analisá-lo melhor." },
      { sender: 'user', text: "That would be very helpful. I'll also share my thoughts on it during our next call.", translation: "Isso seria muito útil. Também compartilharei meus pensamentos sobre isso durante nossa próxima chamada." },
      { sender: 'ai', text: "Perfect. Let's continue with the rest of the slides. Oh, wait, I think I'm having another connection issue...", translation: "Perfeito. Vamos continuar com o resto dos slides. Ah, espere, acho que estou tendo outro problema de conexão..." },
      { sender: 'user', text: "Don't worry, I can still hear you. Let's keep going, and if it gets worse, we can switch to an audio-only call.", translation: "Não se preocupe, ainda consigo te ouvir. Vamos continuar, e se piorar, podemos mudar para uma chamada apenas de áudio." }
    ]
  },
  "7": {
    title: "Prepositions & Travel",
    aiRole: "Airport Agent",
    contextTip: "Use prepositions like 'in', 'on', 'next to' and 'between' to describe locations accurately.",
    introduction: {
      scenario: "You are at the airport check-in counter for an international business trip. The agent is helping you with your suitcase and boarding details.",
      goal: "Practice using spatial prepositions (in, on, next to) correctly in a real-world travel context.",
      keyVocabulary: ["Suitcase", "Scale", "Pharmacy", "Identification"]
    },
    phrasalVerbs: [
      { verb: "Check in", meaning: "To register at an airport or hotel." },
      { verb: "Go through", meaning: "To pass through security or a gate." }
    ],
    dialogue: [
      { sender: 'ai', text: "Welcome to the airport. To proceed with your check-in, where is your passport?", translation: "Bem-vindo ao aeroporto. Para prosseguir com seu check-in, onde está seu passaporte?" },
      { sender: 'user', text: "It is in my bag. Let me get it for you.", translation: "Está na minha bolsa. Deixe-me pegá-lo para você." },
      { sender: 'ai', text: "Thank you. Please place your suitcase on the scale next to the counter.", translation: "Obrigado. Por favor, coloque sua mala na balança ao lado do balcão." },
      { sender: 'user', text: "Okay, it is on the scale now. Is the weight acceptable?", translation: "Ok, está na balança agora. O peso está aceitável?" },
      { sender: 'ai', text: "Yes, it's perfect. Now, please stand in front of the camera for the identification photo.", translation: "Sim, está perfeito. Agora, por favor, fique na frente da câmera para a foto de identificação." },
      { sender: 'user', text: "I am in front of the camera. Should I look directly at the lens?", translation: "Estou na frente da câmera. Devo olhar diretamente para a lente?" },
      { sender: 'ai', text: "Yes, please. Thank you. Your gate is number 12. It is next to the restaurant, between the pharmacy and the café.", translation: "Sim, por favor. Obrigado. Seu portão é o número 12. Fica ao lado do restaurante, entre a farmácia e o café." },
      { sender: 'user', text: "Thank you. Is the restaurant behind the security check area?", translation: "Obrigado. O restaurante fica atrás da área de controle de segurança?" },
      { sender: 'ai', text: "Exactly, it is behind security. The coffee shop is also right next to it.", translation: "Exatamente, fica atrás da segurança. A cafeteria também fica bem ao lado dele." },
      { sender: 'user', text: "I see it. Oh, I think my phone is under the chair. Let me grab it before I go.", translation: "Eu vejo. Ah, acho que meu celular está embaixo da cadeira. Deixe-me pegá-lo antes de ir." },
      { sender: 'ai', text: "No problem. Once you have it, you can go through gate 12. Have a safe flight!", translation: "Sem problemas. Assim que o tiver, você pode passar pelo portão 12. Tenha um voo seguro!" },
      { sender: 'user', text: "Thank you for your help. Have a great day!", translation: "Obrigado pela sua ajuda. Tenha um ótimo dia!" }
    ]
  }
};

export default function ConversationalSimulator({ params }: { params: Promise<{ id: string }> }) {
  const { id: lessonId } = React.use(params);
  const lesson = lessonsData[lessonId] || lessonsData["1"];

  const [visibleStep, setVisibleStep] = useState(1);
  const [showBriefing, setShowBriefing] = useState(true);
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
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 flex items-center justify-center text-[#D97706]">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Mission Briefing</h2>
                  <h3 className="font-serif text-2xl font-bold text-white">{lesson.title}</h3>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-2">The Scenario</h4>
                  <p className="text-gray-300 leading-relaxed italic">"{lesson.introduction.scenario}"</p>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-2">Primary Goal</h4>
                  <p className="text-gray-300 leading-relaxed">{lesson.introduction.goal}</p>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-3">Key Vocabulary</h4>
                  <div className="flex flex-wrap gap-2">
                    {lesson.introduction.keyVocabulary.map((word: string, i: number) => (
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
