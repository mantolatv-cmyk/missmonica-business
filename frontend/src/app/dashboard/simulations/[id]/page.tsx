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
        goalTranslation: "Apresente-se de forma simples e mencione sua cidade.",
        keyVocabulary: [
          { word: "Hi", translation: "Oi" },
          { word: "Meeting", translation: "Reunião" },
          { word: "Office", translation: "Escritório" },
          { word: "Name", translation: "Nome" }
        ],
        introduction: {
          scenario: "You are entering an online call. A friendly colleague is greeting you.",
          scenarioTranslation: "Você está entrando em uma chamada online. Um colega amigável está te cumprimentando."
        },
        phrasalVerbs: [
          { verb: "Catch up", meaning: "Colocar o papo em dia." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello! Welcome to the meeting. I am David from the New York office. What is your name?", translation: "Olá! Bem-vindo à reunião. Eu sou o David do escritório de Nova York. Qual é o seu nome?" },
          { sender: 'user', text: "Hello David! My name is Monica. I am from Brazil, and I live in São Paulo.", translation: "Olá David! Meu nome é Monica. Eu sou do Brasil, e moro em São Paulo." },
          { sender: 'ai', text: "Nice to meet you, Monica! Is this your first international meeting with our team?", translation: "Prazer em conhecê-la, Monica! Esta é a sua primeira reunião internacional com a nossa equipe?" },
          { sender: 'user', text: "Yes, it is! I am very excited to meet everyone and work together on this project.", translation: "Sim, é! Estou muito animada para conhecer todos e trabalharmos juntos neste projeto." },
          { sender: 'ai', text: "That's great! How is the weather in São Paulo today? Is it warm?", translation: "Que ótimo! Como está o tempo em São Paulo hoje? Está quente?" },
          { sender: 'user', text: "Yes, it is very sunny and warm today. How is the weather in New York?", translation: "Sim, está muito ensolarado e quente hoje. Como está o tempo em Nova York?" },
          { sender: 'ai', text: "It is a bit cold and rainy here, typical spring weather. Are you ready to meet the coordinator?", translation: "Está um pouco frio e chuvoso aqui, clima típico de primavera. Você está pronta para conhecer o coordenador?" },
          { sender: 'user', text: "Yes, I am ready. I have my slides ready to show.", translation: "Sim, estou pronta. Tenho meus slides prontos para mostrar." }
        ]
      },
      Intermediate: {
        contextTip: "Focus on building rapport. Use 'Nice to meet you' and ask about their work.",
        goal: "Engage in small talk about remote work and team dynamics.",
        goalTranslation: "Participe de conversas informais sobre trabalho remoto e dinâmica de equipe.",
        keyVocabulary: [
          { word: "Catch up", translation: "Colocar o papo em dia" },
          { word: "Remote work", translation: "Trabalho remoto" },
          { word: "Schedule", translation: "Cronograma/Agenda" },
          { word: "Multinational", translation: "Multinacional" }
        ],
        introduction: {
          scenario: "You are joining an online meeting a few minutes early. You meet John, a colleague from the London office, whom you've never spoken to before.",
          scenarioTranslation: "Você está entrando em uma reunião online alguns minutos mais cedo. Você encontra John, um colega do escritório de Londres, com quem você nunca falou antes."
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
          { sender: 'user', text: "Not as often as I'd like, but I'm looking forward to more collaboration in the future. It's a great opportunity to learn.", translation: "Não tão frequentemente quanto eu gostaria, mas estou ansioso por mais colaboração no futuro. É uma ótima oportunidade para aprender." },
          { sender: 'ai', text: "Absolutely. Well, let's get started with the presentation, shall we? I'm excited to hear your thoughts on the first few modules.", translation: "Com certeza. Bem, vamos começar a apresentação, então? Estou animado para ouvir seus pensamentos sobre os primeiros módulos." },
          { sender: 'user', text: "Yes, let's. I'll share my screen and we can walk through the initial phases together.", translation: "Sim, vamos. Vou compartilhar minha tela e podemos passar pelas fases iniciais juntos." }
        ]
      },
      Advanced: {
        contextTip: "Focus on executive nuances. Use 'Rapport', 'Stakeholder', and lead the transition to business.",
        goal: "Manage a complex professional introduction and set the agenda for the meeting.",
        goalTranslation: "Gerencie uma apresentação profissional complexa e defina a pauta da reunião.",
        keyVocabulary: [
          { word: "Stakeholder", translation: "Partes interessadas" },
          { word: "Rapport", translation: "Sintonia / Empatia mútua" },
          { word: "Strategic", translation: "Estratégico" },
          { word: "Keynote", translation: "Apresentação principal" }
        ],
        introduction: {
          scenario: "You are leading a major kickoff meeting with global directors. You need to establish instant credibility.",
          scenarioTranslation: "Você está liderando uma grande reunião de alinhamento com diretores globais. Você precisa estabelecer credibilidade imediata."
        },
        phrasalVerbs: [
          { verb: "Align with", meaning: "Ajustar ou sincronizar com parceiros." },
          { verb: "Lead into", meaning: "Guiar a conversa em direção a um assunto." }
        ],
        dialogue: [
          { sender: 'ai', text: "Good morning. We have critical stakeholders joining shortly. Are we fully prepared to present our key deliverables?", translation: "Bom dia. Temos stakeholders críticos entrando em breve. Estamos totalmente preparados para apresentar nossas principais entregas?" },
          { sender: 'user', text: "Indeed. I've optimized our team slides to build strong rapport and set a highly strategic agenda for this kickoff.", translation: "De fato. Otimizei os slides da nossa equipe para criar uma forte sintonia e definir uma agenda altamente estratégica para este pontapé inicial." },
          { sender: 'ai', text: "Excellent. How do you propose we handle their concerns regarding the projected Q3 timeline?", translation: "Excelente. Como você propõe lidarmos com as preocupações deles sobre o cronograma projetado do terceiro trimestre?" },
          { sender: 'user', text: "We should present our roadmap metrics first, transitioning smoothly into how this schedule secures long-term value.", translation: "Devemos apresentar as métricas do nosso mapa de desenvolvimento primeiro, fazendo uma transição suave para como este cronograma garante valor a longo prazo." },
          { sender: 'ai', text: "That makes sense. They will likely push back on the budget allocation. Do we have a contingency model ready?", translation: "Isso faz sentido. Eles provavelmente vão questionar a alocação de orçamento. Temos um modelo de contingência pronto?" },
          { sender: 'user', text: "Yes, we've prepared a secondary scenario that reallocates minor resources without impacting our core milestones.", translation: "Sim, preparamos um cenário secundário que realoca recursos menores sem impactar nossos marcos principais." },
          { sender: 'ai', text: "Perfect. This will demonstrate high adaptability. I want you to lead the transition when we reach the cost review slide.", translation: "Perfeito. Isso demonstrará alta adaptabilidade. Quero que você liderere a transição quando chegarmos ao slide de revisão de custos." },
          { sender: 'user', text: "Understood. I will leverage our Q1 insights to demonstrate value, ensuring everyone sees this rollout as a win-win partnership.", translation: "Entendido. Vou aproveitar nossos insights do primeiro trimestre para demonstrar valor, garantindo que todos vejam esta implantação como uma parceria em que todos ganham." },
          { sender: 'ai', text: "Splendid. Let's make sure our communication remains crisp and action-oriented throughout the session.", translation: "Esplêndido. Vamos garantir que nossa comunicação permaneça nítida e orientada para a ação durante toda a sessão." },
          { sender: 'user', text: "Agreed. I'll open the shared keynote file now and ensure our screen projection is stable before they log on.", translation: "Acordado. Vou abrir o arquivo keynote compartilhado agora e garantir que nossa projeção de tela esteja estável antes de eles entrarem." }
        ]
      }
    }
  },
  "2": {
    title: "Meetings & Communication",
    aiRole: "Project Manager",
    difficultySettings: {
      Beginner: {
        contextTip: "Use 'Yes' and 'No' clearly. Practice 'I can' and 'I will'.",
        goal: "Confirm your attendance and mention your current task.",
        goalTranslation: "Confirme sua presença e mencione sua tarefa atual.",
        keyVocabulary: [
          { word: "Meeting", translation: "Reunião" },
          { word: "Task", translation: "Tarefa" },
          { word: "Yes", translation: "Sim" },
          { word: "Now", translation: "Agora" }
        ],
        introduction: {
          scenario: "Your team manager is checking if you can join the daily stand-up meeting.",
          scenarioTranslation: "O gerente da sua equipe está verificando se você pode participar da reunião diária de acompanhamento."
        },
        phrasalVerbs: [
          { verb: "Go over", meaning: "Revisar um detalhe ou tarefa." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hi! Can you join our team meeting now?", translation: "Oi! Você pode participar da nossa reunião de equipe agora?" },
          { sender: 'user', text: "Yes, I can join. I am ready for the call.", translation: "Sim, eu posso participar. Estou pronta para a chamada." },
          { sender: 'ai', text: "Great. Did you complete the backend integration task?", translation: "Ótimo. Você concluiu a tarefa de integração do backend?" },
          { sender: 'user', text: "Yes, the task is complete. I can show the results now.", translation: "Sim, a tarefa está concluída. Eu posso mostrar os resultados agora." },
          { sender: 'ai', text: "Awesome. Do you have any questions about the next task?", translation: "Incrível. Você tem alguma dúvida sobre a próxima tarefa?" },
          { sender: 'user', text: "No, I do not. The instructions are very clear.", translation: "Não, não tenho. As instruções estão muito claras." },
          { sender: 'ai', text: "Perfect. I will write the meeting minutes now.", translation: "Perfeito. Vou escrever a ata da reunião agora." },
          { sender: 'user', text: "Thank you. I will check my email for the update.", translation: "Obrigada. Vou verificar meu e-mail para a atualização." }
        ]
      },
      Intermediate: {
        contextTip: "Use 'I agree' or 'I see your point' before expressing a different opinion.",
        goal: "Communicate task progress, request feedback, and handle schedule changes professionally.",
        goalTranslation: "Comunique o progresso das tarefas, solicite feedback e lide com mudanças de cronograma profissionalmente.",
        keyVocabulary: [
          { word: "Deadline", translation: "Prazo limite" },
          { word: "Feedback", translation: "Retorno / Avaliação" },
          { word: "Agenda", translation: "Pauta / Ordem do dia" },
          { word: "Push back", translation: "Adiar / Postergar" }
        ],
        introduction: {
          scenario: "You are in a weekly alignment meeting. The Project Manager is reviewing the Q3 release schedule and needs status updates.",
          scenarioTranslation: "Você está em uma reunião semanal de alinhamento. O Gerente de Projeto está revisando o cronograma de lançamento do terceiro trimestre e precisa de atualizações de status."
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
          { sender: 'user', text: "Agreed. I'll send you an update via email with the revised task breakdown later today.", translation: "Concordo. Vou enviar uma atualização por e-mail com a divisão de tarefas revisada ainda hoje." }
        ]
      },
      Advanced: {
        contextTip: "Focus on strategic alignment. Use 'Prioritize', 'Bandwidth', and 'Bottleneck'.",
        goal: "Lead the meeting discussion, address resource bottlenecks, and redefine project milestones.",
        goalTranslation: "Lidere a discussão da reunião, aborde gargalos de recursos e redefina os marcos do projeto.",
        keyVocabulary: [
          { word: "Prioritize", translation: "Priorizar" },
          { word: "Milestone", translation: "Marco / Ponto de controle" },
          { word: "Bottleneck", translation: "Gargalo" },
          { word: "Stakeholder", translation: "Parte interessada" }
        ],
        introduction: {
          scenario: "You are in an executive alignment call to resolve a major delivery delay that impacts prime stakeholders.",
          scenarioTranslation: "Você está em uma chamada de alinhamento executivo para resolver um atraso crítico de entrega que afeta stakeholders importantes."
        },
        phrasalVerbs: [
          { verb: "Iron out", meaning: "Resolver ou ajustar pequenos problemas." },
          { verb: "Call off", meaning: "Cancelar um compromisso ou atividade." }
        ],
        dialogue: [
          { sender: 'ai', text: "We are facing a severe development bottleneck. Our Q3 milestone is at risk. How do you propose we adjust our team bandwidth?", translation: "Estamos enfrentando um gargalo severo de desenvolvimento. Nosso marco do terceiro trimestre está em risco. Como você sugere ajustarmos a largura de banda da nossa equipe?" },
          { sender: 'user', text: "We must prioritize core features to clear the bottleneck, which means we might need to push back the secondary integration items.", translation: "Devemos priorizar os recursos essenciais para eliminar o gargalo, o que significa que podemos precisar adiar os itens de integração secundários." },
          { sender: 'ai', text: "That strategy will certainly trigger questions from our key stakeholders. How will you justify this delay?", translation: "Essa estratégia certamente gerará questionamentos de nossos principais stakeholders. Como você justificará esse atraso?" },
          { sender: 'user', text: "I will secure alignment by presenting a risk-mitigation model that proves this path prevents critical software bugs.", translation: "Vou garantir o alinhamento apresentando um modelo de mitigação de risco que prova que este caminho evita bugs críticos no software." },
          { sender: 'ai', text: "Fair enough. But what if the marketing team refuses to push back their launch campaign schedule?", translation: "Justo. Mas e se a equipe de marketing se recusar a adiar o cronograma da campanha de lançamento deles?" },
          { sender: 'user', text: "I'll circle back with the marketing director today to iron out a hybrid release plan that allows pre-launch signups.", translation: "Vou retomar com o diretor de marketing hoje para resolver um plano de lançamento híbrido que permita inscrições antes do lançamento." },
          { sender: 'ai', text: "Excellent. That would keep their campaign active while protecting our backend stability. Who will take the lead on this?", translation: "Excelente. Isso manteria a campanha deles ativa enquanto protege a estabilidade do nosso backend. Quem assumirá a liderança nisso?" },
          { sender: 'user', text: "I will personally facilitate the coordination session and ensure all action items are assigned with clear ownership.", translation: "Eu pessoalmente facilitarei a sessão de coordenação e garantirei que todos os itens de ação sejam atribuídos com propriedade clara." },
          { sender: 'ai', text: "Good. Please share the revised minutes and action plan with all stakeholders immediately after that call.", translation: "Bom. Por favor, compartilhe a ata revisada e o plano de ação com todos os stakeholders imediatamente após essa chamada." },
          { sender: 'user', text: "Understood. I will draft the email summary and make sure everyone is fully aligned before the day ends.", translation: "Entendido. Vou redigir o resumo por e-mail e garantir que todos estejam totalmente alinhados antes do fim do dia." }
        ]
      }
    }
  },
  "3": {
    title: "Interviews & HR",
    aiRole: "HR Recruiter",
    difficultySettings: {
      Beginner: {
        contextTip: "Practice your name and role.",
        goal: "Introduce yourself simply.",
        goalTranslation: "Apresente-se de forma simples.",
        keyVocabulary: [
          { word: "Name", translation: "Nome" },
          { word: "Job", translation: "Trabalho/Profissão" },
          { word: "From", translation: "De (origem)" },
          { word: "Live", translation: "Morar" }
        ],
        introduction: {
          scenario: "You are introducing yourself in a preliminary HR screening call.",
          scenarioTranslation: "Você está se apresentando em uma chamada preliminar de triagem de RH."
        },
        phrasalVerbs: [
          { verb: "Fill out", meaning: "Preencher um formulário ou documento." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello! Thank you for coming today. Can you please introduce yourself?", translation: "Olá! Obrigado por vir hoje. Você poderia, por favor, se apresentar?" },
          { sender: 'user', text: "Hello! My name is Monica. I am a Project Coordinator. I live in São Paulo.", translation: "Olá! Meu nome é Monica. Eu sou uma coordenadora de projetos. Moro em São Paulo." },
          { sender: 'ai', text: "Excellent! Do you like working on international projects?", translation: "Excelente! Você gosta de trabalhar em projetos internacionais?" },
          { sender: 'user', text: "Yes, I do. I want to build a career in a global company.", translation: "Sim, eu gosto. Quero construir uma carreira em uma empresa global." },
          { sender: 'ai', text: "Great. Are you ready to work in a hybrid model?", translation: "Ótimo. Você está pronta para trabalhar em um modelo híbrido?" },
          { sender: 'user', text: "Yes, I am. I can work in the office two days a week.", translation: "Sim, estou. Posso trabalhar no escritório dois dias por semana." },
          { sender: 'ai', text: "Perfect. Do you speak English every day at work?", translation: "Perfeito. Você fala inglês todos os dias no trabalho?" },
          { sender: 'user', text: "Yes, I do. I use English to read reports and write emails.", translation: "Sim, falo. Uso inglês para ler relatórios e escrever e-mails." }
        ]
      },
      Intermediate: {
        contextTip: "Talk about strengths and walk through your experience.",
        goal: "Explain your background and professional experience.",
        goalTranslation: "Explique seu histórico e experiência profissional.",
        keyVocabulary: [
          { word: "Resume", translation: "Currículo" },
          { word: "Skills", translation: "Habilidades" },
          { word: "Team", translation: "Equipe" },
          { word: "Achieve", translation: "Alcançar" }
        ],
        introduction: {
          scenario: "You are in a standard HR interview explaining your project achievements.",
          scenarioTranslation: "Você está em uma entrevista de RH padrão explicando as conquistas do seu projeto."
        },
        phrasalVerbs: [
          { verb: "Walk through", meaning: "Explicar ou guiar passo a passo." }
        ],
        dialogue: [
          { sender: 'ai', text: "Welcome, Monica. Looking at your resume, could you walk me through your professional background?", translation: "Bem-vinda, Monica. Olhando para o seu currículo, você poderia me guiar pelo seu histórico profissional?" },
          { sender: 'user', text: "Certainly. I have spent the last four years leading cross-functional teams and managing project scheduling.", translation: "Com certeza. Passei os últimos quatro anos liderando equipes multifuncionais e gerenciando o cronograma de projetos." },
          { sender: 'ai', text: "That sounds solid. What would you say is your main professional strength?", translation: "Isso parece sólido. Qual você diria que é sua principal força profissional?" },
          { sender: 'user', text: "My main strength is clear communication. I ensure everyone on the team is on the same page regarding tasks.", translation: "Minha principal força é a comunicação clara. Garanto que todos na equipe estejam alinhados em relação às tarefas." },
          { sender: 'ai', text: "And how do you handle tight deadlines or stressful situations in the workspace?", translation: "E como você lida com prazos apertados ou situações estressantes no ambiente de trabalho?" },
          { sender: 'user', text: "I prioritize essential tasks, delegate secondary action items, and maintain open channels with stakeholders.", translation: "Priorizo as tarefas essenciais, delego itens de ação secundários e mantenho canais abertos com os stakeholders." },
          { sender: 'ai', text: "Excellent approach. Why are you looking to leave your current employer at this stage?", translation: "Excelente abordagem. Por que você está buscando deixar seu empregador atual nesta fase?" },
          { sender: 'user', text: "I am looking for a new challenge in a multinational company where I can scale my project coordination skills.", translation: "Estou procurando um novo desafio em uma empresa multinacional onde possa expandir minhas habilidades de coordenação de projetos." },
          { sender: 'ai', text: "That makes perfect sense. Do you have any questions for me about our corporate culture?", translation: "Isso faz todo o sentido. Você tem alguma pergunta para mim sobre nossa cultura corporativa?" },
          { sender: 'user', text: "Yes, I do. How does your company support professional growth and international collaboration?", translation: "Sim, tenho. Como sua empresa apoia o crescimento profissional e a colaboração internacional?" }
        ]
      },
      Advanced: {
        contextTip: "Focus on the STAR method (Situation, Task, Action, Result).",
        goal: "Demonstrate high-level leadership and crisis resolution.",
        goalTranslation: "Demonstre liderança de alto nível e resolução de crises.",
        keyVocabulary: [
          { word: "Leadership", translation: "Liderança" },
          { word: "Stakeholder", translation: "Parte interessada" },
          { word: "Resolution", translation: "Resolução" },
          { word: "Turnaround", translation: "Reviravolta / Recuperação" }
        ],
        introduction: {
          scenario: "You are undergoing an executive behavioral interview with a senior recruiter.",
          scenarioTranslation: "Você está passando por uma entrevista comportamental executiva com um recrutador sênior."
        },
        phrasalVerbs: [
          { verb: "Take on", meaning: "Assumir responsabilidade ou desafio." },
          { verb: "Carry out", meaning: "Executar ou colocar em prática." }
        ],
        dialogue: [
          { sender: 'ai', text: "Describe a situation where you had to manage a critical project failure with high stakeholder exposure.", translation: "Descreva uma situação em que você teve que gerenciar uma falha crítica de projeto com alta exposição para os stakeholders." },
          { sender: 'user', text: "In my previous role, a major system update failed during rollout. I immediately took on the challenge, setting up an agile recovery war room.", translation: "Em minha função anterior, uma grande atualização de sistema falhou durante o lançamento. Assumi imediatamente o desafio, montando uma sala de guerra ágil para recuperação." },
          { sender: 'ai', text: "What actions did you coordinate, and how did you mitigate stakeholder anxiety?", translation: "Quais ações você coordenou e como mitigou a ansiedade dos stakeholders?" },
          { sender: 'user', text: "I carried out a structured rollback plan, communicated transparently every two hours, and successfully restored operations within six hours.", translation: "Executei um plano de reversão estruturado, comuniquei-me de forma transparente a cada duas horas e restaurei com sucesso as operações dentro de seis horas." },
          { sender: 'ai', text: "That sounds like a high-pressure scenario. How did you handle the post-mortem analysis with the engineering team?", translation: "Esse parece ser um cenário de alta pressão. Como você lidou com a análise pós-morte com a equipe de engenharia?" },
          { sender: 'user', text: "I conducted a blameless post-mortem, focusing on root-cause analysis to ensure we established preventive testing guidelines.", translation: "Conduzi uma análise pós-morte sem culpados, focando na análise de causa raiz para garantir que estabelecêssemos diretrizes de testes preventivos." },
          { sender: 'ai', text: "Very professional. Executive leadership often expects rapid turnaround under tight budgets. How do you balance cost and quality?", translation: "Muito profissional. A liderança executiva frequentemente espera uma recuperação rápida sob orçamentos apertados. Como você equilibra custo e qualidade?" },
          { sender: 'user', text: "I leverage data-driven prioritization, securing stakeholder buy-in for core features while keeping secondary assets in the backlog.", translation: "Utilizo priorização baseada em dados, garantindo a aprovação dos stakeholders para os recursos essenciais enquanto mantenho ativos secundários no backlog." },
          { sender: 'ai', text: "Good. Finally, what does radical candor mean to you in the context of managing direct reports?", translation: "Bom. Finalmente, o que a franqueza radical significa para você no contexto de gerenciamento de subordinados diretos?" },
          { sender: 'user', text: "It means delivering direct, actionable feedback to drive performance, while showing genuine personal care for my team's growth.", translation: "Significa fornecer feedback direto e prático para impulsionar o desempenho, ao mesmo tempo em que demonstro cuidado pessoal genuíno pelo crescimento da minha equipe." }
        ]
      }
    }
  },
  "4": {
    title: "Professional Emails",
    aiRole: "Client",
    difficultySettings: {
      Beginner: {
        contextTip: "Use simple greetings and check attachments.",
        goal: "Verify that your email was sent correctly.",
        goalTranslation: "Verifique se seu e-mail foi enviado corretamente.",
        keyVocabulary: [
          { word: "Email", translation: "E-mail" },
          { word: "File", translation: "Arquivo" },
          { word: "Send", translation: "Enviar" },
          { word: "Inbox", translation: "Caixa de entrada" }
        ],
        introduction: {
          scenario: "You are telling a client that you sent them the project documents.",
          scenarioTranslation: "Você está dizendo a um cliente que enviou os documentos do projeto."
        },
        phrasalVerbs: [
          { verb: "Send over", meaning: "Enviar um arquivo ou documento." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hi Monica! Did you send the new file to my inbox?", translation: "Oi Monica! Você enviou o novo arquivo para a minha caixa de entrada?" },
          { sender: 'user', text: "Yes, I did. I sent over the documents this morning. Please check.", translation: "Sim, eu enviei. Enviei os documentos esta manhã. Por favor, verifique." },
          { sender: 'ai', text: "Great, I see it now. Thank you for the quick response!", translation: "Ótimo, estou vendo agora. Obrigado pela resposta rápida!" },
          { sender: 'user', text: "You are welcome. Let me know if you need more help.", translation: "De nada. Avise-me se precisar de mais ajuda." },
          { sender: 'ai', text: "Is the project schedule document in the same folder?", translation: "O documento de cronograma do projeto está na mesma pasta?" },
          { sender: 'user', text: "No, it is not. I will upload it in a few minutes.", translation: "Não, não está. Vou carregá-lo em alguns minutos." },
          { sender: 'ai', text: "Awesome. Please send me a quick text when it is done.", translation: "Incrível. Por favor, me envie uma mensagem rápida quando estiver pronto." },
          { sender: 'user', text: "I will do that immediately. Have a great day!", translation: "Farei isso imediatamente. Tenha um ótimo dia!" }
        ]
      },
      Intermediate: {
        contextTip: "Use polite, formal phrasing like 'Please find attached'.",
        goal: "Formally request feedback on a proposal.",
        goalTranslation: "Solicite formalmente feedback sobre uma proposta.",
        keyVocabulary: [
          { word: "Attached", translation: "Em anexo" },
          { word: "Request", translation: "Solicitação" },
          { word: "Oversight", translation: "Descuido / Lapso" },
          { word: "Shortly", translation: "Em breve" }
        ],
        introduction: {
          scenario: "You are emailing a client to get feedback on a revised budget layout.",
          scenarioTranslation: "Você está enviando um e-mail a um cliente para obter feedback sobre um layout de orçamento revisado."
        },
        phrasalVerbs: [
          { verb: "Look into", meaning: "Investigar ou analisar uma questão." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hi Monica, I received your email but the budget document is missing from the thread.", translation: "Oi Monica, recebi seu e-mail, mas o documento de orçamento está faltando na conversa." },
          { sender: 'user', text: "I apologize for the oversight. Please find the revised budget layout attached to this email.", translation: "Peço desculpas pelo descuido. Por favor, encontre o layout do orçamento revisado em anexo a este e-mail." },
          { sender: 'ai', text: "Thanks. I will look into it and send our initial comments shortly.", translation: "Obrigado. Vou analisar e enviar nossos comentários iniciais em breve." },
          { sender: 'user', text: "Perfect. I appreciate your feedback and look forward to finalizing this.", translation: "Perfeito. Agradeço seus comentários e estou ansiosa para finalizar isso." },
          { sender: 'ai', text: "By the way, did you forward the client's original request to the finance team?", translation: "A propósito, você encaminhou a solicitação original do cliente para a equipe de finanças?" },
          { sender: 'user', text: "Yes, I forwarded the complete email thread to them yesterday afternoon.", translation: "Sim, encaminhei a conversa de e-mail completa para eles ontem à tarde." },
          { sender: 'ai', text: "Excellent. Let's schedule a brief call for Monday to finalize the proposal details.", translation: "Excelente. Vamos agendar uma breve chamada para segunda-feira para finalizar os detalhes da proposta." },
          { sender: 'user', text: "Monday works well for me. I'll check my availability and send over an invite.", translation: "Segunda-feira funciona bem para mim. Vou verificar minha disponibilidade e enviar um convite." },
          { sender: 'ai', text: "Great. Please make sure to CC the project director on the invite.", translation: "Ótimo. Por favor, certifique-se de colocar o diretor do projeto em cópia (CC) no convite." },
          { sender: 'user', text: "Will do. I will include all relevant stakeholders in the calendar request.", translation: "Pode deixar. Vou incluir todas as partes interessadas relevantes na solicitação de calendário." }
        ]
      },
      Advanced: {
        contextTip: "Maintain an executive, professional but firm tone.",
        goal: "Resolve a critical billing discrepancy and settle a dispute.",
        goalTranslation: "Resolva uma discrepância crítica de faturamento e liquide uma disputa.",
        keyVocabulary: [
          { word: "Oversight", translation: "Descuido / Omissão" },
          { word: "Clarify", translation: "Esclarecer" },
          { word: "Discrepancy", translation: "Discrepância" },
          { word: "Reconciliation", translation: "Reconciliação" }
        ],
        introduction: {
          scenario: "You are writing to a corporate partner regarding a major accounting mismatch.",
          scenarioTranslation: "Você está escrevendo para um parceiro corporativo sobre uma grande inconsistência contábil."
        },
        phrasalVerbs: [
          { verb: "Clear up", meaning: "Esclarecer ou resolver uma confusão/problema." }
        ],
        dialogue: [
          { sender: 'ai', text: "Monica, our finance department identified a serious billing discrepancy in your Q2 invoicing schedule.", translation: "Monica, nosso departamento financeiro identificou uma discrepância de faturamento grave no seu cronograma de faturamento do segundo trimestre." },
          { sender: 'user', text: "Thank you for bringing this to my attention. I will personally look into the ledger to reconcile any discrepancy.", translation: "Obrigada por trazer isso à minha atenção. Eu pessoalmente analisarei o livro-razão para reconciliar qualquer discrepância." },
          { sender: 'ai', text: "We need this cleared up immediately, as it halts our quarterly audit cycle.", translation: "Precisamos disso resolvido imediatamente, pois isso interrompe nosso ciclo de auditoria trimestral." },
          { sender: 'user', text: "I completely understand the urgency. I will send over the corrected reconciliation ledger before the end of the day.", translation: "Compreendo totalmente a urgência. Enviarei o livro-razão de reconciliação corrigido antes do final do dia." },
          { sender: 'ai', text: "If the mismatch is due to a system oversight, we must establish a revised validation protocol.", translation: "Se a inconsistência for devido a um descuido do sistema, devemos estabelecer um protocolo de validação revisado." },
          { sender: 'user', text: "Agreed. I will propose a double-check validation flow to prevent such oversights in the future.", translation: "Acordado. Vou propor um fluxo de validação de dupla checagem para evitar tais descuidos no futuro." },
          { sender: 'ai', text: "That would be highly appreciated. How soon can we expect the official credit note?", translation: "Isso seria muito apreciado. Em quanto tempo podemos esperar a nota de crédito oficial?" },
          { sender: 'user', text: "Once the ledger is reconciled, I will issue the credit note and send it over via email shortly.", translation: "Assim que o livro-razão for reconciliado, emitirei a nota de crédito e a enviarei por e-mail em breve." },
          { sender: 'ai', text: "Thank you for your prompt response and professional management of this dispute.", translation: "Obrigado por sua resposta imediata e gerenciamento profissional desta disputa." },
          { sender: 'user', text: "It's my priority to ensure a transparent partnership. I will keep you posted on every step of this reconciliation.", translation: "É minha prioridade garantir uma parceria transparente. Vou mantê-lo informado sobre cada etapa desta reconciliação." }
        ]
      }
    }
  },
  "5": {
    title: "Networking & Events",
    aiRole: "Sarah",
    difficultySettings: {
      Beginner: {
        contextTip: "Practice standard greetings and exchange basic details.",
        goal: "Exchange business cards and find out the client's firm name.",
        goalTranslation: "Troque cartões de visita e descubra o nome da empresa do cliente.",
        keyVocabulary: [
          { word: "Company", translation: "Empresa" },
          { word: "Meet", translation: "Conhecer / Encontrar" },
          { word: "Card", translation: "Cartão de visitas" },
          { word: "Name", translation: "Nome" }
        ],
        introduction: {
          scenario: "You are greeting a professional during a coffee break at a summit.",
          scenarioTranslation: "Você está cumprimentando um profissional durante um intervalo para o café em um congresso."
        },
        phrasalVerbs: [
          { verb: "Set up", meaning: "Organizar ou estabelecer." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello! Are you enjoying the conference today?", translation: "Olá! Você está gostando da conferência hoje?" },
          { sender: 'user', text: "Hello! Yes, I am. I work for Monica Solutions. Here is my card.", translation: "Olá! Sim, estou. Trabalho para a Monica Solutions. Aqui está meu cartão." },
          { sender: 'ai', text: "Nice to meet you! I am Sarah from TechCorp. What do you do?", translation: "Prazer em conhecê-la! Eu sou a Sarah da TechCorp. O que você faz?" },
          { sender: 'user', text: "I am a Project Manager. It is great to meet you here, Sarah.", translation: "Sou gerente de projetos. É muito bom conhecer você aqui, Sarah." },
          { sender: 'ai', text: "Is your company based in Brazil?", translation: "Sua empresa está sediada no Brasil?" },
          { sender: 'user', text: "Yes, our main office is in São Paulo, but we work globally.", translation: "Sim, nosso escritório principal é em São Paulo, mas trabalhamos globalmente." },
          { sender: 'ai', text: "That's wonderful! Are you attending the next keynote speech?", translation: "Isso é maravilhoso! Você vai assistir à próxima palestra principal?" },
          { sender: 'user', text: "Yes, I am. We can walk there together if you want.", translation: "Sim, vou. Podemos caminhar até lá juntos se você quiser." }
        ]
      },
      Intermediate: {
        contextTip: "Ask about their industry and suggest connecting on LinkedIn.",
        goal: "Build professional rapport and expand your network.",
        goalTranslation: "Construa sintonia profissional e expanda sua rede de contatos.",
        keyVocabulary: [
          { word: "Network", translation: "Rede de contatos" },
          { word: "LinkedIn", translation: "LinkedIn" },
          { word: "Trends", translation: "Tendências" },
          { word: "Insights", translation: "Percepções" }
        ],
        introduction: {
          scenario: "You are discussing tech trends with a representative at a company booth.",
          scenarioTranslation: "Você está discutindo tendências tecnológicas com um representante no estande de uma empresa."
        },
        phrasalVerbs: [
          { verb: "Reach out", meaning: "Entrar em contato." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hi there! I really liked your questions during the panel on remote team management.", translation: "Olá! Gostei muito das suas perguntas durante o painel sobre gestão de equipes remotas." },
          { sender: 'user', text: "Thank you, Sarah. It is a critical topic. Are you seeing similar trends in your industry?", translation: "Obrigada, Sarah. É um tópico crítico. Você está vendo tendências semelhantes em seu setor?" },
          { sender: 'ai', text: "Absolutely. We should stay in touch to share insights. Let's connect on LinkedIn.", translation: "Com certeza. Devemos manter contato para compartilhar percepções. Vamos nos conectar no LinkedIn." },
          { sender: 'user', text: "That is a great idea. I will reach out to you on LinkedIn tonight to follow up.", translation: "Essa é uma ótima ideia. Entrarei em contato com você no LinkedIn hoje à noite para darmos andamento." },
          { sender: 'ai', text: "Perfect. We are also hosting a networking workshop tomorrow evening. Would you like to attend?", translation: "Perfeito. Também estamos organizando um workshop de networking amanhã à noite. Você gostaria de participar?" },
          { sender: 'user', text: "Yes, I would love to. Can you send me the registration link or the address?", translation: "Sim, eu adoraria. Você pode me enviar o link de inscrição ou o endereço?" },
          { sender: 'ai', text: "I'll message it to you once we connect on LinkedIn. It's a great event for industry professionals.", translation: "Vou enviar por mensagem assim que nos conectarmos no LinkedIn. É um ótimo evento para profissionais do setor." },
          { sender: 'user', text: "Excellent. I look forward to meeting your team and learning more about your projects.", translation: "Excelente. Estou ansiosa para conhecer sua equipe e saber mais sobre seus projetos." },
          { sender: 'ai', text: "Great! Let's make sure we catch up there. See you tomorrow, Monica.", translation: "Ótimo! Vamos nos certificar de conversar por lá. Até amanhã, Monica." },
          { sender: 'user', text: "See you tomorrow, Sarah. Thank you for the invite and have a great evening!", translation: "Até amanhã, Sarah. Obrigada pelo convite e tenha uma excelente noite!" }
        ]
      },
      Advanced: {
        contextTip: "Deliver a polished value proposition pitch.",
        goal: "Pitch your services and position a strategic partnership.",
        goalTranslation: "Apresente seus serviços e posicione uma parceria estratégica.",
        keyVocabulary: [
          { word: "Insight", translation: "Percepção profunda" },
          { word: "Strategy", translation: "Estratégia" },
          { word: "Proposition", translation: "Proposta de valor" },
          { word: "Synergy", translation: "Sinergia" }
        ],
        introduction: {
          scenario: "You are chatting with a high-level corporate director at an executive lounge.",
          scenarioTranslation: "Você está conversando com um diretor corporativo de alto nível em uma sala VIP executiva."
        },
        phrasalVerbs: [
          { verb: "Partner with", meaning: "Associar-se ou fazer parceria com." }
        ],
        dialogue: [
          { sender: 'ai', text: "Your session on operational synergy was inspiring. How does your firm position itself against legacy competitors?", translation: "Sua sessão sobre sinergia operacional foi inspiradora. Como sua empresa se posiciona contra concorrentes tradicionais?" },
          { sender: 'user', text: "We leverage a proprietary agile framework that reduces deployment cycles, yielding rapid operational synergy for our clients.", translation: "Nós aproveitamos um framework ágil proprietário que reduz os ciclos de implantação, gerando rápida sinergia operacional para nossos clientes." },
          { sender: 'ai', text: "That's an interesting value proposition. However, we already have established vendor partnerships.", translation: "Essa é uma proposta de valor interessante. No entanto, já temos parcerias de fornecedores estabelecidas." },
          { sender: 'user', text: "I understand. But we offer bespoke scaling strategies that complement existing frameworks, unlocking hidden efficiency.", translation: "Eu entendo. Mas oferecemos estratégias de escala personalizadas que complementam as estruturas existentes, liberando eficiência oculta." },
          { sender: 'ai', text: "Bespoke scaling sounds attractive, but our migration costs might outweigh the immediate efficiency gains.", translation: "Escalar sob medida parece atraente, mas nossos custos de migração podem superar os ganhos de eficiência imediatos." },
          { sender: 'user', text: "We actually guarantee a seamless integration with zero operational downtime, ensuring a positive ROI within Q1.", translation: "Nós realmente garantimos uma integração perfeita com zero tempo de inatividade operacional, garantindo um ROI positivo dentro do primeiro trimestre." },
          { sender: 'ai', text: "That is a bold claim. Do you have a case study or an evidence dossier we could review?", translation: "Essa é uma afirmação audaciosa. Você tem um estudo de caso ou um dossiê de evidências que possamos analisar?" },
          { sender: 'user', text: "Certainly. I can send over our latest case study detailing a 35% cost reduction for a major retail client.", translation: "Certamente. Posso enviar nosso estudo de caso mais recente detalhando uma redução de custo de 35% para um grande cliente de varejo." },
          { sender: 'ai', text: "Excellent. Let's set up a brief introductory call next week to dive into those metrics.", translation: "Excelente. Vamos agendar uma breve chamada introdutória na próxima semana para mergulhar nessas métricas." },
          { sender: 'user', text: "Perfect. I'll reach out to your assistant to coordinate the schedule and send over the dossier beforehand.", translation: "Perfeito. Entrarei em contato com sua assistente para coordenar a agenda e enviarei o dossiê com antecedência." }
        ]
      }
    }
  },
  "6": {
    title: "Teams & Online Calls",
    aiRole: "Alex",
    difficultySettings: {
      Beginner: {
        contextTip: "Say 'I can't hear you' or 'I can hear you' clearly.",
        goal: "Establish audio and video connection.",
        goalTranslation: "Estabeleça a conexão de áudio e vídeo.",
        keyVocabulary: [
          { word: "Audio", translation: "Áudio" },
          { word: "Video", translation: "Vídeo" },
          { word: "Hear", translation: "Ouvir" },
          { word: "See", translation: "Ver" }
        ],
        introduction: {
          scenario: "You are checking your connection before starting a video call.",
          scenarioTranslation: "Você está verificando sua conexão antes de iniciar uma chamada de vídeo."
        },
        phrasalVerbs: [
          { verb: "Turn on", meaning: "Ligar a câmera ou áudio." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello! Can you hear me? I cannot see your video.", translation: "Olá! Você pode me ouvir? Não consigo ver seu vídeo." },
          { sender: 'user', text: "Hi Alex! Yes, I can hear you. Let me turn on my camera.", translation: "Oi Alex! Sim, eu posso ouvir você. Deixe-me ligar a minha câmera." },
          { sender: 'ai', text: "Ah, perfect! Now I can see you clearly. Is your microphone okay?", translation: "Ah, perfeito! Agora posso ver você claramente. O seu microfone está ok?" },
          { sender: 'user', text: "Yes, my microphone is working. I am ready to start the meeting.", translation: "Sim, meu microfone está funcionando. Estou pronta para começar a reunião." },
          { sender: 'ai', text: "Great. Can you see the presentation slide on your screen?", translation: "Ótimo. Você consegue ver o slide de apresentação na sua tela?" },
          { sender: 'user', text: "Yes, I can see it very well. It is very clear.", translation: "Sim, consigo ver muito bem. Está muito claro." },
          { sender: 'ai', text: "Excellent. Let's start the review now.", translation: "Excelente. Vamos começar a revisão agora." },
          { sender: 'user', text: "Great. I am ready to listen and take notes.", translation: "Ótimo. Estou pronta para ouvir e tomar notas." }
        ]
      },
      Intermediate: {
        contextTip: "Politely mention glitches: 'Your mic is muted'.",
        goal: "Manage typical virtual meeting technical glitches.",
        goalTranslation: "Gerencie problemas técnicos típicos de reuniões virtuais.",
        keyVocabulary: [
          { word: "Muted", translation: "Mudo / Silenciado" },
          { word: "Connection", translation: "Conexão" },
          { word: "Unstable", translation: "Instável" },
          { word: "Screen", translation: "Tela" }
        ],
        introduction: {
          scenario: "You are dealing with audio drops and screen-sharing issues during a client sync.",
          scenarioTranslation: "Você está lidando com quedas de áudio e problemas de compartilhamento de tela durante um alinhamento com o cliente."
        },
        phrasalVerbs: [
          { verb: "Cut out", meaning: "Falhar ou ter cortes no áudio." }
        ],
        dialogue: [
          { sender: 'ai', text: "Monica, you are cutting out. I think your internet connection is a bit unstable.", translation: "Monica, você está cortando. Acho que sua conexão de internet está um pouco instável." },
          { sender: 'user', text: "I apologize. Let me turn off my video to save bandwidth. Can you hear me now?", translation: "Peço desculpas. Deixe-me desligar meu vídeo para economizar largura de banda. Consegue me ouvir agora?" },
          { sender: 'ai', text: "Yes, much better. Oh, by the way, you are sharing the wrong screen.", translation: "Sim, muito melhor. Ah, a propósito, você está compartilhando a tela errada." },
          { sender: 'user', text: "Oh, my bad. Let me close the other window and share the project agenda again.", translation: "Oh, erro meu. Deixe-me fechar a outra janela e compartilhar a pauta do projeto novamente." },
          { sender: 'ai', text: "Perfect. Now we can see the correct dashboard. Is your headset working well today?", translation: "Perfeito. Agora podemos ver o painel correto. Seu headset está funcionando bem hoje?" },
          { sender: 'user', text: "Yes, my headset is fine, but I think my microphone was muted automatically for a second.", translation: "Sim, meu headset está ótimo, mas acho que meu microfone foi silenciado automaticamente por um segundo." },
          { sender: 'ai', text: "Ah, that explains the silence! Let's proceed with the task status review.", translation: "Ah, isso explica o silêncio! Vamos prosseguir com a revisão de status das tarefas." },
          { sender: 'user', text: "Certainly. Let's troubleshoot the backend timeline before we wrap up.", translation: "Certamente. Vamos diagnosticar o cronograma do backend antes de encerrarmos." },
          { sender: 'ai', text: "Good idea. I'll take the minutes for this section while you explain the slides.", translation: "Boa ideia. Vou redigir a ata para esta seção enquanto você explica os slides." },
          { sender: 'user', text: "Perfect. I will go over each slide and highlight our main achievements.", translation: "Perfeito. Vou passar por cada slide e destacar nossas principais conquistas." }
        ]
      },
      Advanced: {
        contextTip: "Focus on virtual engagement and collaborative workflows.",
        goal: "Lead a high-stakes virtual workshop effectively.",
        goalTranslation: "Lidere um workshop virtual de alto impacto de forma eficaz.",
        keyVocabulary: [
          { word: "Bandwidth", translation: "Largura de banda" },
          { word: "Screen", translation: "Tela" },
          { word: "Whiteboard", translation: "Quadro branco" },
          { word: "Engagement", translation: "Engajamento" }
        ],
        introduction: {
          scenario: "You are facilitating a virtual workshop for global business heads with tools lag.",
          scenarioTranslation: "Você está facilitando um workshop virtual para chefes de negócios globais com lentidão nas ferramentas."
        },
        phrasalVerbs: [
          { verb: "Speak up", meaning: "Falar mais alto e com clareza." },
          { verb: "Log on", meaning: "Entrar ou autenticar-se no sistema." }
        ],
        dialogue: [
          { sender: 'ai', text: "Monica, the participants in APAC are experiencing severe lag on the collaborative whiteboard.", translation: "Monica, os participantes na região APAC estão experimentando um atraso grave no quadro branco colaborativo." },
          { sender: 'user', text: "Understood. I will immediately turn off high-bandwidth features and project a simplified blueprint overview.", translation: "Entendido. Vou desligar imediatamente os recursos de alta largura de banda e projetar uma visão geral simplificada do projeto." },
          { sender: 'ai', text: "Excellent. Let's make sure we maintain engagement through active chat participation.", translation: "Excelente. Vamos garantir que mantenhamos o engajamento através da participação ativa no chat." },
          { sender: 'user', text: "Agreed. I will split the audience into breakout rooms now to promote focused brainstorming sessions.", translation: "Acordado. Vou dividir o público em salas simultâneas agora para promover sessões de brainstorming focadas." },
          { sender: 'ai', text: "That should help. How long do you plan to keep the breakout rooms active?", translation: "Isso deve ajudar. Por quanto tempo você planeja manter as salas simultâneas ativas?" },
          { sender: 'user', text: "We will allocate exactly fifteen minutes for the rooms, followed by a five-minute team debrief.", translation: "Alocaremos exatamente quinze minutos para as salas, seguidos por uma recapitulação de equipe de cinco minutos." },
          { sender: 'ai', text: "Perfect. The director has just logged on. Can you summarize our progress for him?", translation: "Perfeito. O diretor acabou de entrar na chamada. Você pode resumir nosso progresso para ele?" },
          { sender: 'user', text: "Yes, I will welcome him and deliver a concise, bottom-line-up summary of our roadmap alignment.", translation: "Sim, vou dar as boas-vindas a ele e apresentar um resumo conciso e direto do nosso alinhamento do mapa de desenvolvimento." },
          { sender: 'ai', text: "Great. Your composure under these technical glitches is really protecting our session's momentum.", translation: "Ótimo. Sua compostura sob esses problemas técnicos está realmente protegendo o ritmo da nossa sessão." },
          { sender: 'user', text: "Thank you, Alex. Adapting quickly to technical challenges is a core part of leading global calls.", translation: "Obrigada, Alex. Adaptar-se rapidamente a desafios técnicos é uma parte essencial de liderar chamadas globais." }
        ]
      }
    }
  },
  "7": {
    title: "Prepositions & Travel",
    aiRole: "Agent",
    difficultySettings: {
      Beginner: {
        contextTip: "Practice basic prepositions like 'at', 'in', 'on'.",
        goal: "Complete check-in and weigh your baggage.",
        goalTranslation: "Conclua o check-in e pese sua bagagem.",
        keyVocabulary: [
          { word: "Bag", translation: "Mala / Bagagem" },
          { word: "Scale", translation: "Balança" },
          { word: "Airport", translation: "Aeroporto" },
          { word: "Ticket", translation: "Passagem / Bilhete" }
        ],
        introduction: {
          scenario: "You are checking in your luggage at the ticket counter.",
          scenarioTranslation: "Você está despachando sua bagagem no balcão de passagens."
        },
        phrasalVerbs: [
          { verb: "Check in", meaning: "Registrar-se no aeroporto ou hotel." }
        ],
        dialogue: [
          { sender: 'ai', text: "Good morning. Please place your suitcase on the scale.", translation: "Bom dia. Por favor, coloque sua mala na balança." },
          { sender: 'user', text: "Good morning. My bag is on the scale now. Is the weight okay?", translation: "Bom dia. Minha mala está na balança agora. O peso está ok?" },
          { sender: 'ai', text: "Yes, it is. Your suitcase is under the limit. Here is your boarding pass.", translation: "Sim, está. Sua mala está abaixo do limite. Aqui está seu cartão de embarque." },
          { sender: 'user', text: "Thank you. Is my gate in the main terminal?", translation: "Obrigada. Meu portão fica no terminal principal?" },
          { sender: 'ai', text: "Yes, your gate is in terminal 2. Go to the second floor.", translation: "Sim, seu portão é no terminal 2. Vá para o segundo andar." },
          { sender: 'user', text: "Okay. Is there a restaurant near the boarding gate?", translation: "Ok. Tem algum restaurante perto do portão de embarque?" },
          { sender: 'ai', text: "Yes, there is a café right next to gate 10.", translation: "Sim, há um café bem ao lado do portão 10." },
          { sender: 'user', text: "Perfect. Thank you for your help. Have a good day!", translation: "Perfeito. Obrigada pela ajuda. Tenha um bom dia!" }
        ]
      },
      Intermediate: {
        contextTip: "Use spatial prepositions: 'between', 'next to', 'in front of'.",
        goal: "Find your departure gate and airport facilities.",
        goalTranslation: "Encontre seu portão de embarque e instalações do aeroporto.",
        keyVocabulary: [
          { word: "Between", translation: "Entre (dois pontos)" },
          { word: "Gate", translation: "Portão" },
          { word: "Lounge", translation: "Sala VIP" },
          { word: "Terminal", translation: "Terminal" }
        ],
        introduction: {
          scenario: "You are asking an airport agent for directions to the VIP lounge.",
          scenarioTranslation: "Você está pedindo direções a um agente do aeroporto para a sala VIP."
        },
        phrasalVerbs: [
          { verb: "Go through", meaning: "Passar por (segurança, alfândega)." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello. Do you need help finding your flight connection?", translation: "Olá. Você precisa de ajuda para encontrar a conexão do seu voo?" },
          { sender: 'user', text: "Yes, please. I am looking for the business lounge. Is it past security?", translation: "Sim, por favor. Estou procurando a sala VIP executiva. Fica depois da segurança?" },
          { sender: 'ai', text: "Yes, go through security. The lounge is located between the duty-free shop and gate 12.", translation: "Sim, passe pela segurança. A sala VIP está localizada entre o duty-free e o portão 12." },
          { sender: 'user', text: "Excellent! So it is right next to the pharmacy. Thank you so much.", translation: "Excelente! Então fica bem ao lado da farmácia. Muito obrigada." },
          { sender: 'ai', text: "You're welcome. Also, your flight is delayed by thirty minutes. It is now boarding at 3 PM.", translation: "De nada. Além disso, seu voo está atrasado em trinta minutos. O embarque agora é às 15h." },
          { sender: 'user', text: "Oh, I see. Is there an information board in front of the lounge entrance?", translation: "Ah, entendi. Tem um painel de informações em frente à entrada da sala VIP?" },
          { sender: 'ai', text: "Yes, there is a large digital screen right in front of the lounge reception desk.", translation: "Sim, há uma grande tela digital bem em frente ao balcão de recepção da sala VIP." },
          { sender: 'user', text: "Great. I will sit at the lounge and wait for the boarding announcement.", translation: "Ótimo. Vou me sentar na sala VIP e esperar pelo anúncio de embarque." },
          { sender: 'ai', text: "Perfect. Make sure your boarding pass is in your pocket before you leave the counter.", translation: "Perfeito. Certifique-se de que seu cartão de embarque esteja no bolso antes de sair do balcão." },
          { sender: 'user', text: "Yes, it is safe inside my passport holder. Thanks again for your guidance.", translation: "Sim, está seguro dentro do meu porta-passaporte. Obrigada novamente por sua orientação." }
        ]
      },
      Advanced: {
        contextTip: "Describe precise spatial locations and customs procedures.",
        goal: "Resolve a critical luggage routing issue with customs.",
        goalTranslation: "Resolva um problema crítico de roteamento de bagagem com a alfândega.",
        keyVocabulary: [
          { word: "Identification", translation: "Identificação" },
          { word: "Behind", translation: "Atrás de" },
          { word: "Customs", translation: "Alfândega" },
          { word: "Discrepancy", translation: "Discrepância" }
        ],
        introduction: {
          scenario: "You are negotiating with a customs officer regarding an unrouted briefcase containing corporate files.",
          scenarioTranslation: "Você está negociando com um oficial de alfândega sobre uma pasta não roteada contendo arquivos corporativos."
        },
        phrasalVerbs: [
          { verb: "Hold up", meaning: "Atrasar ou reter algo/alguém." }
        ],
        dialogue: [
          { sender: 'ai', text: "Ma'am, we located a locked briefcase behind the screening area. We need proof of identification.", translation: "Senhora, localizamos uma pasta trancada atrás da área de triagem. Precisamos de comprovante de identificação." },
          { sender: 'user', text: "Here is my passport. The corporate documents are stored in the compartment behind the laptop.", translation: "Aqui está meu passaporte. Os documentos corporativos estão guardados no compartimento atrás do notebook." },
          { sender: 'ai', text: "Thank you. Any electronic assets must be declared before clearing customs.", translation: "Obrigado. Quaisquer ativos eletrônicos devem ser declarados antes de passar pela alfândega." },
          { sender: 'user', text: "I understand. I will fill out the declaration form right at the desk to prevent any hold up.", translation: "Eu entendo. Vou preencher o formulário de declaração bem ali no balcão para evitar qualquer atraso." },
          { sender: 'ai', text: "Perfect. We also noticed an unrecognized document holder under the side pocket.", translation: "Perfeito. Também notamos um porta-documentos não reconhecido sob o bolso lateral." },
          { sender: 'user', text: "Ah! That is my company's registration dossier. It must remain secure at all times.", translation: "Ah! Esse é o dossiê de registro da minha empresa. Ele deve permanecer seguro em todos os momentos." },
          { sender: 'ai', text: "Understood. Once you sign the identification form, you can collect the briefcase.", translation: "Entendido. Assim que você assinar o formulário de identificação, poderá retirar a pasta." },
          { sender: 'user', text: "Certainly. I will complete the form immediately, retrieve the assets, and proceed to the gate.", translation: "Certamente. Vou preencher o formulário imediatamente, recuperar os bens e prosseguir para o portão." },
          { sender: 'ai', text: "Great. The VIP lounge is on the third level if you need a quiet space to work before boarding.", translation: "Ótimo. A sala VIP fica no terceiro nível caso você precise de um espaço tranquilo para trabalhar antes de embarcar." },
          { sender: 'user', text: "Thank you. I will head to the third level right after clearing security to review my presentations.", translation: "Obrigada. Vou para o terceiro nível logo após passar pela segurança para revisar minhas apresentações." }
        ]
      }
    }
  },
  "8": {
    title: "DO / CAN / TO",
    aiRole: "Agent",
    difficultySettings: {
      Beginner: {
        contextTip: "Respond clearly with short, positive answers: 'Yes, I do'.",
        goal: "Pass through passport control.",
        goalTranslation: "Passe pelo controle de passaportes.",
        keyVocabulary: [
          { word: "Yes", translation: "Sim" },
          { word: "Passport", translation: "Passaporte" },
          { word: "Do", translation: "Verbo auxiliar" },
          { word: "Visit", translation: "Visita / Visitar" }
        ],
        introduction: {
          scenario: "An immigration officer is checking your passport at entry control.",
          scenarioTranslation: "Um oficial de imigração está verificando seu passaporte no controle de entrada."
        },
        phrasalVerbs: [
          { verb: "Hand over", meaning: "Entregar algo em mãos." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello. Do you have a business visa for this trip?", translation: "Olá. Você tem visto de negócios para esta viagem?" },
          { sender: 'user', text: "Yes, I do. I have a business visa. Here is my passport.", translation: "Sim, eu tenho. Tenho um visto de negócios. Aqui está meu passaporte." },
          { sender: 'ai', text: "Excellent. Do you intend to stay in the country for more than ten days?", translation: "Excelente. Você pretende ficar no país por mais de dez dias?" },
          { sender: 'user', text: "No, I do not. I want to visit our office for five days.", translation: "Não, não pretendo. Quero visitar nosso escritório por cinco dias." },
          { sender: 'ai', text: "Perfect. Do you have a hotel reservation for your stay?", translation: "Perfeito. Você tem uma reserva de hotel para a sua estadia?" },
          { sender: 'user', text: "Yes, I do. The hotel reservation is printed in this folder.", translation: "Sim, tenho. A reserva do hotel está impressa nesta pasta." },
          { sender: 'ai', text: "Great. Welcome to New York. Have a great business trip!", translation: "Ótimo. Bem-vinda a Nova York. Tenha uma excelente viagem de negócios!" },
          { sender: 'user', text: "Thank you very much. I am very happy to be here.", translation: "Muito obrigada. Estou muito feliz por estar aqui." }
        ]
      },
      Intermediate: {
        contextTip: "Use 'Can I have' or 'Can you help me' to make polite requests.",
        goal: "Request flight assistance from the crew.",
        goalTranslation: "Solicite assistência de voo para a tripulação.",
        keyVocabulary: [
          { word: "Can", translation: "Poder (permissão)" },
          { word: "Water", translation: "Água" },
          { word: "Help", translation: "Ajudar" },
          { word: "Request", translation: "Solicitação" }
        ],
        introduction: {
          scenario: "You are on board, asking the flight crew for technical assistance with a device.",
          scenarioTranslation: "Você está a bordo, pedindo assistência técnica à tripulação de voo com um dispositivo."
        },
        phrasalVerbs: [
          { verb: "Help with", meaning: "Ajudar com alguma tarefa." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello! How can I assist you during our flight today?", translation: "Olá! Como posso ajudar você durante o nosso voo hoje?" },
          { sender: 'user', text: "Can I have some mineral water and a blanket, please?", translation: "Poderia me dar um pouco de água mineral e um cobertor, por favor?" },
          { sender: 'ai', text: "Of course. Can I help you with your overhead baggage as well?", translation: "Claro. Posso te ajudar com sua bagagem de mão também?" },
          { sender: 'user', text: "Yes, please. Can you help me to place this heavy suitcase in the compartment?", translation: "Sim, por favor. Pode me ajudar a colocar esta mala pesada no compartimento?" },
          { sender: 'ai', text: "Certainly. I can help with that. Do you need any assistance when we land?", translation: "Certamente. Posso ajudar com isso. Você precisa de alguma ajuda quando aterrissarmos?" },
          { sender: 'user', text: "Yes. Can you tell me where I can get a taxi to the downtown area?", translation: "Sim. Você pode me dizer onde posso pegar um táxi para a área central?" },
          { sender: 'ai', text: "You can find the official taxi stand right outside the arrivals terminal exit.", translation: "Você pode encontrar o ponto de táxi oficial logo na saída do terminal de desembarque." },
          { sender: 'user', text: "Great. Can I pay for the taxi with a credit card?", translation: "Ótimo. Posso pagar o táxi com cartão de crédito?" },
          { sender: 'ai', text: "Yes, most taxis accept cards, but it is always good to have some cash on you.", translation: "Sim, a maioria dos táxis aceita cartões, mas é sempre bom ter algum dinheiro com você." },
          { sender: 'user', text: "Perfect. I will withdraw some local currency at the airport ATM. Thank you!", translation: "Perfeito. Vou sacar um pouco de moeda local no caixa eletrônico do aeroporto. Obrigada!" }
        ]
      },
      Advanced: {
        contextTip: "Leverage advanced conditional expressions for polite negotiation.",
        goal: "Negotiate a last-minute flight reschedule with an airline agent.",
        goalTranslation: "Negocie uma remarcação de voo de última hora com um agente da companhia aérea.",
        keyVocabulary: [
          { word: "Could", translation: "Poderia" },
          { word: "If", translation: "Se" },
          { word: "Alternative", translation: "Alternativa" },
          { word: "Upgrade", translation: "Melhoria de classe" }
        ],
        introduction: {
          scenario: "You are trying to change a fully booked flight due to a business urgency.",
          scenarioTranslation: "Você está tentando alterar um voo totalmente lotado devido a uma urgência de negócios."
        },
        phrasalVerbs: [
          { verb: "Work out", meaning: "Resolver ou encontrar uma solução viável." }
        ],
        dialogue: [
          { sender: 'ai', text: "I'm sorry, Monica. The afternoon flight is fully booked. There are no available seats.", translation: "Sinto muito, Monica. O voo da tarde está totalmente lotado. Não há assentos disponíveis." },
          { sender: 'user', text: "Could it be possible to check if any executive class passengers have failed to check in?", translation: "Seria possível verificar se algum passageiro da classe executiva não realizou o check-in?" },
          { sender: 'ai', text: "If a seat opens up due to a no-show, we could assign it to you. Would you agree to pay the upgrade fee?", translation: "Se um assento abrir devido a um não comparecimento, poderíamos atribuí-lo a você. Você concordaria em pagar a taxa de upgrade?" },
          { sender: 'user', text: "I would be happy to do so. I really need to catch this flight to attend a critical kickoff.", translation: "Ficaria feliz em fazê-lo. Eu realmente preciso pegar este voo para participar de um alinhamento crítico." },
          { sender: 'ai', text: "Let me check the standby list. We do have one business class passenger who hasn't checked in yet.", translation: "Deixe-me verificar a lista de espera. Temos um passageiro da classe executiva que ainda não fez o check-in." },
          { sender: 'user', text: "That sounds promising. If they call off their trip, could you prioritize my booking?", translation: "Isso parece promissor. Se eles cancelarem a viagem, você poderia priorizar minha reserva?" },
          { sender: 'ai', text: "Yes, I can do that since you hold a corporate partner account. Please wait at gate 15.", translation: "Sim, posso fazer isso já que você tem uma conta de parceiro corporativo. Por favor, aguarde no portão 15." },
          { sender: 'user', text: "Excellent. If the upgrade works out, I will be extremely grateful for your help.", translation: "Excelente. Se o upgrade der certo, ficarei extremamente grata por sua ajuda." },
          { sender: 'ai', text: "It is our priority to support our executive travelers. I will let you know within ten minutes.", translation: "É nossa prioridade apoiar nossos viajantes executivos. Eu te aviso dentro de dez minutos." },
          { sender: 'user', text: "Perfect. I will remain close to the gate desk and wait for your confirmation.", translation: "Perfeito. Vou permanecer perto do balcão do portão e aguardar sua confirmação." }
        ]
      }
    }
  },
  "9": {
    title: "Present To Be",
    aiRole: "Social Contact",
    difficultySettings: {
      Beginner: {
        contextTip: "Use 'I am', 'He is', and 'She is' correctly.",
        goal: "Introduce your origin and travel party.",
        goalTranslation: "Apresente sua origem e acompanhantes de viagem.",
        keyVocabulary: [
          { word: "Brazil", translation: "Brasil" },
          { word: "Wife", translation: "Esposa" },
          { word: "Am", translation: "Sou / Estou" },
          { word: "Is", translation: "É / Está" }
        ],
        introduction: {
          scenario: "You are talking to a friendly driver outside the airport terminal.",
          scenarioTranslation: "Você está conversando com um motorista amigável do lado de fora do terminal do aeroporto."
        },
        phrasalVerbs: [
          { verb: "Be from", meaning: "Ser de alguma cidade/país." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello! Welcome to London. Are you here for a holiday?", translation: "Olá! Bem-vinda a Londres. Você está aqui para passar férias?" },
          { sender: 'user', text: "Hello! No, I am not here for a holiday. I am here for work.", translation: "Olá! Não, não estou aqui de férias. Estou aqui a trabalho." },
          { sender: 'ai', text: "Very nice. Is your colleague with you today?", translation: "Muito bom. O seu colega está com você hoje?" },
          { sender: 'user', text: "No, he is not. He is still in Brazil. I am alone today.", translation: "Não, ele não está. Ele ainda está no Brasil. Estou sozinha hoje." },
          { sender: 'ai', text: "I see. Is the hotel close to the central station?", translation: "Entendo. O hotel é perto da estação central?" },
          { sender: 'user', text: "Yes, it is very close. It is only five minutes away.", translation: "Sim, é muito perto. Fica a apenas cinco minutos de distância." },
          { sender: 'ai', text: "Excellent. Are you tired after the long flight?", translation: "Excelente. Você está cansada depois do voo longo?" },
          { sender: 'user', text: "No, I am not. I am very excited to see the London office tomorrow.", translation: "Não, não estou. Estou muito animada para conhecer o escritório de Londres amanhã." }
        ]
      },
      Intermediate: {
        contextTip: "Use plural forms correctly: 'We are', 'They are'.",
        goal: "Describe your team's current status and location.",
        goalTranslation: "Descreva o status atual e a localização da sua equipe.",
        keyVocabulary: [
          { word: "Vacation", translation: "Férias" },
          { word: "Excited", translation: "Animado" },
          { word: "Are", translation: "São / Estão" },
          { word: "Ready", translation: "Pronto" }
        ],
        introduction: {
          scenario: "You are updating a client on the exact location of your visiting delegation.",
          scenarioTranslation: "Você está atualizando um cliente sobre a localização exata da sua delegação visitante."
        },
        phrasalVerbs: [
          { verb: "Be at", meaning: "Estar localizado em algum lugar." }
        ],
        dialogue: [
          { sender: 'ai', text: "Monica, are your team members ready for the factory tour?", translation: "Monica, os membros da sua equipe estão prontos para a visita à fábrica?" },
          { sender: 'user', text: "Yes, they are. We are all excited about this visit. Everyone is ready.", translation: "Sim, eles estão. Estamos todos animados com esta visita. Todos estão prontos." },
          { sender: 'ai', text: "Excellent. Are they at the lobby or outside in the parking area?", translation: "Excelente. Eles estão no saguão ou lá fora na área de estacionamento?" },
          { sender: 'user', text: "They are in front of the lobby entrance. We are ready to board the bus.", translation: "Eles estão em frente à entrada do saguão. Estamos prontos para embarcar no ônibus." },
          { sender: 'ai', text: "Great. By the way, is the technical director on this tour as well?", translation: "Ótimo. A propósito, o diretor técnico também está nesta excursão?" },
          { sender: 'user', text: "Yes, he is. He is currently talking to the local coordinator near the gate.", translation: "Sim, está. Ele está conversando no momento com o coordenador local perto do portão." },
          { sender: 'ai', text: "Wonderful. Are all the safety documents signed and completed?", translation: "Maravilhoso. Todos os documentos de segurança estão assinados e concluídos?" },
          { sender: 'user', text: "Yes, they are. The forms are in our shared workspace folder already.", translation: "Sim, estão. Os formulários já estão em nossa pasta compartilhada do espaço de trabalho." },
          { sender: 'ai', text: "Perfect. You and your team are exceptionally organized. Have a great tour!", translation: "Perfeito. Você e sua equipe são excepcionalmente organizados. Tenham uma ótima visita!" },
          { sender: 'user', text: "Thank you, Alex. We are very proud of our team's operational discipline.", translation: "Obrigada, Alex. Temos muito orgulho da disciplina operacional da nossa equipe." }
        ]
      },
      Advanced: {
        contextTip: "Express states of capability and readiness professionally.",
        goal: "Convince a potential client of your team's expertise and readiness.",
        goalTranslation: "Convença um cliente potencial sobre a especialidade e prontidão da sua equipe.",
        keyVocabulary: [
          { word: "Ready", translation: "Pronto" },
          { word: "Expert", translation: "Especialista" },
          { word: "Capable", translation: "Capaz" },
          { word: "Outstanding", translation: "Excepcional" }
        ],
        introduction: {
          scenario: "You are pitching your team's deployment capabilities to a skeptical buyer.",
          scenarioTranslation: "Você está vendendo as capacidades de implantação da sua equipe para um comprador cético."
        },
        phrasalVerbs: [
          { verb: "Be up to", meaning: "Estar à altura de um desafio." }
        ],
        dialogue: [
          { sender: 'ai', text: "We need an integration partner that is exceptionally fast. Are your engineers up to the task?", translation: "Precisamos de um parceiro de integração que seja excepcionalmente rápido. Seus engenheiros estão à altura da tarefa?" },
          { sender: 'user', text: "Absolutely. We are fully prepared. Our engineers are experts in handling high-volume supply chains.", translation: "Absolutamente. Estamos totalmente preparados. Nossos engenheiros são especialistas em lidar com cadeias de suprimentos de alto volume." },
          { sender: 'ai', text: "This rollout is critical. Is it a realistic claim that you are ready for a Q3 release?", translation: "Este lançamento é crítico. É uma alegação realista de que vocês estão prontos para um lançamento no terceiro trimestre?" },
          { sender: 'user', text: "Yes, it is. We are highly capable, and our deployment record is outstanding in this sector.", translation: "Sim, é. Somos altamente capazes, e nosso histórico de implantação é excelente neste setor." },
          { sender: 'ai', text: "We've had issues in the past with vendors who were not transparent about supply bottlenecks. How is your team different?", translation: "Tivemos problemas no passado com fornecedores que não eram transparentes sobre gargalos de fornecimento. Como sua equipe é diferente?" },
          { sender: 'user', text: "We are radically candid about all operations. Our real-time validation dashboard is open to all partners.", translation: "Somos radicalmente francos sobre todas as operações. Nosso painel de validação em tempo real está aberto a todos os parceiros." },
          { sender: 'ai', text: "That transparency is exactly what we are looking for. Are your systems fully compatible with our database?", translation: "Essa transparência é exatamente o que estamos procurando. Seus sistemas são totalmente compatíveis com nosso banco de dados?" },
          { sender: 'user', text: "Yes, they are. Our backend integration is extremely flexible and already operational in similar environments.", translation: "Sim, são. Nossa integração de backend é extremamente flexível e já está operacional em ambientes semelhantes." },
          { sender: 'ai', text: "Outstanding. I am convinced that your organization is the right partner for this global expansion.", translation: "Excelente. Estou convencido de que sua organização é o parceiro certo para esta expansão global." },
          { sender: 'user', text: "Thank you. We are thrilled to partner with you and fully committed to making this launch a resounding success.", translation: "Obrigada. Estamos entusiasmados em fazer parceria com você e totalmente comprometidos em tornar este lançamento um sucesso retumbante." }
        ]
      }
    }
  },
  "10": {
    title: "Simple Present x Present Continuous",
    aiRole: "Coordinator",
    difficultySettings: {
      Beginner: {
        contextTip: "Focus on the frequency 'every day' vs what is happening 'now' (working).",
        goal: "Introduce your work routine and describe what you are working on right now.",
        goalTranslation: "Apresente sua rotina de trabalho e descreva no que está trabalhando agora mesmo.",
        keyVocabulary: [
          { word: "Usually", translation: "Geralmente" },
          { word: "Every day", translation: "Todos os dias" },
          { word: "Now", translation: "Agora" },
          { word: "Right now", translation: "Agora mesmo" }
        ],
        introduction: {
          scenario: "A coworker is checking your work status and daily routine in a quick stand-up.",
          scenarioTranslation: "Um colega de trabalho está verificando o status do seu trabalho e rotina diária em um stand-up rápido."
        },
        phrasalVerbs: [
          { verb: "Work on", meaning: "Trabalhar em algo/projeto." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hi Monica! I usually start my day with a cup of coffee. What do you usually do in the morning?", translation: "Oi Monica! Eu geralmente começo meu dia com uma xícara de café. O que você geralmente faz de manhã?" },
          { sender: 'user', text: "Hi! I usually check my email first. I do this every day before I start my main tasks.", translation: "Oi! Eu geralmente checo meu e-mail primeiro. Faço isso todos os dias antes de começar minhas tarefas principais." },
          { sender: 'ai', text: "That is a good routine. Are you working on the monthly report right now?", translation: "Essa é uma boa rotina. Você está trabalhando no relatório mensal agora mesmo?" },
          { sender: 'user', text: "No, I am not. Right now, I am testing the new app features on my screen.", translation: "Não, não estou. Agora mesmo, estou testando os novos recursos do aplicativo na minha tela." },
          { sender: 'ai', text: "Oh, I see. Does the development team usually help you with the testing?", translation: "Ah, entendo. A equipe de desenvolvimento geralmente te ajuda com os testes?" },
          { sender: 'user', text: "Yes, they do. They usually help me, but today they are attending a global training workshop.", translation: "Sim, eles ajudam. Geralmente eles me ajudam, mas hoje estão participando de um workshop global de treinamento." },
          { sender: 'ai', text: "Understood. I am working on the slides now. Can you check them later today?", translation: "Entendido. Estou trabalhando nos slides agora. Você pode verificá-los mais tarde hoje?" },
          { sender: 'user', text: "Yes, I can. I always check my inbox before I finish my work day.", translation: "Sim, posso. Eu sempre verifico minha caixa de entrada antes de terminar meu dia de trabalho." }
        ]
      },
      Intermediate: {
        contextTip: "Contrast routine ('I work') with temporary states ('I am working this week').",
        goal: "Contrast your standard monthly duties with your focus this week.",
        goalTranslation: "Contraste seus deveres mensais padrão com o seu foco desta semana.",
        keyVocabulary: [
          { word: "Usually", translation: "Geralmente" },
          { word: "At the moment", translation: "No momento" },
          { word: "Today", translation: "Hoje" },
          { word: "This week", translation: "Esta semana" }
        ],
        introduction: {
          scenario: "The Project Manager is comparing standard monthly milestones with current week priorities.",
          scenarioTranslation: "O Gerente de Projetos está comparando os marcos mensais padrão com as prioridades da semana atual."
        },
        phrasalVerbs: [
          { verb: "Focus on", meaning: "Focar em / Concentrar-se em." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hi Monica, we usually review our goals monthly. How do you usually prioritize your weekly deliverables?", translation: "Oi Monica, nós geralmente revisamos nossas metas mensalmente. Como você geralmente prioriza suas entregas semanais?" },
          { sender: 'user', text: "Hi! I usually write down my action items on Monday. I do this every week to stay organized.", translation: "Oi! Eu geralmente anoto meus itens de ação na segunda-feira. Faço isso toda semana para me manter organizada." },
          { sender: 'ai', text: "Excellent habit. What specific project are you focusing on this week?", translation: "Excelente hábito. Em qual projeto específico você está focando esta semana?" },
          { sender: 'user', text: "This week, I am focusing on the client onboarding design. We are testing the dynamic layout today.", translation: "Esta semana, estou focando no design de integração do cliente. Estamos testando o layout dinâmico hoje." },
          { sender: 'ai', text: "That's great. Does the client usually join the review sessions at this stage?", translation: "Que ótimo. O cliente geralmente participa das sessões de revisão nesta fase?" },
          { sender: 'user', text: "Yes, they usually participate in our weekly calls, but today they are resolving a billing issue.", translation: "Sim, eles geralmente participam das nossas chamadas semanais, mas hoje estão resolvendo um problema de faturamento." },
          { sender: 'ai', text: "I see. I am writing the project summary at the moment. Can I add your updates to the file?", translation: "Entendo. Estou escrevendo o resumo do projeto no momento. Posso adicionar suas atualizações ao arquivo?" },
          { sender: 'user', text: "Yes, please. I am sending you the revised dashboard timeline right now.", translation: "Sim, por favor. Estou te enviando o cronograma revisado do painel agora mesmo." },
          { sender: 'ai', text: "Thank you. We always appreciate your prompt updates. Is the design team working in the office today?", translation: "Obrigado. Nós sempre apreciamos suas atualizações rápidas. A equipe de design está trabalhando no escritório hoje?" },
          { sender: 'user', text: "No, they are working from home this week because the main office is undergoing structural maintenance.", translation: "Não, eles estão trabalhando de casa esta semana porque o escritório principal está passando por manutenção estrutural." }
        ]
      },
      Advanced: {
        contextTip: "Articulate permanent business strategies (Simple Present) vs fluid operational pivots (Present Continuous).",
        goal: "Differentiate strategic yearly planning from current tactical crisis management.",
        goalTranslation: "Diferencie o planejamento anual estratégico do gerenciamento de crise tático atual.",
        keyVocabulary: [
          { word: "Always", translation: "Sempre" },
          { word: "Now", translation: "Agora" },
          { word: "At the moment", translation: "No momento" },
          { word: "This week", translation: "Esta semana" }
        ],
        introduction: {
          scenario: "You are explaining a sudden strategic pivot to a senior VP during a global market shift.",
          scenarioTranslation: "Você está explicando uma mudança estratégica repentina para um vice-presidente sênior durante uma mudança no mercado global."
        },
        phrasalVerbs: [
          { verb: "Pivot to", meaning: "Mudar a direção estratégica ou operacional." }
        ],
        dialogue: [
          { sender: 'ai', text: "Monica, our company always prioritizes long-term stable partnerships. Why are we pivoting to a high-speed deployment model this week?", translation: "Monica, nossa empresa sempre prioriza parcerias estáveis de longo prazo. Por que estamos mudando para um modelo de implantação rápida esta semana?" },
          { sender: 'user', text: "We always value stability, but market trends are shifting rapidly, and our core competitors are releasing updates now.", translation: "Nós sempre valorizamos a estabilidade, mas as tendências do mercado estão mudando rapidamente, e nossos principais concorrentes estão lançando atualizações agora." },
          { sender: 'ai', text: "I understand the competitive threat. However, is our development team capable of handling this temporary stress?", translation: "Eu entendo a ameaça competitiva. No entanto, nossa equipe de desenvolvimento é capaz de lidar com esse estresse temporário?" },
          { sender: 'user', text: "Yes, they are exceptionally capable. Although they usually work under standard agile cycles, this week they are working double shifts.", translation: "Sim, eles são excepcionalmente capazes. Embora eles geralmente trabalhem sob ciclos ágeis padrão, esta semana eles estão trabalhando em turnos duplos." },
          { sender: 'ai', text: "That is a severe temporary burden. How are you managing their fatigue at the moment?", translation: "Esse é um fardo temporário severo. Como você está gerenciando a fadiga deles no momento?" },
          { sender: 'user', text: "I am actively monitoring their deliverables and we are allocating extra rest days next week to balance their effort.", translation: "Estou monitorando ativamente suas entregas e estamos alocando dias de descanso extras na próxima semana para equilibrar seu esforço." },
          { sender: 'ai', text: "Good. Executive stakeholders always demand transparency during pivots. Are you keeping them informed today?", translation: "Bom. Os stakeholders executivos sempre exigem transparência durante as mudanças. Você os está mantendo informados hoje?" },
          { sender: 'user', text: "Absolutely. I am sending them real-time validation data, and I am hosting a progress sync call right now.", translation: "Absolutamente. Estou enviando dados de validação em tempo real e realizando uma chamada de sincronização de progresso agora mesmo." },
          { sender: 'ai', text: "Excellent composure. Our partnership always relies on your strong leadership during these high-stakes transitions.", translation: "Excelente compostura. Nossa parceria sempre conta com sua liderança forte durante essas transições críticas." },
          { sender: 'user', text: "Thank you. We are securing our market share today, and I am confident that we are building long-term executive value.", translation: "Obrigada. Estamos garantindo nossa fatia de mercado hoje, e estou confiante de que estamos construindo valor executivo de longo prazo." }
        ]
      }
    }
  },
  "11": {
    title: "Present Perfect x Simple Past",
    aiRole: "Social Contact",
    difficultySettings: {
      Beginner: {
        contextTip: "Differentiate general experience ('I have traveled') from a specific point in time ('I traveled last year').",
        goal: "Describe your past travel destinations and overall travel experience.",
        goalTranslation: "Descreva seus destinos de viagem passados e sua experiência de viagem geral.",
        keyVocabulary: [
          { word: "Ever", translation: "Alguma vez / Já" },
          { word: "Never", translation: "Nunca" },
          { word: "Yesterday", translation: "Ontem" },
          { word: "Last year", translation: "Ano passado" }
        ],
        introduction: {
          scenario: "A friendly supplier is asking about your past business travel experience.",
          scenarioTranslation: "Um fornecedor amigável está perguntando sobre sua experiência de viagens de negócios passadas."
        },
        phrasalVerbs: [
          { verb: "Go to", meaning: "Ir para / Visitar." }
        ],
        dialogue: [
          { sender: 'ai', text: "Welcome to our London branch, Monica! Have you ever traveled abroad for business before?", translation: "Bem-vinda à nossa filial de Londres, Monica! Você já viajou para o exterior a negócios antes?" },
          { sender: 'user', text: "Hello! Yes, I have already traveled abroad three times, but I have never visited this branch.", translation: "Olá! Sim, eu já viajei para o exterior três vezes, mas nunca visitei esta filial." },
          { sender: 'ai', text: "That is great. When did you visit Europe for the first time?", translation: "Que ótimo. Quando você visitou a Europa pela primeira vez?" },
          { sender: 'user', text: "I visited Europe last year. I spent two weeks in Paris for a global conference.", translation: "Eu visitei a Europa no ano passado. Passei duas semanas em Paris para uma conferência global." },
          { sender: 'ai', text: "Paris is beautiful! Did you see the Eiffel Tower while you were there?", translation: "Paris é linda! Você viu a Torre Eiffel enquanto esteve lá?" },
          { sender: 'user', text: "Yes, I did. I saw it on my last day. But yesterday, I arrived here, so I am focusing on London now.", translation: "Sim, eu vi. Vi no meu último dia. Mas ontem, cheguei aqui, então estou focando em Londres agora." },
          { sender: 'ai', text: "Perfect. Have you tried any traditional British food since you arrived?", translation: "Perfeito. Você experimentou alguma comida tradicional britânica desde que chegou?" },
          { sender: 'user', text: "No, I haven't tried it yet. I ate a simple sandwich at the hotel yesterday evening.", translation: "Não, ainda não experimentei. Comi um sanduíche simples no hotel ontem à noite." }
        ]
      },
      Intermediate: {
        contextTip: "Use Present Perfect for recent accomplishments without a specific time, and Simple Past for actions completed at a specific point.",
        goal: "Compare past project accomplishments with indefinite overall professional achievements.",
        goalTranslation: "Compare realizações de projetos passados com conquistas profissionais gerais de prazo indefinido.",
        keyVocabulary: [
          { word: "Already", translation: "Já" },
          { word: "Yet", translation: "Ainda" },
          { word: "Recently", translation: "Recentemente" },
          { word: "Ago", translation: "Atrás" }
        ],
        introduction: {
          scenario: "The operations director is reviewing recent deliverables and past project history.",
          scenarioTranslation: "O diretor de operações está revisando entregas recentes e o histórico de projetos passados."
        },
        phrasalVerbs: [
          { verb: "Sign off", meaning: "Aprovar formalmente / Assinar a autorização." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hi Monica, we need a status update. Have you finalized the dynamic database integration yet?", translation: "Oi Monica, precisamos de uma atualização de status. Você já finalizou a integração dinâmica do banco de dados?" },
          { sender: 'user', text: "Yes, I have already finalized the core database structure. I completed the final staging test two days ago.", translation: "Sim, eu já finalizei a estrutura principal do banco de dados. Concluí o teste de staging final dois dias atrás." },
          { sender: 'ai', text: "Excellent news. Did the QA lead sign off on the security protocols yesterday?", translation: "Excelente notícia. O líder de QA aprovou os protocolos de segurança ontem?" },
          { sender: 'user', text: "Yes, he did. He reviewed the logs yesterday afternoon and signed off on everything.", translation: "Sim, ele aprovou. Ele revisou os logs ontem à tarde e assinou a autorização de tudo." },
          { sender: 'ai', text: "Perfect. Have you launched any similar global rollouts recently?", translation: "Perfeito. Vocês lançaram algum lançamento global semelhante recentemente?" },
          { sender: 'user', text: "Yes, we have. Recently, we have deployed three major updates for our Latin American partners.", translation: "Sim, lançamos. Recentemente, implantamos três grandes atualizações para nossos parceiros da América Latina." },
          { sender: 'ai', text: "That is impressive. When did you launch the first Latin American update?", translation: "Isso é impressionante. Quando vocês lançaram a primeira atualização na América Latina?" },
          { sender: 'user', text: "We launched the first update in 2023. It resolved all legacy sync errors.", translation: "Nós lançamos a primeira atualização em 2023. Ela resolveu todos os erros de sincronização legados." },
          { sender: 'ai', text: "Outstanding. I have recently updated the stakeholder roadmap. Let's make sure we document these milestones.", translation: "Excelente. Eu atualizei recentemente o roadmap de stakeholders. Vamos garantir que documentemos esses marcos." },
          { sender: 'user', text: "Great. I have already drafted the documentation, and I will share it with the team in our next sync.", translation: "Ótimo. Eu já rascunhei a documentação e a compartilharei com a equipe em nossa próxima sincronização." }
        ]
      },
      Advanced: {
        contextTip: "Formulate precise arguments contrasting past concrete milestones (Simple Past) with broader historical capabilities (Present Perfect).",
        goal: "Justify strategic tech stack pivots by presenting past performance data and general integration experiences.",
        goalTranslation: "Justifique mudanças estratégicas de stack tecnológica apresentando dados de desempenho passados e experiências de integração gerais.",
        keyVocabulary: [
          { word: "Ever", translation: "Alguma vez / Já" },
          { word: "Never", translation: "Nunca" },
          { word: "Just", translation: "Acabar de" },
          { word: "In 2019", translation: "Em 2019" }
        ],
        introduction: {
          scenario: "A high-level client VP is questioning your historical stability and recent technological pivots.",
          scenarioTranslation: "O vice-presidente de um cliente de alto nível está questionando sua estabilidade histórica e mudanças tecnológicas recentes."
        },
        phrasalVerbs: [
          { verb: "Look back", meaning: "Olhar para trás / Analisar o histórico passado." }
        ],
        dialogue: [
          { sender: 'ai', text: "Monica, your team has just proposed a massive architecture pivot. Have you ever handled such a high-risk transition?", translation: "Monica, sua equipe acabou de propor uma mudança massiva de arquitetura. Você já lidou com uma transição de alto risco como essa?" },
          { sender: 'user', text: "Yes, we have. We have successfully completed five global database migrations without a single minute of downtime.", translation: "Sim, já lidamos. Concluímos com sucesso cinco migrações globais de banco de dados sem um único minuto de inatividade." },
          { sender: 'ai', text: "Those are impressive general numbers. But did you experience any data losses when you migrated the legacy system in 2019?", translation: "Esses são números gerais impressionantes. Mas vocês sofreram alguma perda de dados quando migraram o sistema legado em 2019?" },
          { sender: 'user', text: "No, we didn't. When we undertook that migration in 2019, we maintained a 100% data integrity record throughout.", translation: "Não, não sofremos. Quando realizamos aquela migração em 2019, mantivemos um registro de 100% de integridade de dados do início ao fim." },
          { sender: 'ai', text: "That sounds reassuring. However, our board has never approved a system change of this scale so quickly.", translation: "Isso soa reconfortante. No entanto, nosso conselho nunca aprovou uma mudança de sistema desta escala tão rapidamente." },
          { sender: 'user', text: "I understand the caution, but we have just tested our new automated validation system and the results are outstanding.", translation: "Eu entendo a cautela, mas acabamos de testar nosso novo sistema de validação automatizado e os resultados são excelentes." },
          { sender: 'ai', text: "When did you execute these automated tests, and who verified the output?", translation: "Quando vocês executaram esses testes automatizados e quem verificou os resultados?" },
          { sender: 'user', text: "We executed the validation tests last week, and our principal engineer verified the results yesterday morning.", translation: "Nós executamos os testes de validação na semana passada, e nosso engenheiro principal verificou os resultados ontem de manhã." },
          { sender: 'ai', text: "If we look back, your firm has always honored its SLAs. I will present your performance data to the board today.", translation: "Se olharmos para trás, sua empresa sempre honrou seus SLAs. Vou apresentar os seus dados de desempenho ao conselho hoje." },
          { sender: 'user', text: "Thank you. We have built our reputation on high-stakes execution, and we are ready to guarantee this rollout.", translation: "Obrigada. Construímos nossa reputação em execuções sob alta pressão e estamos prontos para garantir este lançamento." }
        ]
      }
    }
  }
};

export default function ConversationalSimulator({ params }: { params: Promise<{ id: string }> }) {
  const { id: lessonId } = React.use(params);
  const searchParams = useSearchParams();
  const difficulty = (searchParams.get('difficulty') || 'Beginner') as 'Beginner' | 'Intermediate' | 'Advanced';
  
  const lesson = lessonsData[lessonId] || lessonsData["1"];
  const diffSettings = lesson.difficultySettings[difficulty] || lesson.difficultySettings['Beginner'];

  // Resolve level-specific simulation details dynamically
  const scenario = diffSettings.introduction?.scenario || lesson.introduction?.scenario || "";
  const scenarioTranslation = diffSettings.introduction?.scenarioTranslation || lesson.introduction?.scenarioTranslation || "";
  const phrasalVerbs = diffSettings.phrasalVerbs || lesson.phrasalVerbs || [];
  const dialogue = diffSettings.dialogue || lesson.dialogue || [];

  const [visibleStep, setVisibleStep] = useState(1);
  const [showBriefing, setShowBriefing] = useState(true);
  const [briefingTranslations, setBriefingTranslations] = useState<Record<string, boolean>>({});
  const [vocabTranslations, setVocabTranslations] = useState<Record<number, boolean>>({});
  const [showTranslations, setShowTranslations] = useState<Record<number, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleStep]);

  const handleNext = () => {
    if (visibleStep < dialogue.length) {
      setVisibleStep(prev => prev + 1);
    }
  };

  const toggleTranslation = (index: number) => {
    setShowTranslations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isFinished = visibleStep >= dialogue.length;

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
                      "{scenario}"
                    </p>
                    <AnimatePresence>
                      {briefingTranslations.scenario && (
                        <motion.p 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-[#D97706] text-sm mt-2 italic border-t border-[#D97706]/20 pt-2"
                        >
                          "{scenarioTranslation}"
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Primary Goal ({difficulty})</h4>
                    <span className="text-[10px] text-gray-500 italic">Click text to translate</span>
                  </div>
                  <div 
                    onClick={() => setBriefingTranslations(prev => ({ ...prev, goal: !prev.goal }))}
                    className="cursor-pointer group"
                  >
                    <p className="text-gray-300 leading-relaxed transition-colors group-hover:text-white">
                      {diffSettings.goal}
                    </p>
                    <AnimatePresence>
                      {briefingTranslations.goal && (
                        <motion.p 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-[#D97706] text-sm mt-2 italic border-t border-[#D97706]/20 pt-2"
                        >
                          {diffSettings.goalTranslation}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Key Vocabulary</h4>
                    <span className="text-[10px] text-gray-500 italic">Click tag to translate</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {diffSettings.keyVocabulary.map((item: { word: string; translation: string }, i: number) => (
                      <span 
                        key={i} 
                        onClick={() => setVocabTranslations(prev => ({ ...prev, [i]: !prev[i] }))}
                        className="px-3 py-1.5 bg-[#1E293B] border border-[#334155] rounded-lg text-xs text-gray-300 font-medium cursor-pointer hover:border-[#D97706] hover:text-white transition-all select-none flex items-center gap-1.5"
                      >
                        <span>{item.word}</span>
                        {vocabTranslations[i] && (
                          <span className="text-[#D97706] font-normal border-l border-[#334155] pl-1.5">
                            {item.translation}
                          </span>
                        )}
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
              {dialogue.length > 0 ? (
                dialogue.slice(0, visibleStep).map((turn: DialogueTurn, index: number) => (
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
            {!isFinished && dialogue.length > 0 ? (
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
            ) : isFinished && dialogue.length > 0 ? (
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
                {phrasalVerbs.length > 0 ? (
                  phrasalVerbs.map((pv: any, index: number) => (
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
