'use client';

import React, { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  HelpCircle,
  Award,
  RotateCcw
} from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  type: 'multiple-choice' | 'fill-in-the-blank' | 'unscramble' | 'find-the-mistake';
  question: string;
  options?: string[];
  scrambledWords?: string[];
  sentenceWords?: string[];
  incorrectWordIndex?: number;
  correctedWord?: string;
  correctAnswer: string;
  explanation: string;
}

const moduleContent: Record<string, { title: string, questions: Question[] }> = {
  'lesson-1': {
    title: 'Small Talk Mastery',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'How do you respond to "How have you been?" in a professional but friendly way?',
        options: [
          'I am working.',
          'Great, thanks! Busy with the new launch, but things are going well. And you?',
          'None of your business.',
          'I am fine.'
        ],
        correctAnswer: 'Great, thanks! Busy with the new launch, but things are going well. And you?',
        explanation: 'Providing a brief positive update and asking back is the standard for business small talk.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'It\'s a pleasure to finally meet you _______ person!',
        correctAnswer: 'in',
        explanation: '"In person" is the correct prepositional phrase for meeting someone physically after online contact.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What is a good "icebreaker" question for a colleague you just met?',
        options: [
          'How much do you earn?',
          'Why are you late?',
          'How long have you been with the company?',
          'What is your political opinion?'
        ],
        correctAnswer: 'How long have you been with the company?',
        explanation: 'Work-related history is a safe and professional topic for initial small talk.'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'I\'ve heard so much _______ you! It\'s nice to finally connect.',
        correctAnswer: 'about',
        explanation: '"Heard about you" is used when you know of someone\'s reputation or work before meeting.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'If a conversation is ending, what is a polite way to "wrap it up"?',
        options: [
          'I have to go now. Bye.',
          'It was great catching up. I should probably head to the next session. Let\'s talk soon!',
          'Stop talking, I am bored.',
          'Silence.'
        ],
        correctAnswer: 'It was great catching up. I should probably head to the next session. Let\'s talk soon!',
        explanation: 'Acknowledging the value of the talk before stating a reason to leave is professional.'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a polite greeting using these words:',
        scrambledWords: ['nice', 'to', 'It', 'is', 'meet', 'finally', 'you'],
        correctAnswer: 'It is nice to finally meet you',
        explanation: '"It is nice to finally meet you" is perfect for meeting someone in person after talking online.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the grammar mistake and correct it:',
        sentenceWords: ['I', 'am', 'look', 'forward', 'to', 'the', 'weekend.'],
        incorrectWordIndex: 2,
        correctedWord: 'looking',
        correctAnswer: 'looking',
        explanation: 'After "look forward to", the verb must be in the -ing form (gerund).'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a common small talk question:',
        scrambledWords: ['long', 'have', 'you', 'been', 'with', 'the', 'company', 'How'],
        correctAnswer: 'How long have you been with the company',
        explanation: 'A standard professional icebreaker to ask about tenure.'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the preposition mistake and correct it:',
        sentenceWords: ['I', 'am', 'very', 'good', 'in', 'my', 'job.'],
        incorrectWordIndex: 4,
        correctedWord: 'at',
        correctAnswer: 'at',
        explanation: 'We use "good at" when referring to skills or jobs, not "good in".'
      }
    ]
  },
  'lesson-2': {
    title: 'Meeting Terminology',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the "agenda" of a meeting?',
        options: [
          'The person leading the meeting.',
          'The list of items to be discussed.',
          'The room where the meeting is held.',
          'The minutes of the previous meeting.'
        ],
        correctAnswer: 'The list of items to be discussed.',
        explanation: 'An agenda ensures the meeting stays focused on specific topics.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'Could you _______ that last point? I didn\'t quite catch it.',
        correctAnswer: 'repeat',
        explanation: 'Asking for repetition is a vital skill in international meetings.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What does "AOB" usually stand for at the end of an agenda?',
        options: [
          'All On Board',
          'Any Other Business',
          'Action Oriented Behavior',
          'Annual Office Budget'
        ],
        correctAnswer: 'Any Other Business',
        explanation: 'AOB is the time for participants to raise minor points not on the main agenda.'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'Let\'s _______ to the next item on the list.',
        correctAnswer: 'move',
        explanation: '"Move to" or "Move on to" is the standard phrase for changing topics in a meeting.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'How do you politely interrupt to ask a question?',
        options: [
          'Shut up, I have a question.',
          'Sorry to jump in, but could I just clarify one thing?',
          'I am talking now.',
          'Wait!'
        ],
        correctAnswer: 'Sorry to jump in, but could I just clarify one thing?',
        explanation: '"Sorry to jump in" or "May I just add..." are polite ways to interrupt.'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a phrase to change the topic:',
        scrambledWords: ['move', 'on', 'Let', 'us', 'the', 'item', 'to', 'next'],
        correctAnswer: 'Let us move on to the next item',
        explanation: 'This is a standard way to transition between agenda points.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the preposition mistake and correct it:',
        sentenceWords: ['I', 'agree', 'with', 'you', 'in', 'this', 'point.'],
        incorrectWordIndex: 4,
        correctedWord: 'on',
        correctAnswer: 'on',
        explanation: 'The correct phrase is "agree on this point", not "in this point".'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a phrase to politely ask for clarification:',
        scrambledWords: ['you', 'repeat', 'that', 'last', 'point', 'please', 'Could'],
        correctAnswer: 'Could you repeat that last point please',
        explanation: 'A highly professional way to ask someone to say something again.'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the preposition mistake and correct it:',
        sentenceWords: ['We', 'need', 'to', 'focus', 'in', 'the', 'agenda.'],
        incorrectWordIndex: 4,
        correctedWord: 'on',
        correctAnswer: 'on',
        explanation: 'The verb focus is always followed by the preposition "on".'
      }
    ]
  },
  'lesson-3': {
    title: 'Interview Excellence',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'When asked about a "weakness", what is the best strategy?',
        options: [
          'Say you have no weaknesses.',
          'Mention a real weakness and explain how you are working to improve it.',
          'Mention a weakness that is actually a strength (e.g., "I work too hard").',
          'Avoid the question.'
        ],
        correctAnswer: 'Mention a real weakness and explain how you are working to improve it.',
        explanation: 'Authenticity and a growth mindset are highly valued by recruiters.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'I have over five years of _______ in this field.',
        correctAnswer: 'experience',
        explanation: '"Experience" is the most common term for professional time spent in a role.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What does a recruiter mean by "walk me through your CV"?',
        options: [
          'Literally walk on the paper.',
          'Give a brief summary of your professional history and key achievements.',
          'Read every single line out loud.',
          'Explain why you left your first job only.'
        ],
        correctAnswer: 'Give a brief summary of your professional history and key achievements.',
        explanation: 'This is an invitation to highlight your most relevant career points.'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'I am looking for a new _______ that allows me to grow professionally.',
        correctAnswer: 'challenge',
        explanation: '"Challenge" is a positive way to describe a new job opportunity.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'How should you answer "Why should we hire you?"',
        options: [
          'Because I need the money.',
          'Because I am the best person in the world.',
          'By matching your skills and experience to the specific needs of the company.',
          'I don\'t know, you tell me.'
        ],
        correctAnswer: 'By matching your skills and experience to the specific needs of the company.',
        explanation: 'Showing alignment between your profile and their problems is the key to success.'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a sentence about your experience:',
        scrambledWords: ['have', 'I', 'years', 'five', 'of', 'experience'],
        correctAnswer: 'I have five years of experience',
        explanation: 'Clear and direct statement of your professional background.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the time expression mistake and correct it:',
        sentenceWords: ['I', 'graduated', 'university', 'two', 'years', 'since.'],
        incorrectWordIndex: 5,
        correctedWord: 'ago',
        correctAnswer: 'ago',
        explanation: 'We use "ago" for a specific point in the past measured back from the present.'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a sentence about your career goals:',
        scrambledWords: ['looking', 'for', 'a', 'new', 'challenge', 'I', 'am'],
        correctAnswer: 'I am looking for a new challenge',
        explanation: 'A standard phrase to indicate readiness for growth and new opportunities.'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the grammatical mistake and correct it:',
        sentenceWords: ['I', 'have', 'a', 'lot', 'of', 'experiences', 'in', 'sales.'],
        incorrectWordIndex: 5,
        correctedWord: 'experience',
        correctAnswer: 'experience',
        explanation: 'When talking about accumulated knowledge from a job, "experience" is uncountable.'
      }
    ]
  },
  'lesson-4': {
    title: 'Email Correspondence',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which closing is appropriate for a formal business email to a new client?',
        options: [
          'See ya!',
          'Cheers,',
          'Sincerely,',
          'Sent from my iPhone'
        ],
        correctAnswer: 'Sincerely,',
        explanation: '"Sincerely" or "Best regards" are standard formal closings.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'Please find _______ the document you requested.',
        correctAnswer: 'attached',
        explanation: '"Please find attached" is the standard phrase for sending files via email.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What does "CC" stand for in an email?',
        options: [
          'Company Contact',
          'Carbon Copy',
          'Chief Coordinator',
          'Confirmed Communication'
        ],
        correctAnswer: 'Carbon Copy',
        explanation: 'CC is used to send a copy of the email to someone who needs to be informed but not necessarily reply.'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'I look forward _______ hearing from you soon.',
        correctAnswer: 'to',
        explanation: 'The full phrase is "look forward to + [verb-ing/noun]".'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'When should you use "To whom it may concern"?',
        options: [
          'When writing to your boss.',
          'When you don\'t know the specific name of the recipient.',
          'In every email.',
          'When you are angry.'
        ],
        correctAnswer: 'When you don\'t know the specific name of the recipient.',
        explanation: 'It is a formal way to address an unknown person or department.'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a phrase to refer to an attachment:',
        scrambledWords: ['find', 'Please', 'attached', 'requested', 'document', 'the'],
        correctAnswer: 'Please find attached the requested document',
        explanation: 'A very common and formal way to point out email attachments.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the vocabulary mistake and correct it:',
        sentenceWords: ['Please', 'find', 'the', 'attach', 'document', 'below.'],
        incorrectWordIndex: 3,
        correctedWord: 'attached',
        correctAnswer: 'attached',
        explanation: 'It must be the adjective "attached", not the verb "attach".'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a common email closing phrase:',
        scrambledWords: ['look', 'forward', 'to', 'hearing', 'from', 'you', 'I'],
        correctAnswer: 'I look forward to hearing from you',
        explanation: 'The most standard formal closing line to anticipate a response.'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the grammatical mistake and correct it:',
        sentenceWords: ['Let', 'me', 'know', 'if', 'you', 'need', 'any', 'informations.'],
        incorrectWordIndex: 7,
        correctedWord: 'information',
        correctAnswer: 'information',
        explanation: 'The word "information" is uncountable in English and never takes an "s".'
      }
    ]
  },
  'lesson-5': {
    title: 'Networking Dynamics',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is a "soft skill" often used in networking?',
        options: [
          'Python programming.',
          'Financial modeling.',
          'Active listening.',
          'Database management.'
        ],
        correctAnswer: 'Active listening.',
        explanation: 'Active listening helps build trust and meaningful connections during networking.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'Do you have a business _______? I\'d like to stay in touch.',
        correctAnswer: 'card',
        explanation: 'Exchanging business cards is a traditional but still common networking practice.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What is an "Elevator Pitch"?',
        options: [
          'A pitch made while falling in an elevator.',
          'A very short summary of who you are and what you do (30-60 seconds).',
          'A long presentation with 50 slides.',
          'A way to fix an elevator.'
        ],
        correctAnswer: 'A very short summary of who you are and what you do (30-60 seconds).',
        explanation: 'It\'s called an elevator pitch because it should be short enough to deliver during an elevator ride.'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'I\'d love to _______ up with you on LinkedIn.',
        correctAnswer: 'connect',
        explanation: '"Connect on LinkedIn" is the standard phrase for professional social networking.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the primary goal of "Networking"?',
        options: [
          'To get as many free pens as possible.',
          'To build mutually beneficial professional relationships.',
          'To sell your product to everyone immediately.',
          'To collect business cards and never look at them.'
        ],
        correctAnswer: 'To build mutually beneficial professional relationships.',
        explanation: 'Networking is about long-term value and connection, not just immediate sales.'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a phrase to exchange contacts:',
        scrambledWords: ['like', 'I', 'would', 'to', 'in', 'stay', 'touch'],
        correctAnswer: 'I would like to stay in touch',
        explanation: 'A polite way to express interest in maintaining the professional relationship.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the grammar mistake and correct it:',
        sentenceWords: ['It', 'was', 'a', 'pleasure', 'to', 'meeting', 'you.'],
        incorrectWordIndex: 5,
        correctedWord: 'meet',
        correctAnswer: 'meet',
        explanation: 'After the infinitive "to", use the base form of the verb ("meet").'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a phrase to ask about someone\'s job:',
        scrambledWords: ['What', 'do', 'you', 'do', 'at', 'your', 'firm'],
        correctAnswer: 'What do you do at your firm',
        explanation: 'A great open-ended networking question.'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the grammatical mistake and correct it:',
        sentenceWords: ['Let', 'us', 'keeping', 'in', 'touch.'],
        incorrectWordIndex: 2,
        correctedWord: 'keep',
        correctAnswer: 'keep',
        explanation: 'After "Let us" (Let\'s), use the base verb form.'
      }
    ]
  },
  'lesson-6': {
    title: 'Technical Call Proficiency',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What do you say when you can see a colleague but cannot hear them?',
        options: [
          'You are invisible.',
          'You are on mute.',
          'Your camera is off.',
          'Speak louder.'
        ],
        correctAnswer: 'You are on mute.',
        explanation: '"You are on mute" is the standard way to tell someone their microphone is disabled.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'The connection is _______; your video is freezing.',
        correctAnswer: 'unstable',
        explanation: '"Unstable" describes a poor or fluctuating internet connection.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What does "screen sharing" allow you to do?',
        options: [
          'Give your monitor to a colleague.',
          'Let others see what is on your computer screen during a call.',
          'Take a screenshot of the meeting.',
          'Split the screen into two parts.'
        ],
        correctAnswer: 'Let others see what is on your computer screen during a call.',
        explanation: 'Screen sharing is essential for presentations and collaborative work.'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'Can you _______ up? I can barely hear you.',
        correctAnswer: 'speak',
        explanation: '"Speak up" means to talk louder.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What should you do if your background is very noisy during a call?',
        options: [
          'Keep talking louder.',
          'Mute yourself when you are not speaking.',
          'Ask everyone else to be quiet.',
          'Leave the meeting.'
        ],
        correctAnswer: 'Mute yourself when you are not speaking.',
        explanation: 'Muting helps maintain clear audio for other participants when you have background noise.'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a phrase to solve an audio issue:',
        scrambledWords: ['think', 'I', 'you', 'are', 'mute', 'on'],
        correctAnswer: 'I think you are on mute',
        explanation: 'A polite way to inform someone their microphone is off.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the preposition mistake and correct it:',
        sentenceWords: ['I', 'cannot', 'hear', 'you.', 'You', 'are', 'in', 'mute.'],
        incorrectWordIndex: 6,
        correctedWord: 'on',
        correctAnswer: 'on',
        explanation: 'The correct phrase is "on mute".'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a phrase to introduce a presentation:',
        scrambledWords: ['will', 'share', 'my', 'screen', 'with', 'you', 'I'],
        correctAnswer: 'I will share my screen with you',
        explanation: 'A clear declaration before starting to broadcast your monitor.'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the grammatical mistake and correct it:',
        sentenceWords: ['My', 'connection', 'is', 'very', 'badly', 'today.'],
        incorrectWordIndex: 4,
        correctedWord: 'bad',
        correctAnswer: 'bad',
        explanation: 'Use the adjective "bad" to describe the noun "connection", not the adverb "badly".'
      }
    ]
  },
  'lesson-7': {
    title: 'Travel & Prepositions',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Where do you wait for your plane?',
        options: [
          'On the gate.',
          'At the gate.',
          'In the gate.',
          'Under the gate.'
        ],
        correctAnswer: 'At the gate.',
        explanation: 'We use "at" for specific points or locations in a building.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'My passport is _______ my pocket.',
        correctAnswer: 'in',
        explanation: '"In" is used for items inside a contained space (like a pocket or bag).'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Where is the baggage claim usually located?',
        options: [
          'On the airplane.',
          'Inside the pharmacy.',
          'In the arrivals area.',
          'At the duty-free shop.'
        ],
        correctAnswer: 'In the arrivals area.',
        explanation: 'Baggage claim is where you collect your luggage after landing.'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'The hotel is right _______ to the conference center.',
        correctAnswer: 'next',
        explanation: '"Next to" indicates proximity or being beside something.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What is a "layover"?',
        options: [
          'A type of blanket.',
          'A period of time between connecting flights.',
          'The person who cleans the airplane.',
          'A special type of ticket.'
        ],
        correctAnswer: 'A period of time between connecting flights.',
        explanation: 'Layovers can range from a few hours to a whole day depending on the route.'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a sentence asking about locations:',
        scrambledWords: ['Is', 'restaurant', 'the', 'security', 'behind', 'check', 'the'],
        correctAnswer: 'Is the restaurant behind the security check',
        explanation: 'Asking for directions using spatial prepositions.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the preposition mistake and correct it:',
        sentenceWords: ['My', 'flight', 'departs', 'in', '5:30', 'PM.'],
        incorrectWordIndex: 3,
        correctedWord: 'at',
        correctAnswer: 'at',
        explanation: 'We use the preposition "at" for specific times on the clock.'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a phrase to ask for directions at the airport:',
        scrambledWords: ['Where', 'is', 'the', 'baggage', 'claim', 'area', 'located'],
        correctAnswer: 'Where is the baggage claim area located',
        explanation: 'A formal and direct way to ask where to pick up luggage.'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the preposition mistake and correct it:',
        sentenceWords: ['The', 'hotel', 'is', 'at', 'the', 'right', 'of', 'the', 'station.'],
        incorrectWordIndex: 3,
        correctedWord: 'to',
        correctAnswer: 'to',
        explanation: 'The correct spatial phrase is "to the right of".'
      }
    ]
  },
  'lesson-8': {
    title: 'DO / CAN / TO',
    questions: [
      {
        id: 1,
        type: 'fill-in-the-blank',
        question: 'Do you have a passport? -> Yes, I _______',
        correctAnswer: 'do',
        explanation: 'For questions starting with "Do you...", the short affirmative answer is "Yes, I do".'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'Do you need help? -> No, I\'m _______',
        correctAnswer: 'okay',
        explanation: 'A natural way to decline help politely is "No, I\'m okay" or "No, thank you".'
      },
      {
        id: 3,
        type: 'fill-in-the-blank',
        question: 'Can I get some water? -> Yes, of _______',
        correctAnswer: 'course',
        explanation: '"Of course" is a very common and polite way to agree to a request.'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'Can you help me? -> Sure, no _______',
        correctAnswer: 'problem',
        explanation: '"No problem" is a natural response when agreeing to help someone.'
      },
      {
        id: 5,
        type: 'fill-in-the-blank',
        question: 'Welcome _______ the United States.',
        correctAnswer: 'to',
        explanation: 'We use the preposition "to" to indicate direction or destination.'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a question asking about English skills:',
        scrambledWords: ['speak', 'you', 'Do', 'English'],
        correctAnswer: 'Do you speak English',
        explanation: 'Start with the auxiliary DO, followed by subject and base verb.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the grammatical mistake and correct it:',
        sentenceWords: ['Do', 'you', 'has', 'your', 'passport?'],
        incorrectWordIndex: 2,
        correctedWord: 'have',
        correctAnswer: 'have',
        explanation: 'After "Do you", always use the base form of the verb ("have").'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a polite request:',
        scrambledWords: ['get', 'I', 'Can', 'some', 'water'],
        correctAnswer: 'Can I get some water',
        explanation: '"Can I get..." is a very natural way to order or request something.'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the preposition mistake and correct it:',
        sentenceWords: ['Welcome', 'in', 'the', 'United', 'States.'],
        incorrectWordIndex: 1,
        correctedWord: 'to',
        correctAnswer: 'to',
        explanation: 'The correct phrase for arrivals is "Welcome to [place]".'
      }
    ]
  },
  'lesson-9': {
    title: 'Present To Be',
    questions: [
      {
        id: 1,
        type: 'fill-in-the-blank',
        question: 'I _______ Brazilian.',
        correctAnswer: 'am',
        explanation: 'Always use "am" with the pronoun "I".'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'She _______ a police officer.',
        correctAnswer: 'is',
        explanation: 'Use "is" with singular third-person pronouns (he, she, it).'
      },
      {
        id: 3,
        type: 'fill-in-the-blank',
        question: 'We _______ at the airport.',
        correctAnswer: 'are',
        explanation: 'Use "are" with plural pronouns (we, you, they).'
      },
      {
        id: 4,
        type: 'fill-in-the-blank',
        question: 'He _______ tired.',
        correctAnswer: 'is',
        explanation: 'Use "is" with the pronoun "he".'
      },
      {
        id: 5,
        type: 'fill-in-the-blank',
        question: 'They _______ ready.',
        correctAnswer: 'are',
        explanation: 'Use "are" with the pronoun "they".'
      },
      {
        id: 6,
        type: 'unscramble',
        question: 'Form a sentence about your location:',
        scrambledWords: ['am', 'I', 'the', 'airport', 'at'],
        correctAnswer: 'I am at the airport',
        explanation: '"I am" followed by the prepositional phrase of location.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Find the verb mistake and correct it:',
        sentenceWords: ['You', 'is', 'very', 'kind.'],
        incorrectWordIndex: 1,
        correctedWord: 'are',
        correctAnswer: 'are',
        explanation: 'The correct form of the verb "to be" for "You" is "are".'
      },
      {
        id: 8,
        type: 'unscramble',
        question: 'Form a negative sentence:',
        scrambledWords: ['tired', 'not', 'am', 'I'],
        correctAnswer: 'I am not tired',
        explanation: 'The negative word "not" comes immediately after the verb "am".'
      },
      {
        id: 9,
        type: 'find-the-mistake',
        question: 'Find the verb mistake and correct it:',
        sentenceWords: ['We', 'is', 'on', 'vacation.'],
        incorrectWordIndex: 1,
        correctedWord: 'are',
        correctAnswer: 'are',
        explanation: 'The correct form for "We" is "are".'
      }
    ]
  },
  'lesson-10': {
    title: 'Simple Present x Present Continuous',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which sentence correctly contrasts standard weekly routine with a temporary pivot?',
        options: [
          'I am usually working from the home office, but tomorrow I am traveling.',
          'I usually manage database updates, but this week I am auditing security logs.',
          'I worked at the office yesterday.',
          'I will be coding all night long.'
        ],
        correctAnswer: 'I usually manage database updates, but this week I am auditing security logs.',
        explanation: 'We use Simple Present ("usually manage") for general routines and Present Continuous ("this week I am auditing") for temporary project shifts.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'Right now, the DevOps engineering team _______ auditing the staging servers.',
        correctAnswer: 'is',
        explanation: 'Use the singular form "is" when referring to the collective noun "engineering team" as a single unit performing an action in Present Continuous.'
      },
      {
        id: 3,
        type: 'unscramble',
        question: 'Form a common routine statement using these words:',
        scrambledWords: ['We', 'usually', 'review', 'our', 'quarterly', 'sprint', 'metrics'],
        correctAnswer: 'We usually review our quarterly sprint metrics',
        explanation: 'Simple Present combined with the frequency adverb "usually" indicates a standard business routine.'
      },
      {
        id: 4,
        type: 'find-the-mistake',
        question: 'Identify the routine verb mistake and correct it:',
        sentenceWords: ['She', 'work', 'at', 'the', 'main', 'office', 'every', 'day.'],
        incorrectWordIndex: 1,
        correctedWord: 'works',
        correctAnswer: 'works',
        explanation: 'For third-person singular (he, she, it) in Simple Present, the verb must take an "-s" ("works").'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What does the time expression "at the moment" imply in business?',
        options: [
          'A predictable task completed last month.',
          'A long-term strategy for next year.',
          'A temporary operational action occurring right now.',
          'A permanent job responsibility.'
        ],
        correctAnswer: 'A temporary operational action occurring right now.',
        explanation: '"At the moment" indicates that a temporary action is actively ongoing and contrasts with daily routine.'
      },
      {
        id: 6,
        type: 'fill-in-the-blank',
        question: 'We _______ review our goals monthly to stay aligned with the board.',
        correctAnswer: 'usually',
        explanation: 'Frequency adverbs like "usually" are placed before the main verb in Simple Present routines.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Identify the continuous action verb mistake and correct it:',
        sentenceWords: ['They', 'are', 'work', 'in', 'the', 'other', 'room', 'at', 'the', 'moment.'],
        incorrectWordIndex: 2,
        correctedWord: 'working',
        correctAnswer: 'working',
        explanation: 'Present Continuous requires the verb to be in the "-ing" form after the auxiliary "are".'
      }
    ]
  },
  'lesson-11': {
    title: 'Present Perfect x Simple Past',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which sentence correctly reports a completed project milestone with a specific past date?',
        options: [
          'We have deployed the hotfix yesterday at noon.',
          'We finalized the cloud gateway integration last night at 10 PM.',
          'I am launching the database server right now.',
          'We had migrated the data earlier today.'
        ],
        correctAnswer: 'We finalized the cloud gateway integration last night at 10 PM.',
        explanation: 'For specific, completed past time references ("last night at 10 PM"), we must use Simple Past ("finalized"), not Present Perfect.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'Have you _______ traveled abroad to attend a shareholder summit?',
        correctAnswer: 'ever',
        explanation: 'Use "ever" in questions to ask about experiences at an indefinite time in a person\'s life.'
      },
      {
        id: 3,
        type: 'unscramble',
        question: 'Form a progress statement using these words:',
        scrambledWords: ['We', 'have', 'already', 'successfully', 'migrated', 'the', 'main', 'database'],
        correctAnswer: 'We have already successfully migrated the main database',
        explanation: 'Present Perfect with "already" emphasizes that a task has been completed prior to the current moment.'
      },
      {
        id: 4,
        type: 'find-the-mistake',
        question: 'Identify the specific time tense mistake and correct it:',
        sentenceWords: ['I', 'have', 'visited', 'our', 'Paris', 'office', 'in', '2023.'],
        incorrectWordIndex: 1,
        correctedWord: 'visited',
        correctAnswer: 'visited',
        explanation: 'Since "in 2023" is a definite, finished time in the past, we must use Simple Past "visited" instead of "have visited" (remove auxiliary have).'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the key functional difference between "already" and "yet" in project management?',
        options: [
          'Already is for routines, yet is for future predictions.',
          'Already is for completed actions, while yet is for expected actions not yet done.',
          'There is no grammatical difference.',
          'Yet is only used in Simple Past sentences.'
        ],
        correctAnswer: 'Already is for completed actions, while yet is for expected actions not yet done.',
        explanation: 'Use "already" in affirmative sentences for completed tasks, and "yet" in negative or interrogative sentences for pending tasks.'
      },
      {
        id: 6,
        type: 'fill-in-the-blank',
        question: 'She has _______ proposed a major strategy shift to the board members.',
        correctAnswer: 'just',
        explanation: '"Just" is used in Present Perfect to indicate that an action was completed a very short time ago.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Identify the past auxiliary mistake and correct it:',
        sentenceWords: ['He', 'did', 'not', 'saw', 'the', 'revised', 'budget', 'report', 'yesterday.'],
        incorrectWordIndex: 3,
        correctedWord: 'see',
        correctAnswer: 'see',
        explanation: 'After the past auxiliary "did not" (didn\'t), the main verb must remain in its base form ("see").'
      }
    ]
  },
  'lesson-12': {
    title: 'Present Perfect Continuous',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which sentence correctly describes a continuous task that started in the past and is still ongoing?',
        options: [
          'I am coding this specific security system since Monday morning.',
          'I have been developing this custom CRM system since last quarter.',
          'I developed the CRM system for three months last year.',
          'I will be designing the CRM database system next month.'
        ],
        correctAnswer: 'I have been developing this custom CRM system since last quarter.',
        explanation: 'Present Perfect Continuous ("have been developing") is used to show the duration of an ongoing action that started in the past.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'We have been resolving backend server latency issues _______ six hours.',
        correctAnswer: 'for',
        explanation: 'Use "for" to specify a duration or period of time ("six hours").'
      },
      {
        id: 3,
        type: 'unscramble',
        question: 'Form an ongoing work description using these words:',
        scrambledWords: ['We', 'have', 'been', 'working', 'on', 'the', 'new', 'features', 'lately'],
        correctAnswer: 'We have been working on the new features lately',
        explanation: '"Lately" is commonly used with Present Perfect Continuous to highlight recent ongoing work.'
      },
      {
        id: 4,
        type: 'find-the-mistake',
        question: 'Identify the participle mistake and correct it:',
        sentenceWords: ['She', 'has', 'been', 'studied', 'global', 'market', 'trends', 'since', '2024.'],
        incorrectWordIndex: 3,
        correctedWord: 'studying',
        correctAnswer: 'studying',
        explanation: 'Present Perfect Continuous requires "been" followed by the present participle (verb-ing).'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'When do you use the preposition "since" instead of "for" in duration sentences?',
        options: [
          'Since is for hours, for is for years.',
          'Since indicates a specific starting point in time, while for indicates a duration.',
          'Since is used only with Simple Past.',
          'Since is used to indicate a future milestone.'
        ],
        correctAnswer: 'Since indicates a specific starting point in time, while for indicates a duration.',
        explanation: '"Since" points to the beginning of the action (e.g., since 2020), whereas "for" measures the length of the time segment.'
      },
      {
        id: 6,
        type: 'fill-in-the-blank',
        question: 'How _______ have you been monitoring the company\'s database servers?',
        correctAnswer: 'long',
        explanation: '"How long..." is the standard question format to ask about duration of an activity in Present Perfect Continuous.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Identify the singular/plural subject-verb agreement mistake:',
        sentenceWords: ['They', 'has', 'been', 'debugging', 'the', 'staging', 'system', 'all', 'day.'],
        incorrectWordIndex: 1,
        correctedWord: 'have',
        correctAnswer: 'have',
        explanation: 'For plural subject pronouns like "They", the correct present auxiliary form is "have", not "has".'
      }
    ]
  },
  'lesson-13': {
    title: 'Past Perfect',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which action occurred first in this sentence? "The board meeting had finished before I arrived at the office."',
        options: [
          'I arrived at the office.',
          'The board meeting finished.',
          'Both actions occurred simultaneously.',
          'None of the actions occurred.'
        ],
        correctAnswer: 'The board meeting finished.',
        explanation: 'Past Perfect ("had finished") is used to designate the earlier action when describing two completed past events.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'By the time the CTO called the meeting, we had _______ secured the database.',
        correctAnswer: 'already',
        explanation: '"Already" is commonly placed between the auxiliary "had" and the past participle to emphasize early completion.'
      },
      {
        id: 3,
        type: 'unscramble',
        question: 'Form a chronology statement using these words:',
        scrambledWords: ['The', 'speaker', 'had', 'left', 'before', 'I', 'arrived', 'at', 'the', 'hall'],
        correctAnswer: 'The speaker had left before I arrived at the hall',
        explanation: 'Past Perfect "had left" (first event) before Simple Past "arrived" (second event).'
      },
      {
        id: 4,
        type: 'find-the-mistake',
        question: 'Identify the past participle verb mistake and correct it:',
        sentenceWords: ['She', 'had', 'already', 'finishes', 'the', 'report', 'before', 'the', 'deadline.'],
        incorrectWordIndex: 3,
        correctedWord: 'finished',
        correctAnswer: 'finished',
        explanation: 'Past Perfect requires the past participle form of the verb ("finished") after the auxiliary "had".'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the primary function of the Past Perfect tense in professional communication?',
        options: [
          'To describe a permanent future plan.',
          'To show that a past action was completed prior to another past action.',
          'To highlight routine habits that are still occurring.',
          'To report predictions about competitive markets.'
        ],
        correctAnswer: 'To show that a past action was completed prior to another past action.',
        explanation: 'It organizes history chronologically by placing the older past action in the Past Perfect.'
      },
      {
        id: 6,
        type: 'fill-in-the-blank',
        question: 'They had never _______ a data breach of this scale prior to the cloud migration.',
        correctAnswer: 'seen',
        explanation: 'Past participle "seen" is correct here after the auxiliary "had never" to express past experience prior to another past event.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Identify the irregular past participle mistake and correct it:',
        sentenceWords: ['We', 'had', 'went', 'home', 'by', 'six', 'PM', 'yesterday.'],
        incorrectWordIndex: 2,
        correctedWord: 'gone',
        correctAnswer: 'gone',
        explanation: 'The past participle of the irregular verb "go" is "gone", not the Simple Past form "went".'
      }
    ]
  },
  'lesson-14': {
    title: 'Past Perfect Continuous',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which sentence correctly describes a continuous past activity leading up to another past disruption?',
        options: [
          'We were working all night at our desks.',
          'We had been testing the server load for hours before the backup node crashed.',
          'We have been testing the backup node since yesterday morning.',
          'We will be testing the backup node tomorrow.'
        ],
        correctAnswer: 'We had been testing the server load for hours before the backup node crashed.',
        explanation: 'Past Perfect Continuous ("had been testing") shows a continuous past activity and its duration leading up to a specific past event.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'The engineers had been _______ for three hours before they identified the root cause.',
        correctAnswer: 'working',
        explanation: 'Past Perfect Continuous uses "had been" followed by the present participle (verb-ing).'
      },
      {
        id: 3,
        type: 'unscramble',
        question: 'Form an ongoing past description using these words:',
        scrambledWords: ['I', 'had', 'been', 'waiting', 'for', 'almost', 'an', 'hour', 'before', 'they', 'responded'],
        correctAnswer: 'I had been waiting for almost an hour before they responded',
        explanation: 'This describes the duration of a continuous past action before a secondary past event ("they responded").'
      },
      {
        id: 4,
        type: 'find-the-mistake',
        question: 'Identify the auxiliary mistake and correct it:',
        sentenceWords: ['They', 'had', 'being', 'studying', 'the', 'audit', 'logs', 'for', 'days', 'prior', 'to', 'Q3.'],
        incorrectWordIndex: 2,
        correctedWord: 'been',
        correctAnswer: 'been',
        explanation: 'The correct auxiliary combination is "had been" + verb-ing, not "had being".'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What does the Past Perfect Continuous emphasize in comparison to Simple Past?',
        options: [
          'A routine action happening right now.',
          'The duration of a continuous past activity before a specific past milestone.',
          'A quick, completed past transaction.',
          'A strategic future prediction.'
        ],
        correctAnswer: 'The duration of a continuous past activity before a specific past milestone.',
        explanation: 'It highlights the ongoing duration or process leading up to a point of interruption or change in the past.'
      },
      {
        id: 6,
        type: 'fill-in-the-blank',
        question: 'We had been trying to reach the international support team _______ days before they replied.',
        correctAnswer: 'for',
        explanation: 'Use "for" to express the duration of the continuous past action ("for days").'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Identify the present participle mistake and correct it:',
        sentenceWords: ['He', 'had', 'been', 'work', 'all', 'night', 'before', 'he', 'fell', 'asleep.'],
        incorrectWordIndex: 3,
        correctedWord: 'working',
        correctAnswer: 'working',
        explanation: 'The auxiliary "had been" must be followed by a present participle ("working") to show duration in Past Perfect Continuous.'
      }
    ]
  },
  'lesson-15': {
    title: 'Simple Future x Future Continuous',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'How do you state a scheduled future action that will be actively in progress at a specific time tonight?',
        options: [
          'I will present our quarterly results tomorrow.',
          'I will be working on the database migration tonight at nine PM.',
          'I was testing the server capacity earlier today.',
          'I usually review the reports every single evening.'
        ],
        correctAnswer: 'I will be working on the database migration tonight at nine PM.',
        explanation: 'Use Future Continuous ("will be working") to describe an action that will be in progress at a specific future moment.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'Do not call me at noon tomorrow; I will _______ flying to our Chicago branch.',
        correctAnswer: 'be',
        explanation: 'Future Continuous requires the auxiliary "will be" followed by the verb-ing form.'
      },
      {
        id: 3,
        type: 'unscramble',
        question: 'Form a future continuous plan statement using these words:',
        scrambledWords: ['I', 'will', 'be', 'traveling', 'tomorrow', 'at', 'eight', 'in', 'the', 'morning'],
        correctAnswer: 'I will be traveling tomorrow at eight in the morning',
        explanation: 'This highlights a continuous action ("will be traveling") in progress at a precise future hour.'
      },
      {
        id: 4,
        type: 'find-the-mistake',
        question: 'Identify the auxiliary mistake and correct it:',
        sentenceWords: ['I', 'will', 'being', 'working', 'on', 'the', 'slide', 'deck', 'at', 'midnight.'],
        incorrectWordIndex: 2,
        correctedWord: 'be',
        correctAnswer: 'be',
        explanation: 'The auxiliary structure for Future Continuous is "will be" followed by verb-ing, not "will being".'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'When is Future Continuous used instead of Simple Future?',
        options: [
          'To make a sudden decision in a meeting.',
          'To emphasize that a future action will be ongoing at a specific moment.',
          'To describe a routine that happens every day.',
          'To report experiences in past jobs.'
        ],
        correctAnswer: 'To emphasize that a future action will be ongoing at a specific moment.',
        explanation: 'Simple Future will is for general statements, predictions, and sudden decisions, while Future Continuous will be -ing focuses on the action\'s progress.'
      },
      {
        id: 6,
        type: 'fill-in-the-blank',
        question: 'What will you _______ doing next year at this time?',
        correctAnswer: 'be',
        explanation: 'Use "be" to complete the Future Continuous question structure: "What will you be doing...?"'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Identify the future base verb mistake and correct it:',
        sentenceWords: ['She', 'will', 'works', 'on the', 'interface', 'tomorrow', 'morning.'],
        incorrectWordIndex: 2,
        correctedWord: 'work',
        correctAnswer: 'work',
        explanation: 'After the future auxiliary "will", the verb must be in its base form ("work"), never taking "-s".'
      }
    ]
  },
  'lesson-16': {
    title: 'Future Perfect x Future Perfect Continuous',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which sentence correctly declares a completed future milestone with a specific corporate target?',
        options: [
          'By next quarter, we will have been completing the security audit.',
          'By next quarter, we will have finalized the legal audit of the acquisition.',
          'By next quarter, we are going to complete the legal audit.',
          'By next quarter, we would have completed the audit.'
        ],
        correctAnswer: 'By next quarter, we will have finalized the legal audit of the acquisition.',
        explanation: 'Use Future Perfect ("will have finalized") to state that a specific action will be completed before a certain time in the future.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'By next month, I will have _______ working here for five years.',
        correctAnswer: 'been',
        explanation: 'Future Perfect Continuous requires the auxiliary "will have been" followed by the present participle (verb-ing).'
      },
      {
        id: 3,
        type: 'unscramble',
        question: 'Form a Future Perfect milestone statement:',
        scrambledWords: ['By', '2030', 'we', 'will', 'have', 'established', 'five', 'international', 'branches'],
        correctAnswer: 'By 2030 we will have established five international branches',
        explanation: 'Future Perfect indicates that a landmark milestone will be finished or achieved before a specified future point ("By 2030").'
      },
      {
        id: 4,
        type: 'find-the-mistake',
        question: 'Identify the past participle mistake and correct it:',
        sentenceWords: ['She', 'will', 'have', 'graduates', 'in', 'Computer', 'Science', 'by', '2030.'],
        incorrectWordIndex: 3,
        correctedWord: 'graduated',
        correctAnswer: 'graduated',
        explanation: 'Future Perfect requires "will have" followed by the past participle of the main verb ("graduated").'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'What does Future Perfect Continuous emphasize in comparison to Future Perfect?',
        options: [
          'The quick completion of a single future action.',
          'The ongoing duration of an action up to a specific future point in time.',
          'A past action that cannot be changed.',
          'A daily, permanent corporate routine.'
        ],
        correctAnswer: 'The ongoing duration of an action up to a specific future point in time.',
        explanation: 'Future Perfect Continuous focuses on the length of time an ongoing activity will have lasted by a future deadline.'
      },
      {
        id: 6,
        type: 'fill-in-the-blank',
        question: 'By Q3, our regional sales team will have _______ the international territory expansion.',
        correctAnswer: 'completed',
        explanation: 'The standard past participle "completed" correctly shows the finalization of the expansion milestone in Future Perfect.'
      },
      {
        id: 7,
        type: 'find-the-mistake',
        question: 'Identify the future perfect auxiliary agreement mistake and correct it:',
        sentenceWords: ['By', 'next', 'year', 'they', 'will', 'has', 'been', 'managing', 'the', 'database', 'for', 'a', 'decade.'],
        incorrectWordIndex: 5,
        correctedWord: 'have',
        correctAnswer: 'have',
        explanation: 'After "will", the auxiliary verb must always remain in its base form "have", regardless of third-person plural or singular subjects.'
      }
    ]
  }
};

