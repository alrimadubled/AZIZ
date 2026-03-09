import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Calendar, 
  Image as ImageIcon, 
  Smile, 
  Globe, 
  Languages,
  Type as TypeIcon,
  RefreshCw,
  Plus,
  Zap
} from 'lucide-react';
import { generateTweet, rewriteTweet, generateThread } from '../services/gemini';
import { api } from '../services/api';
import { Tone, Language, TweetStatus } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const Composer: React.FC = () => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState<Tone>('viral');
  const [lang, setLang] = useState<Language>('en');
  const [isThread, setIsThread] = useState(false);
  const [threadCount, setThreadCount] = useState(3);
  const [prompt, setPrompt] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      if (isThread) {
        const res = await generateThread(prompt, threadCount, tone, lang);
        setContent(res);
      } else {
        const res = await generateTweet(prompt, tone, lang);
        setContent(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRewrite = async () => {
    if (!content) return;
    setIsGenerating(true);
    try {
      const res = await rewriteTweet(content, tone, lang);
      setContent(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSchedule = async () => {
    if (!content) return;
    await api.createTweet({
      content,
      status: TweetStatus.SCHEDULED,
      scheduled_at: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    });
    setContent('');
    setPrompt('');
    alert('Tweet scheduled!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">AI Composer</h2>
          <p className="text-[var(--text-muted)]">Craft viral content with AI assistance</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsThread(!isThread)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isThread ? 'bg-brand text-white' : 'bg-[var(--color-surface)] text-[var(--text-muted)] hover:bg-gray-200 dark:hover:bg-gray-800'}`}
          >
            {isThread ? 'Thread Mode' : 'Single Tweet'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--bg-sidebar)] rounded-2xl border border-border overflow-hidden card-shadow">
            <div className="p-4 border-b border-border bg-[var(--color-surface)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-xs">JD</div>
                <span className="text-sm font-semibold text-[var(--text-main)]">John Doe</span>
              </div>
              <span className={`text-xs font-medium ${content.length > 280 ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>
                {content.length} / 280
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full h-64 p-6 focus:outline-none resize-none text-lg leading-relaxed bg-transparent text-[var(--text-main)]"
            />
            <div className="p-4 border-t border-border flex items-center justify-between bg-[var(--color-surface)]">
              <div className="flex items-center gap-4 text-brand">
                <button className="hover:bg-brand/10 p-2 rounded-lg transition-colors"><ImageIcon size={20} /></button>
                <button className="hover:bg-brand/10 p-2 rounded-lg transition-colors"><Smile size={20} /></button>
                <button className="hover:bg-brand/10 p-2 rounded-lg transition-colors"><Globe size={20} /></button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleSchedule}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[var(--text-muted)] font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Calendar size={18} />
                  Schedule
                </button>
                <button 
                  className="flex items-center gap-2 px-6 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
                >
                  <Send size={18} />
                  Post Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[var(--bg-sidebar)] rounded-2xl border border-border p-6 card-shadow space-y-6">
            <div className="flex items-center gap-2 text-brand font-bold">
              <Sparkles size={20} />
              <h3 className="text-[var(--text-main)]">AI Assistant</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Topic / Idea</label>
                <input 
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Benefits of AI in marketing"
                  className="w-full px-4 py-2 rounded-xl border border-border bg-transparent text-[var(--text-main)] focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Tone</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value as Tone)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-transparent text-[var(--text-main)] outline-none text-sm"
                  >
                    <option value="viral">Viral</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="informative">Informative</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Language</label>
                  <select 
                    value={lang}
                    onChange={(e) => setLang(e.target.value as Language)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-transparent text-[var(--text-main)] outline-none text-sm"
                  >
                    <option value="en">English</option>
                    <option value="ar-dz">Algerian Arabic</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>

              {isThread && (
                <div>
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Thread Length</label>
                  <input 
                    type="number"
                    min="2"
                    max="10"
                    value={threadCount}
                    onChange={(e) => setThreadCount(parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-xl border border-border bg-transparent text-[var(--text-main)] outline-none"
                  />
                </div>
              )}

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full py-3 rounded-xl bg-[var(--text-main)] text-[var(--bg-main)] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-colors disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </button>

              <button 
                onClick={handleRewrite}
                disabled={isGenerating || !content}
                className="w-full py-3 rounded-xl border border-[var(--text-main)] text-[var(--text-main)] font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={18} />
                Rewrite & Optimize
              </button>
            </div>
          </div>

          <div className="bg-brand/5 rounded-2xl border border-brand/10 p-4">
            <h4 className="text-sm font-bold text-brand mb-2 flex items-center gap-2">
              <Zap size={16} />
              Pro Tip
            </h4>
            <p className="text-xs text-brand/80 leading-relaxed">
              Threads with images get 3x more engagement. Try adding a visual to your first tweet!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
