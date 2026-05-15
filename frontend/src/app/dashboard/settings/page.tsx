'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  Mail,
  ChevronRight,
  Smartphone,
  Lock,
  Volume2
} from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true
  });

  const sections = [
    {
      id: 'profile',
      icon: <User size={20} />,
      title: 'Profile Settings',
      description: 'Manage your public information and branding.',
      items: [
        { label: 'Display Name', value: 'Monica Executive', type: 'text' },
        { label: 'Email Address', value: 'monica@business.com', type: 'text' },
        { label: 'Bio', value: 'Senior Business English Student', type: 'text' }
      ]
    },
    {
      id: 'notifications',
      icon: <Bell size={20} />,
      title: 'Notifications',
      description: 'Configure how you receive updates and alerts.',
      items: [
        { label: 'Email Notifications', enabled: notifications.email, id: 'email' },
        { label: 'Push Notifications', enabled: notifications.push, id: 'push' },
        { label: 'Product Updates', enabled: notifications.updates, id: 'updates' }
      ]
    },
    {
      id: 'appearance',
      icon: <Moon size={20} />,
      title: 'Appearance',
      description: 'Customize the visual experience of your dashboard.',
      items: [
        { label: 'Dark Mode', enabled: theme === 'dark', id: 'theme' },
        { label: 'Compact View', enabled: false, id: 'compact' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and dashboard configuration.</p>
      </header>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <motion.section 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0B1120] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-[#1E293B] bg-[#0F172A]/50 flex items-center gap-4">
              <div className="p-3 bg-[#D97706]/10 text-[#D97706] rounded-xl">
                {section.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>

            <div className="divide-y divide-[#1E293B]">
              {section.items.map((item, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-[#1E293B]/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-300">{item.label}</span>
                    {'value' in item && <span className="text-xs text-gray-500 mt-1">{item.value}</span>}
                  </div>

                  {'enabled' in item ? (
                    <button 
                      onClick={() => {
                        if (item.id === 'theme') setTheme(theme === 'dark' ? 'light' : 'dark');
                        else setNotifications({...notifications, [item.id as string]: !item.enabled});
                      }}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${item.enabled ? 'bg-[#D97706]' : 'bg-gray-700'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  ) : (
                    <button className="p-2 text-gray-500 hover:text-[#D97706] transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="mt-12 p-6 bg-[#D97706]/5 border border-[#D97706]/20 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Shield className="text-[#D97706]" size={24} />
          <div>
            <h3 className="text-white font-bold">Security Center</h3>
            <p className="text-xs text-gray-400">Protect your account with two-factor authentication.</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-[#D97706] text-white rounded-xl font-bold text-sm hover:bg-[#B45309] transition-all">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}
