import React, { useState, useEffect } from 'react';
import { getAlgorithmInsights } from '../services/gemini';
import { Zap, BookOpen, Lightbulb, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Insight {
  title: string;
  description: string;
}

export const Insights: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      const res = await getAlgorithmInsights();
      setInsights(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">AI Content Strategy</h2>
          <p className="text-[var(--text-muted)]">Master the X algorithm with data-driven insights</p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={isLoading}
          className="p-2 hover:bg-[var(--color-surface)] rounded-xl text-[var(--text-muted)] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={isLoading ? 'animate-spin' : ''} size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 bg-[var(--color-surface)] animate-pulse rounded-3xl"></div>)
        ) : (
          insights.map((insight, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--bg-sidebar)] p-8 rounded-3xl border border-border card-shadow flex flex-col group hover:border-brand/30 transition-all"
            >
              <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6 group-hover:scale-110 transition-transform">
                {i === 0 ? <Zap size={24} /> : i === 1 ? <Lightbulb size={24} /> : <ShieldCheck size={24} />}
              </div>
              <h3 className="text-xl font-bold mb-4 text-[var(--text-main)]">{insight.title}</h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">
                {insight.description}
              </p>
              <button className="mt-6 flex items-center gap-2 text-sm font-bold text-brand group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
              </button>
            </motion.div>
          ))
        )}
      </div>

      <div className="bg-[var(--color-surface)] rounded-3xl p-8 border border-border">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-bold uppercase tracking-wider">
              <BookOpen size={14} />
              Best Practices
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-main)]">The 2024 Engagement Guide</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Our AI has analyzed over 1M viral tweets to bring you the definitive guide on how to structure your content for maximum reach.
            </p>
            <div className="flex gap-4 pt-2">
              <button className="px-6 py-2 bg-[var(--text-main)] text-[var(--bg-main)] rounded-xl font-bold text-sm hover:opacity-90 transition-colors">
                Read Guide
              </button>
              <button className="px-6 py-2 border border-border rounded-xl font-bold text-sm hover:bg-[var(--bg-main)] transition-colors text-[var(--text-main)]">
                Download PDF
              </button>
            </div>
          </div>
          <div className="w-full md:w-64 aspect-square bg-[var(--bg-sidebar)] rounded-2xl border border-border card-shadow flex items-center justify-center p-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand blur-2xl opacity-20 animate-pulse"></div>
              <Zap size={80} className="text-brand relative z-10" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
