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
  type: 'multiple-choice' | 'fill-in-the-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

const moduleContent: Record<string, { title: string, questions: Question[] }> = {
  'grammar-1': {
    title: 'Polite Requests',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Which of these is the most polite way to ask a colleague for a report?',
        options: [
          'Send me the report now.',
          'I need the report by 5 PM.',
          'I was wondering if you could send me the report by 5 PM?',
          'Can you send the report?'
        ],
        correctAnswer: 'I was wondering if you could send me the report by 5 PM?',
        explanation: '"I was wondering if you could..." is a standard indirect and very polite way to make a request in business contexts.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'Would you _______ checking the schedule for next week?',
        correctAnswer: 'mind',
        explanation: '"Would you mind + [verb-ing]" is a common structure for polite requests.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'How would you politely disagree with a suggestion in a meeting?',
        options: [
          'That is a bad idea.',
          'I see your point, but I have some concerns about the timeline.',
          'No, we cannot do that.',
          'I disagree entirely.'
        ],
        correctAnswer: 'I see your point, but I have some concerns about the timeline.',
        explanation: 'Acknowledging the other person\'s perspective before disagreeing is a key part of professional diplomacy.'
      }
    ]
  },
  'vocab-1': {
    title: 'Corporate Idioms',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What does it mean to "touch base" with someone?',
        options: [
          'To hit them with a ball.',
          'To contact them briefly to discuss something.',
          'To physically meet at a specific base.',
          'To finish a project.'
        ],
        correctAnswer: 'To contact them briefly to discuss something.',
        explanation: '"Touch base" is a very common idiom meaning to make contact or get an update.'
      },
      {
        id: 2,
        type: 'fill-in-the-blank',
        question: 'We need to think outside the _______ to find a creative solution.',
        correctAnswer: 'box',
        explanation: '"Thinking outside the box" means thinking creatively or unconventionally.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'If everyone is "on the same page", it means:',
        options: [
          'Everyone is reading the same book.',
          'Everyone is working in the same office.',
          'Everyone has the same understanding or agreement.',
          'Everyone is writing on the same document.'
        ],
        correctAnswer: 'Everyone has the same understanding or agreement.',
        explanation: 'Being "on the same page" ensures alignment and common understanding in a team.'
      }
    ]
  }
};

export default function PracticeExercise({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const module = moduleContent[id] || moduleContent['grammar-1'];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = module.questions[currentQuestionIndex];

  const handleSubmit = () => {
    let correct = false;
    if (currentQuestion.type === 'multiple-choice') {
      correct = selectedOption === currentQuestion.correctAnswer;
    } else {
      correct = inputValue.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
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
    setIsSubmitted(false);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
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
            <Link href="/dashboard/practice" className="flex-1 px-8 py-4 bg-[#D97706] text-white rounded-xl font-bold hover:bg-[#B45309] transition-all flex items-center justify-center">
              Back to Lab
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
        <Link href="/dashboard/practice" className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#1E293B] transition-colors mr-4">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-widest block">Practice Module</span>
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
          ) : (
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
          )}
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
                  {!isCorrect && (
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
              disabled={currentQuestion.type === 'multiple-choice' ? !selectedOption : !inputValue.trim()}
              onClick={handleSubmit}
              className={`w-full py-4 rounded-xl font-bold transition-all
                ${(currentQuestion.type === 'multiple-choice' ? selectedOption : inputValue.trim())
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
