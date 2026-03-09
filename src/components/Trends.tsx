import React, { useEffect, useState } from 'react';
import { getTrends } from '../services/gemini';
import { TrendingUp, Globe, MapPin, RefreshCw, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Trend {
  topic: string;
  hashtag: string;
  reason: string;
  suggestion: string;
}

export const Trends: React.FC = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [region, setRegion] = useState<'Algeria' | 'Global'>('Algeria');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrends = async () => {
    setIsLoading(true);
    try {
      const res = await getTrends(region);
      setTrends(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, [region]);

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">Trending Intelligence</h2>
          <p className="text-[var(--text-muted)]">Stay ahead of the curve with AI-powered trend analysis</p>
        </div>
        <div className="flex bg-[var(--color-surface)] p-1 rounded-xl">
          <button 
            onClick={() => setRegion('Algeria')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${region === 'Algeria' ? 'bg-[var(--bg-main)] shadow-sm text-brand' : 'text-[var(--text-muted)]'}`}
          >
            <MapPin size={16} />
            Algeria
          </button>
          <button 
            onClick={() => setRegion('Global')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${region === 'Global' ? 'bg-[var(--bg-main)] shadow-sm text-brand' : 'text-[var(--text-muted)]'}`}
          >
            <Globe size={16} />
            Global
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <RefreshCw className="animate-spin text-brand" size={48} />
          <p className="text-[var(--text-muted)] font-medium">Analyzing real-time trends...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {trends.map((trend, i) => (
              <motion.div 
                key={trend.topic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--bg-sidebar)] p-6 rounded-2xl border border-border card-shadow hover:border-brand/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold text-brand uppercase tracking-widest">{trend.hashtag}</span>
                    <h3 className="text-xl font-bold mt-1 group-hover:text-brand transition-colors text-[var(--text-main)]">{trend.topic}</h3>
                  </div>
                  <div className="p-2 bg-[var(--color-surface)] rounded-lg text-[var(--text-muted)]">
                    <TrendingUp size={20} />
                  </div>
                </div>
                
                <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
                  {trend.reason}
                </p>

                <div className="bg-brand/5 rounded-xl p-4 border border-brand/10">
                  <div className="flex items-center gap-2 text-brand font-bold text-xs mb-2">
                    <Sparkles size={14} />
                    AI SUGGESTION
                  </div>
                  <p className="text-sm font-medium italic text-[var(--text-main)]">
                    "{trend.suggestion}"
                  </p>
                  <button className="mt-4 flex items-center gap-2 text-xs font-bold text-brand hover:underline">
                    Use this suggestion <ExternalLink size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-4">Want more niche trends?</h3>
          <p className="text-gray-400 mb-6">Connect your Twitter/X account to get personalized trend analysis based on your followers and niche.</p>
          <button className="px-8 py-3 bg-brand rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
            Connect Account
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-3xl rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full mr-20 -mb-20"></div>
      </div>
    </div>
  );
};
