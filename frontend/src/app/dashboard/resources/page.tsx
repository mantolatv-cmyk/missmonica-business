'use client';

import React, { useState } from 'react';
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
  Info
} from 'lucide-react';

interface Template {
  id: string;
  category: string;
  title: string;
  subject: string;
  body: string;
  tip: string;
}

const templates: Template[] = [
  {
    id: '1',
    category: 'Meetings',
    title: 'Scheduling a Meeting',
    subject: 'Request for Meeting: [Project Name] Discussion',
    body: `Hi [Name],

I hope this email finds you well.

I would like to schedule a brief meeting to discuss the progress of [Project Name] and align on our next steps.

Are you available for a 30-minute call at any of the following times?
- [Date] at [Time]
- [Date] at [Time]

Please let me know which works best for you, or feel free to suggest an alternative.

Best regards,
[Your Name]`,
    tip: "Always provide at least two specific time options to make it easier for the recipient to say yes."
  },
  {
    id: '2',
    category: 'Follow-up',
    title: 'Post-Meeting Follow-up',
    subject: 'Follow-up: [Meeting Title] / Action Items',
    body: `Hi [Name],

Thank you for your time today. It was great catching up and discussing [Main Topic].

As agreed, here are the key takeaways and action items from our call:
- [Action Item 1] (Owner: [Name])
- [Action Item 2] (Owner: [Name])

I'll keep you posted on the progress. Looking forward to our next steps.

Best regards,
[Your Name]`,
    tip: "Send follow-up emails within 24 hours while the conversation is still fresh in everyone's mind."
  },
  {
    id: '3',
    category: 'Networking',
    title: 'Networking Reach-out',
    subject: 'Great meeting you at [Event Name]',
    body: `Hi [Name],

It was a pleasure meeting you at [Event Name] today. I really enjoyed our conversation about [Topic].

I would love to stay in touch and perhaps find a way to collaborate in the future. Let's connect on LinkedIn if we haven't already.

Looking forward to crossing paths again soon.

Best,
[Your Name]`,
    tip: "Mention a specific detail from your conversation to show that you were genuinely engaged."
  },
  {
    id: '4',
    category: 'Requests',
    title: 'Asking for Feedback',
    subject: 'Feedback Request: [Document/Project Name]',
    body: `Hi [Name],

I've just finished the first draft of [Document/Project Name] and would greatly appreciate your feedback.

Specifically, I'm looking for your thoughts on:
- [Specific Point 1]
- [Specific Point 2]

Could you please let me know your thoughts by [Date]?

Thank you in advance for your time and insights.

Best regards,
[Your Name]`,
    tip: "Be specific about what kind of feedback you need to get more actionable responses."
  }
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const filteredTemplates = templates.filter(t => 
    (selectedCategory ? t.category === selectedCategory : true) &&
    (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.body.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-3 text-[#D97706]">
          <Sparkles size={20} />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Executive Toolbox</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-white mb-4">Email Templates & Resources</h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          Access a curated collection of professional email templates designed for high-stakes business communication. 
          Copy, adapt, and send with confidence.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search templates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[#0B1120] border border-[#1E293B] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#D97706] text-white placeholder-gray-600 transition-all shadow-xl"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${!selectedCategory ? 'bg-[#D97706] text-white border-[#D97706]' : 'bg-[#0B1120] text-gray-500 border-[#1E293B] hover:text-white'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-[#D97706] text-white border-[#D97706]' : 'bg-[#0B1120] text-gray-500 border-[#1E293B] hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0B1120] border border-[#1E293B] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row group hover:border-[#D97706]/30 transition-all"
            >
              {/* Content Side */}
              <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#D97706]/10 text-[#D97706] rounded-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#D97706] uppercase tracking-widest block">{template.category}</span>
                    <h2 className="text-xl font-bold text-white">{template.title}</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#0F172A] rounded-xl p-4 border border-[#1E293B]">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Subject Line</span>
                    <p className="text-sm text-gray-300 font-medium">{template.subject}</p>
                  </div>
                  <div className="bg-[#0F172A] rounded-xl p-6 border border-[#1E293B] relative group/body">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-4">Email Body</span>
                    <pre className="text-sm text-gray-400 font-sans whitespace-pre-wrap leading-relaxed">
                      {template.body}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Sidebar/Actions Side */}
              <div className="lg:w-80 bg-[#0F172A] border-t lg:border-t-0 lg:border-l border-[#1E293B] p-8 flex flex-col">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3 text-[#D97706]">
                    <Info size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Pro Tip</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed italic">
                    "{template.tip}"
                  </p>
                </div>

                <div className="mt-auto space-y-3">
                  <button 
                    onClick={() => copyToClipboard(template.subject + "\n\n" + template.body, template.id)}
                    className="w-full py-4 bg-[#D97706] text-white rounded-xl font-bold text-sm hover:bg-[#B45309] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D97706]/10"
                  >
                    {copiedId === template.id ? <Check size={18} /> : <Copy size={18} />}
                    {copiedId === template.id ? 'Copied!' : 'Copy Template'}
                  </button>
                  <button className="w-full py-4 bg-[#1E293B] text-gray-400 border border-[#334155] rounded-xl font-bold text-sm hover:text-white hover:border-white transition-all flex items-center justify-center gap-2">
                    Open in Mail
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTemplates.length === 0 && (
        <div className="py-20 text-center">
          <Mail size={48} className="text-gray-700 mx-auto mb-4 opacity-20" />
          <p className="text-gray-500 font-serif text-xl italic">No templates match your search.</p>
        </div>
      )}
    </div>
  );
}
