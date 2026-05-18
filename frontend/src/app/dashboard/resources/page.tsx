'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Copy, 
  Check, 
  Briefcase, 
  Clock, 
  Calendar, 
  Users, 
  FileText,
  Search,
  Sparkles,
  ChevronRight,
  Info,
  Sliders,
  AlertCircle
} from 'lucide-react';

interface Placeholder {
  key: string;
  label: string;
  defaultValue: string;
}

interface Template {
  id: string;
  category: 'Meetings' | 'Follow-up' | 'Networking' | 'Requests' | 'Negotiation' | 'Crisis';
  title: string;
  subject: string;
  body: string;
  tip: string;
  difficulty: 'Intermediate' | 'Advanced';
  targetVocab: string[];
  placeholders: Placeholder[];
}

const templates: Template[] = [
  {
    id: '1',
    category: 'Meetings',
    title: 'Scheduling a Meeting',
    difficulty: 'Intermediate',
    subject: 'Request for Meeting: [Project Name] Discussion',
    body: `Hi [Recipient Name],

I hope this email finds you well.

I would like to schedule a brief meeting to discuss the progress of [Project Name] and align on our next steps.

Are you available for a 30-minute call at any of the following times?
- [Option 1 Date & Time]
- [Option 2 Date & Time]

Please let me know which works best for you, or feel free to suggest an alternative.

Best regards,

[Sender Name]
[Sender Role]`,
    tip: "Always provide at least two specific time options to make it easier for the recipient to say yes without extensive back-and-forth.",
    targetVocab: ['Schedule a brief meeting', 'Align on', 'Next steps', 'Suggest an alternative'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'John Watson' },
      { key: '[Project Name]', label: 'Project Name', defaultValue: 'Monica Cloud Integration' },
      { key: '[Option 1 Date & Time]', label: 'Option 1 Time', defaultValue: 'Monday at 10:00 AM EST' },
      { key: '[Option 2 Date & Time]', label: 'Option 2 Time', defaultValue: 'Tuesday at 2:00 PM EST' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'Technical Lead' }
    ]
  },
  {
    id: '2',
    category: 'Follow-up',
    title: 'Post-Meeting Action Items',
    difficulty: 'Intermediate',
    subject: 'Follow-up: [Meeting Title] / Action Items',
    body: `Hi [Recipient Name],

Thank you for your time today. It was great catching up and discussing [Main Topic].

As agreed, here are the key takeaways and action items from our call:
- [Action Item 1] (Owner: [Owner 1])
- [Action Item 2] (Owner: [Owner 2])

I'll keep you posted on our progress. Looking forward to our next steps.

Best regards,

[Sender Name]
[Sender Role]`,
    tip: "Send follow-up emails within 24 hours while the conversation is still fresh in everyone's mind.",
    targetVocab: ['Key takeaways', 'Action items', 'Keep you posted', 'Next steps'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'Sarah Jenkins' },
      { key: '[Meeting Title]', label: 'Meeting Title', defaultValue: 'Sprint Planning Sync' },
      { key: '[Main Topic]', label: 'Main Topic Discussed', defaultValue: 'next week\'s backend deployment' },
      { key: '[Action Item 1]', label: 'Action Item 1', defaultValue: 'Finalize Postgres DB index configurations' },
      { key: '[Owner 1]', label: 'Owner 1', defaultValue: 'Julian' },
      { key: '[Action Item 2]', label: 'Action Item 2', defaultValue: 'Review security compliance checklist' },
      { key: '[Owner 2]', label: 'Owner 2', defaultValue: 'Alex' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'Project Lead' }
    ]
  },
  {
    id: '3',
    category: 'Networking',
    title: 'Networking Reach-out',
    difficulty: 'Intermediate',
    subject: 'Great meeting you at [Event Name]',
    body: `Hi [Recipient Name],

It was a pleasure meeting you at [Event Name] today. I really enjoyed our conversation about [Topic].

I would love to stay in touch and perhaps find a way to collaborate in the future. Let's connect on LinkedIn if we haven't already.

Looking forward to crossing paths again soon.

Best,

[Sender Name]`,
    tip: "Mention a specific detail from your conversation to show that you were genuinely engaged and build a stronger rapport.",
    targetVocab: ['Pleasure meeting you', 'Stay in touch', 'Find a way to collaborate', 'Crossing paths soon'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'Mr. Henderson' },
      { key: '[Event Name]', label: 'Event Name', defaultValue: 'SaaS Innovate 2026' },
      { key: '[Topic]', label: 'Topic Discussed', defaultValue: 'AI automated code refactoring' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' }
    ]
  },
  {
    id: '4',
    category: 'Requests',
    title: 'Asking for Feedback',
    difficulty: 'Intermediate',
    subject: 'Feedback Request: [Document/Project Name]',
    body: `Hi [Recipient Name],

I hope you are having a productive week.

I've just finished the first draft of [Document/Project Name] and would greatly appreciate your feedback.

Specifically, I'm looking for your thoughts on:
- [Specific Point 1]
- [Specific Point 2]

Could you please let me know your thoughts by [Date]?

Thank you in advance for your time and insights.

Best regards,

[Sender Name]
[Sender Role]`,
    tip: "Be specific about what kind of feedback you need. Providing bullet points makes it much easier for the recipient to provide actionable responses.",
    targetVocab: ['First draft', 'Greatly appreciate', 'Actionable thoughts', 'Thank you in advance'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'David Miller' },
      { key: '[Document/Project Name]', label: 'Project Name', defaultValue: 'Monica Business Architecture Dossier' },
      { key: '[Specific Point 1]', label: 'Specific Point 1', defaultValue: 'The Prisma database schemas relation complexity' },
      { key: '[Specific Point 2]', label: 'Specific Point 2', defaultValue: 'The dark-mode styling tokens consistency' },
      { key: '[Date]', label: 'Feedback Deadline', defaultValue: 'Friday noon' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'Technical Lead' }
    ]
  },
  {
    id: '5',
    category: 'Negotiation',
    title: 'Polite Rate Adjustment Request',
    difficulty: 'Advanced',
    subject: 'Rate adjustment request: [Project Name]',
    body: `Dear [Recipient Name],

I hope this email finds you well.

As we prepare our financial roadmap for [Time Frame], I would like to initiate a brief conversation regarding our current contract terms. Over the last [Duration], we have significantly expanded our collaboration on [Project Name] and delivered exceptional results.

To maintain this high level of operational excellence and accommodate rising overhead costs, we would appreciate it if we could adjust our baseline rate to [New Rate]. 

I would love to set up a quick 10-minute call next week to discuss how we can continue to create mutual value. Please let me know your availability.

Best regards,

[Sender Name]
[Sender Role]`,
    tip: "When requesting a rate increase, lead with the value and results you have already delivered. Always use soft diplomatic phrasing like 'we would appreciate it if we could' rather than direct demands like 'we need to adjust'.",
    targetVocab: ['Financial roadmap', 'Baseline rate', 'Mutual value', 'Overhead costs'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'John Watson' },
      { key: '[Time Frame]', label: 'Time Frame (e.g. Q3/Q4)', defaultValue: 'Q4' },
      { key: '[Duration]', label: 'Duration of work', defaultValue: '6 months' },
      { key: '[Project Name]', label: 'Project Name', defaultValue: 'Monica Cloud Sync' },
      { key: '[New Rate]', label: 'New Rate (e.g. $75/hr)', defaultValue: '$85/hr' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'Lead Developer' }
    ]
  },
  {
    id: '6',
    category: 'Negotiation',
    title: 'Price Increase Pushback',
    difficulty: 'Advanced',
    subject: 'Feedback regarding the proposed rate adjustment - [Your Company]',
    body: `Dear [Recipient Name],

Thank you for sending over the updated proposal. I appreciate the detailed breakdown of the new fee structure.

While I completely understand that market factors are driving these changes, a [Proposed Increase]% increase poses a significant challenge to our current Q4 budget. We highly value our partnership and would like to find a middle ground that works for both of our firms.

Would it be possible to transition to the new rate in phases, or perhaps cap the increase at [Alternative Increase]% for the remaining months of [Year]?

Let's schedule a brief follow-up call on [Date] to align on this. Thank you for your flexibility and understanding.

Warm regards,

[Sender Name]
[Sender Role]`,
    tip: "Acknowledge their perspective first ('I completely understand...'). Then, clearly state your budgetary constraint and propose a constructive, collaborative alternative (such as phased adjustment or a capped increase) to show your goodwill.",
    targetVocab: ['Fee structure', 'Middle ground', 'Cap the increase', 'Phases'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'Sarah Jenkins' },
      { key: '[Your Company]', label: 'Your Company', defaultValue: 'TechCorp' },
      { key: '[Proposed Increase]', label: 'Proposed Increase %', defaultValue: '15' },
      { key: '[Alternative Increase]', label: 'Alternative Increase %', defaultValue: '8' },
      { key: '[Year]', label: 'Year', defaultValue: '2026' },
      { key: '[Date]', label: 'Call Date', defaultValue: 'Thursday morning' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'Procurement Director' }
    ]
  },
  {
    id: '7',
    category: 'Follow-up',
    title: 'Post-Meeting Action Board',
    difficulty: 'Advanced',
    subject: 'Action Items & Follow-up: [Meeting Topic]',
    body: `Hi [Recipient Name],

Great catching up during our alignment call today. I am very excited about the direction we are taking on [Project Name].

To ensure we are all on the same page, here is a quick summary of the key action items and deadlines we discussed:
- [Action Item 1] (Owner: [Owner 1], Deadline: [Deadline 1])
- [Action Item 2] (Owner: [Owner 2], Deadline: [Deadline 2])

Please review these points and let me know if anything needs to be updated. I will follow up with the design team shortly regarding the assets.

Best regards,

[Sender Name]
[Sender Role]`,
    tip: "Sending a summary email immediately after a meeting shows exceptional leadership, prevents misunderstandings, and establishes clear accountability in international remote teams.",
    targetVocab: ['Action items', 'On the same page', 'Alignment call', 'Follow up shortly'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'Team' },
      { key: '[Meeting Topic]', label: 'Meeting Topic', defaultValue: 'Sprint Alignment' },
      { key: '[Project Name]', label: 'Project Name', defaultValue: 'Monica Business English MVP' },
      { key: '[Action Item 1]', label: 'Action Item 1', defaultValue: 'Finalize Tailwind v4 theme styling' },
      { key: '[Owner 1]', label: 'Owner 1', defaultValue: 'Julian' },
      { key: '[Deadline 1]', label: 'Deadline 1', defaultValue: 'Wednesday' },
      { key: '[Action Item 2]', label: 'Action Item 2', defaultValue: 'Review database indexes for PostgreSQL' },
      { key: '[Owner 2]', label: 'Owner 2', defaultValue: 'Alex' },
      { key: '[Deadline 2]', label: 'Deadline 2', defaultValue: 'Friday' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'Project Manager' }
    ]
  },
  {
    id: '8',
    category: 'Follow-up',
    title: 'Gentle Feedback Follow-Up',
    difficulty: 'Intermediate',
    subject: 'Follow-up: Feedback needed for [Project Name]',
    body: `Dear [Recipient Name],

I hope you are having a productive week.

I am writing to follow up on the [Asset/Document Name] I sent over on [Date]. As our primary deadline of [Final Deadline] is approaching, having your input shortly is critical for us to move to the next phase of the backend integration.

Could you please share your thoughts or confirm if the current layout works for your team? If you need more time, just let me know so we can adjust our roadmap accordingly.

Thank you for your support.

Best,

[Sender Name]
[Sender Role]`,
    tip: "Frame the urgency of the feedback around the project schedule ('As our primary deadline... is approaching') rather than personal convenience. This creates polite professional pressure.",
    targetVocab: ['Pending feedback', 'Backend integration', 'Roadmap', 'Input shortly'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'Mr. Henderson' },
      { key: '[Project Name]', label: 'Project Name', defaultValue: 'Monica Business API' },
      { key: '[Asset/Document Name]', label: 'Document Name', defaultValue: 'Prisma DB Schema proposal' },
      { key: '[Date]', label: 'Date Sent', defaultValue: 'last Monday' },
      { key: '[Final Deadline]', label: 'Final Deadline', defaultValue: 'May 30th' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'Technical Lead' }
    ]
  },
  {
    id: '9',
    category: 'Crisis',
    title: 'Urgent Meeting Reschedule',
    difficulty: 'Intermediate',
    subject: 'Rescheduling request: [Meeting Topic] - [Your Company]',
    body: `Dear [Recipient Name],

Please accept my apologies, but an urgent and unavoidable conflict has arisen in my schedule for our meeting on [Original Date]. 

Because I want to ensure we have uninterrupted time to align on [Meeting Topic], I would appreciate it if we could reschedule our session. Would any of the following options work for you next week?
- Option 1: [Option 1 Date & Time]
- Option 2: [Option 2 Date & Time]

I apologize for any inconvenience this may cause and appreciate your flexibility.

Sincerely,

[Sender Name]
[Sender Role]`,
    tip: "Reschedule meetings with high politeness. Apologize sincerely but concisely, avoid giving overly personal details about the schedule conflict, and immediately propose 2-3 specific alternative time slots.",
    targetVocab: ['Unavoidable conflict', 'Inconvenience', 'Flexibility', 'Align on'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'Clara Oswald' },
      { key: '[Meeting Topic]', label: 'Meeting Topic', defaultValue: 'Executive Q3 Review' },
      { key: '[Your Company]', label: 'Your Company Name', defaultValue: 'Monica Business LLC' },
      { key: '[Original Date]', label: 'Original Date & Time', defaultValue: 'Monday at 10 AM' },
      { key: '[Option 1 Date & Time]', label: 'Alternative Option 1', defaultValue: 'Tuesday at 2 PM' },
      { key: '[Option 2 Date & Time]', label: 'Alternative Option 2', defaultValue: 'Wednesday at 11 AM' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'CEO & Founder' }
    ]
  },
  {
    id: '10',
    category: 'Crisis',
    title: 'Apology for Project Oversight',
    difficulty: 'Advanced',
    subject: 'Update regarding [Issue Topic] - [Your Company]',
    body: `Dear [Recipient Name],

I am writing to address the recent oversight regarding [Issue Description]. I sincerely apologize for the delay and any disruption this has caused to your team's workflow.

We take full responsibility for this error. To rectify the situation immediately, we have [Action Taken to Fix]. We are also reviewing our internal quality control processes to ensure this does not happen again.

Please let me know if you would like to hop on a quick call today to discuss this in detail. I will share another update with you by [Next Update Date].

Thank you for your patience and ongoing partnership.

Warm regards,

[Sender Name]
[Sender Role]`,
    tip: "When apologizing for an error, take full responsibility immediately without making excuses. Focus the email on the specific action taken to rectify the issue and how you will prevent it from happening again.",
    targetVocab: ['Address the oversight', 'Rectify the situation', 'Disruption', 'Take full responsibility'],
    placeholders: [
      { key: '[Recipient Name]', label: 'Recipient Name', defaultValue: 'Director Thompson' },
      { key: '[Issue Topic]', label: 'Issue Topic', defaultValue: 'API Downtime' },
      { key: '[Your Company]', label: 'Your Company Name', defaultValue: 'Monica Business B2B' },
      { key: '[Issue Description]', label: 'Issue Description', defaultValue: 'the brief downtime in our development sandbox server' },
      { key: '[Action Taken to Fix]', label: 'Action to Rectify', defaultValue: 'deployed database patches and redundant instances' },
      { key: '[Next Update Date]', label: 'Next Update Date', defaultValue: 'tomorrow at noon' },
      { key: '[Sender Name]', label: 'Your Name', defaultValue: 'Alex Mercer' },
      { key: '[Sender Role]', label: 'Your Role', defaultValue: 'VP of Infrastructure' }
    ]
  }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);

  const categories = Array.from(new Set(templates.map(t => t.category)));

  // Initialize placeholder values for the selected template
  useEffect(() => {
    const initialInputs: Record<string, string> = {};
    selectedTemplate.placeholders.forEach(placeholder => {
      initialInputs[placeholder.key] = placeholder.defaultValue;
    });
    setInputs(initialInputs);
    setCopiedSubject(false);
    setCopiedBody(false);
    setCopiedFull(false);
  }, [selectedTemplate]);

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = !selectedCategory || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.body.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProcessedText = (text: string) => {
    let processed = text;
    Object.entries(inputs).forEach(([key, value]) => {
      const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      processed = processed.replace(new RegExp(escapedKey, 'g'), value || key);
    });
    return processed;
  };

  const processedSubject = getProcessedText(selectedTemplate.subject);
  const processedBody = getProcessedText(selectedTemplate.body);

  const handleCopySubject = async () => {
    try {
      await navigator.clipboard.writeText(processedSubject);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch (err) {
      console.error('Failed to copy subject: ', err);
    }
  };

  const handleCopyBody = async () => {
    try {
      await navigator.clipboard.writeText(processedBody);
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    } catch (err) {
      console.error('Failed to copy body: ', err);
    }
  };

  const handleCopyFull = async () => {
    try {
      const fullText = `Subject: ${processedSubject}\n\n${processedBody}`;
      await navigator.clipboard.writeText(fullText);
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2000);
    } catch (err) {
      console.error('Failed to copy full template: ', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Header Section */}
      <header className="mb-12 border-b border-[#1E293B] pb-8">
        <div className="flex items-center gap-2 mb-3 text-[#D97706]">
          <Sparkles size={20} className="neon-text" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Executive Toolbox</span>
        </div>
        <h1 className="font-serif text-5xl font-bold text-white mb-4 tracking-tight">
          Email Templates & Resources
        </h1>
        <p className="text-gray-400 max-w-3xl leading-relaxed text-sm">
          Access a curated collection of high-impact professional email templates designed for high-stakes business communication. 
          Use the interactive variables to customize text details in real-time, review strategic etiquette guidelines, and copy clean formats.
        </p>
      </header>

      {/* Filter and Search controls */}
      <div className="flex flex-col xl:flex-row gap-6 mb-10">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search email templates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-[#0B1120] border border-[#1E293B] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#D97706] focus:border-transparent text-sm text-white placeholder-gray-600 transition-all shadow-xl"
          />
        </div>
        
        {/* Categories Tab Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 xl:pb-0 no-scrollbar select-none">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              !selectedCategory 
                ? 'bg-[#D97706]/10 border-[#D97706] text-[#D97706] shadow-[0_0_10px_rgba(217,119,6,0.1)]' 
                : 'bg-[#0B1120] text-gray-400 border-[#1E293B] hover:text-white hover:border-[#334155]'
            }`}
          >
            All Templates
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat 
                  ? 'bg-[#D97706]/10 border-[#D97706] text-[#D97706] shadow-[0_0_10px_rgba(217,119,6,0.1)]' 
                  : 'bg-[#0B1120] text-gray-400 border-[#1E293B] hover:text-white hover:border-[#334155]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: list of templates (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 max-h-[750px] overflow-y-auto pr-2">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => {
              const isSelected = selectedTemplate.id === template.id;
              return (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-5 md:p-6 rounded-2xl cursor-pointer border transition-all relative flex flex-col justify-between gap-3 h-auto ${
                    isSelected 
                      ? 'bg-[#0B1120] border-[#D97706] shadow-[0_0_15px_rgba(217,119,6,0.15)]' 
                      : 'bg-[#0B1120] border-[#1E293B] hover:border-[#334155]'
                  }`}
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {template.category}
                      </span>
                      
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border tracking-tight ${
                        template.difficulty === 'Advanced' 
                          ? 'text-[#D97706] border-[#D97706]/40 bg-[#D97706]/10' 
                          : 'text-[#10B981] border-[#10B981]/40 bg-[#10B981]/10'
                      }`}>
                        {template.difficulty}
                      </span>
                    </div>

                    <h3 className={`font-serif text-base sm:text-lg font-bold leading-snug transition-colors ${
                      isSelected ? 'text-[#D97706]' : 'text-white'
                    }`}>
                      {template.title}
                    </h3>

                    <p className="font-sans text-xs text-gray-400 line-clamp-1 leading-relaxed">
                      Subject: {template.subject.replace(/\[.*?\]/g, '___')}
                    </p>
                  </div>

                  <div className="mt-2 flex gap-1.5 flex-wrap">
                    {template.targetVocab.slice(0, 2).map((vocab, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 bg-[#0F172A] border border-[#1E293B] rounded text-gray-400 font-medium">
                        {vocab}
                      </span>
                    ))}
                    {template.targetVocab.length > 2 && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#0F172A] text-gray-500">
                        +{template.targetVocab.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  {/* Active Indicator Glow */}
                  {isSelected && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#D97706] shadow-[0_0_10px_#D97706]" />
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="bg-[#0B1120] border border-[#1E293B] rounded-2xl p-10 text-center">
              <Mail size={36} className="text-gray-600 mx-auto mb-3 opacity-30" />
              <p className="text-sm text-gray-400">No templates found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Right column: Interactive editor and workspace (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[#0B1120] border border-[#1E293B] rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97706] rounded-full blur-3xl opacity-5 pointer-events-none -mr-32 -mt-32"></div>

            {/* Template Header info */}
            <div className="flex flex-col gap-2 relative z-10 border-b border-[#1E293B] pb-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-[#D97706] uppercase tracking-widest">{selectedTemplate.category} Template</span>
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border tracking-tight ${
                  selectedTemplate.difficulty === 'Advanced' 
                    ? 'text-[#D97706] border-[#D97706]/40 bg-[#D97706]/10' 
                    : 'text-[#10B981] border-[#10B981]/40 bg-[#10B981]/10'
                }`}>
                  {selectedTemplate.difficulty} Level
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                {selectedTemplate.title}
              </h2>
            </div>

            {/* Placeholder Form inputs */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 flex flex-col gap-4">
              <h3 className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                <Sliders size={14} className="text-[#D97706] mr-2" /> Live Form Variables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedTemplate.placeholders.map(placeholder => (
                  <div key={placeholder.key} className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
                      {placeholder.label}
                    </label>
                    <input
                      type="text"
                      placeholder={placeholder.defaultValue}
                      value={inputs[placeholder.key] || ''}
                      onChange={(e) => handleInputChange(placeholder.key, e.target.value)}
                      className="px-3.5 py-2 bg-[#0B1120] border border-[#1E293B] focus:border-[#D97706]/60 rounded-xl text-xs focus:outline-none transition-all text-[#F8FAFC]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Live Previews */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Live Document Preview</span>
              
              {/* Subject Line Row */}
              <div className="flex flex-col gap-1 border border-[#1E293B] bg-[#0F172A] rounded-xl p-4 relative overflow-hidden group">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Subject Line</span>
                <p className="text-sm font-semibold text-[#F8FAFC] leading-relaxed break-words pr-12">
                  {processedSubject}
                </p>
                <button
                  onClick={handleCopySubject}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#0B1120] border border-[#1E293B] text-gray-400 hover:text-white rounded-lg hover:border-gray-700 transition-all flex items-center justify-center"
                  title="Copy Subject"
                >
                  {copiedSubject ? (
                    <Check size={14} className="text-[#10B981]" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>

              {/* Email Body Previews */}
              <div className="flex flex-col gap-2 border border-[#1E293B] bg-[#0F172A] rounded-xl p-6 relative overflow-hidden group min-h-[300px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Email Body</span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyBody}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1120] border border-[#1E293B] text-gray-400 hover:text-white rounded-lg hover:border-gray-700 text-[10px] font-bold uppercase tracking-wider transition-all"
                    >
                      {copiedBody ? (
                        <>
                          <Check size={12} className="text-[#10B981]" /> Copied Body
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy Body
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleCopyFull}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D97706]/10 border border-[#D97706]/30 text-[#D97706] hover:bg-[#D97706]/20 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                    >
                      {copiedFull ? (
                        <>
                          <Check size={12} className="text-[#10B981]" /> Full Copied
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy Full Email
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="font-sans text-xs text-gray-300 leading-relaxed whitespace-pre-wrap select-text selection:bg-[#D97706]/30 break-words flex-1">
                  {processedBody}
                </pre>
              </div>
            </div>

            {/* Target Vocabulary */}
            <div className="bg-[#0F172A]/50 border border-[#1E293B] rounded-2xl p-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Target Vocabulary</span>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.targetVocab.map((vocab, i) => (
                  <span key={i} className="px-3 py-1 bg-[#0F172A] border border-[#1E293B] rounded-lg text-xs text-[#D97706] font-semibold">
                    {vocab}
                  </span>
                ))}
              </div>
            </div>

            {/* Pro Etiquette tip */}
            <div className="bg-[#D97706]/5 border border-[#D97706]/20 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#D97706]/10 flex items-center justify-center text-[#D97706] shrink-0 mt-0.5">
                <Info size={16} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider">Executive Etiquette Tip</h4>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  "{selectedTemplate.tip}"
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
