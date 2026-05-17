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
        keyVocabulary: ["Hi", "Meeting", "Office", "Name"],
        introduction: {
          scenario: "You are entering an online call. A friendly colleague is greeting you.",
          scenarioTranslation: "Você está entrando em uma chamada online. Um colega amigável está te cumprimentando."
        },
        phrasalVerbs: [
          { verb: "Catch up", meaning: "Colocar o papo em dia." }
        ],
        dialogue: [
          { sender: 'ai', text: "Hello! Welcome to the meeting. I am David. What is your name?", translation: "Olá! Bem-vindo à reunião. Eu sou o David. Qual é o seu nome?" },
          { sender: 'user', text: "Hello David! My name is Monica. I am from Brazil, and I live in São Paulo.", translation: "Olá David! Meu nome é Monica. Eu sou do Brasil, e moro em São Paulo." },
          { sender: 'ai', text: "Nice to meet you, Monica! Is this your first international meeting with our team?", translation: "Prazer em conhecê-la, Monica! Esta é a sua primeira reunião internacional com a nossa equipe?" },
          { sender: 'user', text: "Yes, it is! I am very excited to meet everyone and work together.", translation: "Sim, é! Estou muito animada para conhecer todos e trabalharmos juntos." }
        ]
      },
      Intermediate: {
        contextTip: "Focus on building rapport. Use 'Nice to meet you' and ask about their work.",
        goal: "Engage in small talk about remote work and team dynamics.",
        keyVocabulary: ["Catch up", "Remote work", "Schedule", "Multinational"],
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
          { sender: 'user', text: "Yes, I have. They look very professional. I think they really capture our team's dynamic well.", translation: "Sim, eu vi. Eles parecem muito profissionais. Acho que capturam muito bem a dinâmica da nossa equipe." }
        ]
      },
      Advanced: {
        contextTip: "Focus on executive nuances. Use 'Rapport', 'Stakeholder', and lead the transition to business.",
        goal: "Manage a complex professional introduction and set the agenda for the meeting.",
        keyVocabulary: ["Stakeholder", "Rapport", "Strategic", "Keynote"],
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
          { sender: 'user', text: "We should present our roadmap metrics first, transitioning smoothly into how this schedule secures long-term value.", translation: "Devemos apresentar as métricas do nosso mapa de desenvolvimento primeiro, fazendo uma transição suave para como este cronograma garante valor a longo prazo." }
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
        keyVocabulary: ["Meeting", "Task", "Yes", "Now"],
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
          { sender: 'user', text: "Yes, the task is complete. I can show the results now.", translation: "Sim, a tarefa está concluída. Eu posso mostrar os resultados agora." }
        ]
      },
      Intermediate: {
        contextTip: "Use 'I agree' or 'I see your point' before expressing a different opinion.",
        goal: "Communicate task progress, request feedback, and handle schedule changes professionally.",
        keyVocabulary: ["Deadline", "Feedback", "Agenda", "Push back"],
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
          { sender: 'user', text: "Certainly. I need clarification on the brand guidelines before I can finalize the backend integration. Can you repeat that last part about the mobile layout?", translation: "Com certeza. Preciso de esclarecimentos sobre as diretrizes da marca antes de finalizar a integração do backend. Você pode repetir aquela última parte sobre o layout mobile?" }
        ]
      },
      Advanced: {
        contextTip: "Focus on strategic alignment. Use 'Prioritize', 'Bandwidth', and 'Bottleneck'.",
        goal: "Lead the meeting discussion, address resource bottlenecks, and redefine project milestones.",
        keyVocabulary: ["Prioritize", "Milestone", "Bottleneck", "Stakeholder"],
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
          { sender: 'user', text: "I will secure alignment by presenting a risk-mitigation model that proves this path prevents critical software bugs.", translation: "Vou garantir o alinhamento apresentando um modelo de mitigação de risco que prova que este caminho evita bugs críticos no software." }
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
        keyVocabulary: ["Name", "Job", "From", "Live"],
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
          { sender: 'user', text: "Yes, I do. I want to build a career in a global company.", translation: "Sim, eu gosto. Quero construir uma carreira em uma empresa global." }
        ]
      },
      Intermediate: {
        contextTip: "Talk about strengths and walk through your experience.",
        goal: "Explain your background and professional experience.",
        keyVocabulary: ["Resume", "Skills", "Team", "Achieve"],
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
          { sender: 'user', text: "My main strength is clear communication. I ensure everyone on the team is on the same page regarding tasks.", translation: "Minha principal força é a comunicação clara. Garanto que todos na equipe estejam alinhados em relação às tarefas." }
        ]
      },
      Advanced: {
        contextTip: "Focus on the STAR method (Situation, Task, Action, Result).",
        goal: "Demonstrate high-level leadership and crisis resolution.",
        keyVocabulary: ["Leadership", "Stakeholder", "Resolution", "Turnaround"],
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
          { sender: 'user', text: "I carried out a structured rollback plan, communicated transparently every two hours, and successfully restored operations within six hours.", translation: "Executei um plano de reversão estruturado, comuniquei-me de forma transparente a cada duas horas e restaurei com sucesso as operações dentro de seis horas." }
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
        keyVocabulary: ["Email", "File", "Send", "Inbox"],
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
          { sender: 'user', text: "You are welcome. Let me know if you need more help.", translation: "De nada. Avise-me se precisar de mais ajuda." }
        ]
      },
      Intermediate: {
        contextTip: "Use polite, formal phrasing like 'Please find attached'.",
        goal: "Formally request feedback on a proposal.",
        keyVocabulary: ["Attached", "Request", "Oversight", "Shortly"],
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
          { sender: 'user', text: "Perfect. I appreciate your feedback and look forward to finalizing this.", translation: "Perfeito. Agradeço seus comentários e estou ansiosa para finalizar isso." }
        ]
      },
      Advanced: {
        contextTip: "Maintain an executive, professional but firm tone.",
        goal: "Resolve a critical billing discrepancy and settle a dispute.",
        keyVocabulary: ["Oversight", "Clarify", "Discrepancy", "Reconciliation"],
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
          { sender: 'user', text: "I completely understand the urgency. I will send over the corrected reconciliation ledger before the end of the day.", translation: "Compreendo totalmente a urgência. Enviarei o livro-razão de reconciliação corrigido antes do final do dia." }
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
        keyVocabulary: ["Company", "Meet", "Card", "Name"],
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
          { sender: 'user', text: "I am a Project Manager. It is great to meet you here, Sarah.", translation: "Sou gerente de projetos. É muito bom conhecer você aqui, Sarah." }
        ]
      },
      Intermediate: {
        contextTip: "Ask about their industry and suggest connecting on LinkedIn.",
        goal: "Build professional rapport and expand your network.",
        keyVocabulary: ["Network", "LinkedIn", "Trends", "Insights"],
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
          { sender: 'user', text: "That is a great idea. I will reach out to you on LinkedIn tonight to follow up.", translation: "Essa é uma ótima ideia. Entrarei em contato com você no LinkedIn hoje à noite para darmos andamento." }
        ]
      },
      Advanced: {
        contextTip: "Deliver a polished value proposition pitch.",
        goal: "Pitch your services and position a strategic partnership.",
        keyVocabulary: ["Insight", "Strategy", "Proposition", "Synergy"],
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
          { sender: 'user', text: "I understand. But we offer bespoke scaling strategies that complement existing frameworks, unlocking hidden efficiency.", translation: "Eu entendo. Mas oferecemos estratégias de escala personalizadas que complementam as estruturas existentes, liberando eficiência oculta." }
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
        keyVocabulary: ["Audio", "Video", "Hear", "See"],
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
          { sender: 'user', text: "Yes, my microphone is working. I am ready to start the meeting.", translation: "Sim, meu microfone está funcionando. Estou pronta para começar a reunião." }
        ]
      },
      Intermediate: {
        contextTip: "Politely mention glitches: 'Your mic is muted'.",
        goal: "Manage typical virtual meeting technical glitches.",
        keyVocabulary: ["Muted", "Connection", "Unstable", "Screen"],
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
          { sender: 'user', text: "Oh, my bad. Let me close the other window and share the project agenda again.", translation: "Ah, erro meu. Deixe-me fechar a outra janela e compartilhar a pauta do projeto novamente." }
        ]
      },
      Advanced: {
        contextTip: "Focus on virtual engagement and collaborative workflows.",
        goal: "Lead a high-stakes virtual workshop effectively.",
        keyVocabulary: ["Bandwidth", "Screen", "Whiteboard", "Engagement"],
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
          { sender: 'user', text: "Agreed. I will split the audience into breakout rooms now to promote focused brainstorming sessions.", translation: "Acordado. Vou dividir o público em salas simultâneas agora para promover sessões de brainstorming focadas." }
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
        keyVocabulary: ["Bag", "Scale", "Airport", "Ticket"],
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
          { sender: 'user', text: "Thank you. Is my gate in the main terminal?", translation: "Obrigada. Meu portão fica no terminal principal?" }
        ]
      },
      Intermediate: {
        contextTip: "Use spatial prepositions: 'between', 'next to', 'in front of'.",
        goal: "Find your departure gate and airport facilities.",
        keyVocabulary: ["Between", "Gate", "Lounge", "Terminal"],
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
          { sender: 'user', text: "Excellent! So it is right next to the pharmacy. Thank you so much.", translation: "Excelente! Então fica bem ao lado da farmácia. Muito obrigada." }
        ]
      },
      Advanced: {
        contextTip: "Describe precise spatial locations and customs procedures.",
        goal: "Resolve a critical luggage routing issue with customs.",
        keyVocabulary: ["Identification", "Behind", "Customs", "Discrepancy"],
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
          { sender: 'user', text: "I understand. I will fill out the declaration form right at the desk to prevent any hold up.", translation: "Eu entendo. Vou preencher o formulário de declaração bem ali no balcão para evitar qualquer atraso." }
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
        keyVocabulary: ["Yes", "Passport", "Do", "Visit"],
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
          { sender: 'user', text: "No, I do not. I want to visit our office for five days.", translation: "Não, não pretendo. Quero visitar nosso escritório por cinco dias." }
        ]
      },
      Intermediate: {
        contextTip: "Use 'Can I have' or 'Can you help me' to make polite requests.",
        goal: "Request flight assistance from the crew.",
        keyVocabulary: ["Can", "Water", "Help", "Request"],
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
          { sender: 'user', text: "Yes, please. Can you help me to place this heavy suitcase in the compartment?", translation: "Sim, por favor. Pode me ajudar a colocar esta mala pesada no compartimento?" }
        ]
      },
      Advanced: {
        contextTip: "Leverage advanced conditional expressions for polite negotiation.",
        goal: "Negotiate a last-minute flight reschedule with an airline agent.",
        keyVocabulary: ["Could", "If", "Alternative", "Upgrade"],
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
          { sender: 'user', text: "I would be happy to do so. I really need to catch this flight to attend a critical kickoff.", translation: "Ficaria feliz em fazê-lo. Eu realmente preciso pegar este voo para participar de um alinhamento crítico." }
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
        keyVocabulary: ["Brazil", "Wife", "Am", "Is"],
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
          { sender: 'user', text: "No, he is not. He is still in Brazil. I am alone today.", translation: "Não, ele não está. Ele ainda está no Brasil. Estou sozinha hoje." }
        ]
      },
      Intermediate: {
        contextTip: "Use plural forms correctly: 'We are', 'They are'.",
        goal: "Describe your team's current status and location.",
        keyVocabulary: ["Vacation", "Excited", "Are", "Ready"],
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
          { sender: 'user', text: "They are in front of the lobby entrance. We are ready to board the bus.", translation: "Eles estão em frente à entrada do saguão. Estamos prontos para embarcar no ônibus." }
        ]
      },
      Advanced: {
        contextTip: "Express states of capability and readiness professionally.",
        goal: "Convince a potential client of your team's expertise and readiness.",
        keyVocabulary: ["Ready", "Expert", "Capable", "Outstanding"],
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
          { sender: 'user', text: "Yes, it is. We are highly capable, and our deployment record is outstanding in this sector.", translation: "Sim, é. Somos altamente capazes, e nosso histórico de implantação é excelente neste setor." }
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
