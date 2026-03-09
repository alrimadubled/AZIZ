import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Composer } from './components/Composer';
import { Analytics } from './components/Analytics';
import { Trends } from './components/Trends';
import { Schedule } from './components/Schedule';
import { Insights } from './components/Insights';
import { MediaLibrary } from './components/MediaLibrary';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Analytics />;
      case 'composer':
        return <Composer />;
      case 'schedule':
        return <Schedule />;
      case 'analytics':
        return <Analytics />;
      case 'trends':
        return <Trends />;
      case 'insights':
        return <Insights />;
      case 'media':
        return <MediaLibrary />;
      case 'settings':
        return (
          <div className="p-12 max-w-2xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)]">Settings</h2>
            <div className="space-y-6 bg-[var(--color-surface)] p-8 rounded-3xl border border-border card-shadow">
              <div className="space-y-4">
                <h3 className="font-bold text-[var(--text-main)]">Twitter/X API Configuration</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase">API Key</label>
                  <input type="password" value="••••••••••••••••" readOnly className="w-full px-4 py-2 rounded-xl border border-border bg-[var(--bg-main)] text-[var(--text-main)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase">API Secret</label>
                  <input type="password" value="••••••••••••••••" readOnly className="w-full px-4 py-2 rounded-xl border border-border bg-[var(--bg-main)] text-[var(--text-main)]" />
                </div>
              </div>
              <button className="w-full py-3 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-all">
                Save Configuration
              </button>
            </div>
          </div>
        );
      default:
        return <Analytics />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-[var(--bg-main)] min-h-screen">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
        />
        <main className="ml-64 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