export default function PracticeExercise({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const module = moduleContent[id] || moduleContent['lesson-1'];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);
  const [selectedMistakeIndex, setSelectedMistakeIndex] = useState<number | null>(null);
  const [correctionInput, setCorrectionInput] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = module.questions[currentQuestionIndex];

  const handleSelectWord = (index: number) => {
    if (!selectedWordIndices.includes(index)) {
      setSelectedWordIndices([...selectedWordIndices, index]);
    }
  };

  const handleRemoveWord = (indexToRemove: number) => {
    setSelectedWordIndices(selectedWordIndices.filter(index => index !== indexToRemove));
  };

  const handleSubmit = () => {
    let correct = false;
    if (currentQuestion.type === 'multiple-choice') {
      correct = selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'fill-in-the-blank') {
      correct = inputValue.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    } else if (currentQuestion.type === 'unscramble') {
      const answerStr = selectedWordIndices.map(i => currentQuestion.scrambledWords![i]).join(' ');
      correct = answerStr === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'find-the-mistake') {
      correct = selectedMistakeIndex === currentQuestion.incorrectWordIndex &&
                correctionInput.trim().toLowerCase() === currentQuestion.correctedWord?.toLowerCase();
    }
    
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < module.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setInputValue('');
      setSelectedWordIndices([]);
      setSelectedMistakeIndex(null);
      setCorrectionInput('');
      setIsSubmitted(false);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
    }
  };

  const resetModule = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setInputValue('');
    setSelectedWordIndices([]);
    setSelectedMistakeIndex(null);
    setCorrectionInput('');
    setIsSubmitted(false);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
  };

  const canSubmit = () => {
    if (currentQuestion.type === 'multiple-choice') return !!selectedOption;
    if (currentQuestion.type === 'fill-in-the-blank') return !!inputValue.trim();
    if (currentQuestion.type === 'unscramble') return selectedWordIndices.length === currentQuestion.scrambledWords?.length;
    if (currentQuestion.type === 'find-the-mistake') return selectedMistakeIndex !== null && !!correctionInput.trim();
    return false;
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center py-12 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0B1120] border border-[#1E293B] rounded-3xl p-10 w-full text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-[#D97706]"></div>
          <Award className="text-[#D97706] mx-auto mb-6" size={64} />
          <h2 className="font-serif text-3xl font-bold text-white mb-2">Module Completed!</h2>
          <p className="text-gray-400 mb-8">You have successfully mastered the {module.title} concepts.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-[#0F172A] p-4 rounded-2xl border border-[#1E293B]">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 text-left">Your Score</span>
              <span className="text-3xl font-bold text-white">{Math.round((score / module.questions.length) * 100)}%</span>
            </div>
            <div className="bg-[#0F172A] p-4 rounded-2xl border border-[#1E293B]">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1 text-left">Status</span>
              <span className="text-3xl font-bold text-[#10B981]">PASSED</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1 px-8 py-4 bg-[#D97706] text-white rounded-xl font-bold hover:bg-[#B45309] transition-all flex items-center justify-center">
              Back to Dashboard
            </Link>
            <button 
              onClick={resetModule}
              className="px-8 py-4 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-[#334155] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> Try Again
            </button>
          </div>

          {/* Background Glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/dashboard" className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1E293B] transition-colors mr-4">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest block">Practice Lab</span>
          <h1 className="font-serif text-2xl font-bold text-[#F8FAFC]">{module.title}</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase mb-2">
          <span>Question {currentQuestionIndex + 1} of {module.questions.length}</span>
          <span>{Math.round(((currentQuestionIndex) / module.questions.length) * 100)}% Complete</span>
        </div>
        <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#D97706] transition-all duration-500" 
            style={{ width: `${((currentQuestionIndex) / module.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#0B1120] border border-[#1E293B] rounded-3xl p-8 shadow-xl relative"
      >
        <div className="mb-8">
          <h2 className="text-xl font-medium text-white leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Exercise Interface */}
        <div className="space-y-4">
          {currentQuestion.type === 'multiple-choice' ? (
            currentQuestion.options?.map((option, idx) => (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between group
                  ${selectedOption === option 
                    ? 'bg-[#D97706]/10 border-[#D97706] text-white' 
                    : 'bg-[#0F172A] border-[#1E293B] text-gray-400 hover:border-[#334155] hover:text-gray-200'
                  }
                  ${isSubmitted && option === currentQuestion.correctAnswer ? 'border-[#10B981] bg-[#10B981]/10 text-white' : ''}
                  ${isSubmitted && selectedOption === option && option !== currentQuestion.correctAnswer ? 'border-[#EF4444] bg-[#EF4444]/10 text-white' : ''}
                `}
              >
                <span>{option}</span>
                {isSubmitted && option === currentQuestion.correctAnswer && <CheckCircle2 className="text-[#10B981]" size={20} />}
                {isSubmitted && selectedOption === option && option !== currentQuestion.correctAnswer && <XCircle className="text-[#EF4444]" size={20} />}
              </button>
            ))
          ) : currentQuestion.type === 'fill-in-the-blank' ? (
            <div className="relative">
              <input 
                type="text"
                disabled={isSubmitted}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your answer here..."
                className={`w-full p-5 bg-[#0F172A] border rounded-2xl focus:outline-none transition-all font-medium text-white
                  ${isSubmitted 
                    ? (isCorrect ? 'border-[#10B981] bg-[#10B981]/5' : 'border-[#EF4444] bg-[#EF4444]/5')
                    : 'border-[#1E293B] focus:border-[#D97706]'
                  }
                `}
              />
              {isSubmitted && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  {isCorrect ? <CheckCircle2 className="text-[#10B981]" size={24} /> : <XCircle className="text-[#EF4444]" size={24} />}
                </div>
              )}
            </div>
          ) : currentQuestion.type === 'unscramble' ? (
            <div className="space-y-6">
              {/* Answer Slot */}
              <div className={`min-h-[80px] p-4 rounded-2xl flex flex-wrap gap-2 items-start transition-all border
                ${isSubmitted 
                    ? (isCorrect ? 'border-[#10B981] bg-[#10B981]/5' : 'border-[#EF4444] bg-[#EF4444]/5')
                    : 'border-[#334155] bg-[#0F172A]'
                }`}
              >
                {selectedWordIndices.map((wordIndex) => (
                  <button
                    key={`ans-${wordIndex}`}
                    onClick={() => !isSubmitted && handleRemoveWord(wordIndex)}
                    disabled={isSubmitted}
                    className="px-4 py-2 bg-[#D97706] text-white rounded-xl font-bold hover:bg-[#B45309] transition-all shadow-md"
                  >
                    {currentQuestion.scrambledWords![wordIndex]}
                  </button>
                ))}
                {selectedWordIndices.length === 0 && !isSubmitted && (
                  <span className="text-gray-500 italic p-2 w-full text-center mt-2">Click words below to build the sentence</span>
                )}
              </div>

              {/* Word Bank */}
              <div className="flex flex-wrap gap-3 p-4 bg-[#0B1120] rounded-2xl border border-[#1E293B] justify-center">
                {currentQuestion.scrambledWords?.map((word, idx) => {
                  const isSelected = selectedWordIndices.includes(idx);
                  return (
                    <button
                      key={`bank-${idx}`}
                      onClick={() => handleSelectWord(idx)}
                      disabled={isSelected || isSubmitted}
                      className={`px-4 py-2 rounded-xl font-bold transition-all shadow-sm
                        ${isSelected 
                          ? 'bg-[#1E293B] text-[#1E293B] border border-[#1E293B] opacity-50 cursor-not-allowed pointer-events-none' 
                          : 'bg-[#1E293B] text-gray-200 border border-[#334155] hover:border-[#D97706] hover:text-white hover:-translate-y-1'
                        }
                      `}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : currentQuestion.type === 'find-the-mistake' ? (
            <div className="space-y-6">
              <span className="text-sm text-gray-500 block text-center italic mb-4">Click the word that is incorrect</span>
              
              {/* Clickable Sentence */}
              <div className="flex flex-wrap gap-2 justify-center bg-[#0B1120] p-6 rounded-2xl border border-[#1E293B]">
                {currentQuestion.sentenceWords?.map((word, idx) => {
                  const isSelected = selectedMistakeIndex === idx;
                  const isWrongSelection = isSubmitted && isSelected && idx !== currentQuestion.incorrectWordIndex;
                  const isCorrectSelection = isSubmitted && isSelected && idx === currentQuestion.incorrectWordIndex;

                  return (
                    <button
                      key={`word-${idx}`}
                      onClick={() => !isSubmitted && setSelectedMistakeIndex(idx)}
                      disabled={isSubmitted}
                      className={`text-lg px-3 py-2 rounded-lg transition-all font-serif
                        ${isSelected && !isSubmitted ? 'bg-[#D97706] text-white shadow-md transform -translate-y-1' : ''}
                        ${!isSelected && !isSubmitted ? 'text-gray-300 hover:text-white hover:bg-[#1E293B]' : ''}
                        ${isCorrectSelection ? 'bg-[#10B981] text-white' : ''}
                        ${isWrongSelection ? 'bg-[#EF4444] text-white' : ''}
                        ${isSubmitted && !isSelected ? 'text-gray-600 opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              {/* Correction Input (Appears only after a word is selected) */}
              <AnimatePresence>
                {selectedMistakeIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mt-4"
                  >
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Type the correct word:
                    </label>
                    <input 
                      type="text"
                      disabled={isSubmitted}
                      value={correctionInput}
                      onChange={(e) => setCorrectionInput(e.target.value)}
                      placeholder={`Replace "${currentQuestion.sentenceWords![selectedMistakeIndex]}" with...`}
                      className={`w-full p-4 bg-[#0F172A] border rounded-2xl focus:outline-none transition-all font-medium text-white
                        ${isSubmitted 
                          ? (isCorrect ? 'border-[#10B981] bg-[#10B981]/5' : 'border-[#EF4444] bg-[#EF4444]/5')
                          : 'border-[#1E293B] focus:border-[#D97706]'
                        }
                      `}
                    />
                    {isSubmitted && (
                      <div className="absolute right-5 top-10">
                        {isCorrect ? <CheckCircle2 className="text-[#10B981]" size={24} /> : <XCircle className="text-[#EF4444]" size={24} />}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : null}
        </div>

        {/* Explanation & Action */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 pt-8 border-t border-[#1E293B]"
            >
              <div className="flex gap-4 mb-6">
                <div className={`p-3 rounded-xl shrink-0 ${isCorrect ? 'bg-[#10B981]/10' : 'bg-[#EF4444]/10'}`}>
                  {isCorrect ? <CheckCircle2 className="text-[#10B981]" /> : <HelpCircle className="text-[#EF4444]" />}
                </div>
                <div>
                  <h4 className={`font-bold ${isCorrect ? 'text-[#10B981]' : 'text-[#EF4444]'} mb-1`}>
                    {isCorrect ? 'Excellent!' : 'Keep Learning'}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  {!isCorrect && currentQuestion.type === 'find-the-mistake' && (
                    <p className="text-sm text-white mt-2">
                      Correct word: <span className="font-bold">{currentQuestion.correctedWord}</span>
                    </p>
                  )}
                  {!isCorrect && currentQuestion.type !== 'find-the-mistake' && (
                    <p className="text-sm text-white mt-2">
                      Correct answer: <span className="font-bold">{currentQuestion.correctAnswer}</span>
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-white text-[#0F172A] rounded-xl font-bold flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                {currentQuestionIndex < module.questions.length - 1 ? 'Next Question' : 'Finish Module'}
                <ChevronRight className="ml-2" size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Initial Submit Button */}
        {!isSubmitted && (
          <div className="mt-8">
            <button
              disabled={!canSubmit()}
              onClick={handleSubmit}
              className={`w-full py-4 rounded-xl font-bold transition-all
                ${canSubmit()
                  ? 'bg-[#D97706] text-white hover:bg-[#B45309]'
                  : 'bg-[#1E293B] text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Check Answer
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
