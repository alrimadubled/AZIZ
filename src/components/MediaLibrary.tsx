import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Media } from '../types';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Search, 
  Filter, 
  MoreVertical,
  FileVideo,
  FileImage,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'gif'>('all');
  const [search, setSearch] = useState('');

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await api.getMedia();
      if (res.length === 0) {
        // Mock some media if empty
        const mock: Media[] = [
          { id: '1', name: 'Marketing Banner', type: 'image', url: 'https://picsum.photos/seed/marketing/800/600' },
          { id: '2', name: 'Product Demo', type: 'video', url: 'https://picsum.photos/seed/product/800/600' },
          { id: '3', name: 'Team Photo', type: 'image', url: 'https://picsum.photos/seed/team/800/600' },
          { id: '4', name: 'Launch GIF', type: 'gif', url: 'https://picsum.photos/seed/launch/800/600' },
        ];
        setMedia(mock);
      } else {
        setMedia(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const filteredMedia = media.filter(m => {
    const matchesFilter = filter === 'all' || m.type === filter;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">Media Library</h2>
          <p className="text-[var(--text-muted)]">Manage your visual assets for Twitter/X</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
          <Upload size={18} />
          Upload Media
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--bg-sidebar)] p-4 rounded-2xl border border-border card-shadow">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-[var(--bg-main)] text-[var(--text-main)] focus:ring-2 focus:ring-brand/20 outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {(['all', 'image', 'video', 'gif'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === t ? 'bg-brand text-white' : 'bg-[var(--color-surface)] text-[var(--text-muted)] hover:bg-gray-200 dark:hover:bg-gray-800'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-[var(--color-surface)] animate-pulse rounded-2xl"></div>)}
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-20 bg-[var(--color-surface)] rounded-3xl border-2 border-dashed border-border">
          <ImageIcon className="mx-auto text-[var(--text-muted)] mb-4" size={48} />
          <p className="text-[var(--text-muted)] font-medium">No media found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[var(--bg-sidebar)] rounded-2xl border border-border overflow-hidden card-shadow hover:border-brand/50 transition-all"
              >
                <div className="aspect-square relative overflow-hidden bg-[var(--color-surface)]">
                  <img 
                    src={item.url} 
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-sm">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg text-[var(--text-muted)] hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-[10px] font-bold text-white uppercase flex items-center gap-1">
                    {item.type === 'video' ? <FileVideo size={10} /> : <FileImage size={10} />}
                    {item.type}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold truncate text-[var(--text-main)]">{item.name}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <button className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-[var(--text-muted)] hover:text-brand hover:border-brand/50 hover:bg-brand/5 transition-all group">
            <Plus size={32} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Add New</span>
          </button>
        </div>
      )}
    </div>
  );
};
