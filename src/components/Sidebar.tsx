import React from 'react';
import { 
  LayoutDashboard, 
  PenSquare, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Image as ImageIcon, 
  Settings,
  Zap,
  LogOut,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'composer', label: 'Composer', icon: PenSquare },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'media', label: 'Media Library', icon: ImageIcon },
  { id: 'insights', label: 'AI Insights', icon: Zap },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode,
  language,
  setLanguage
}) => {
  return (
    <div className="w-64 h-screen bg-[var(--bg-sidebar)] border-r border-border flex flex-col fixed left-0 top-0 transition-colors duration-200">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-[var(--text-main)]">X-Strat</h1>
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[var(--text-muted)] transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-brand/10 text-brand font-semibold" 
                : "text-[var(--text-muted)] hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-[var(--text-main)]"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors",
              activeTab === item.id ? "text-brand" : "text-[var(--text-muted)] group-hover:text-[var(--text-main)]"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Languages size={16} className="text-[var(--text-muted)]" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold text-[var(--text-muted)] outline-none cursor-pointer hover:text-[var(--text-main)]"
          >
            <option value="en">English (US)</option>
            <option value="fr">Français (FR)</option>
            <option value="ar">العربية (DZ)</option>
          </select>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-surface)] mb-4">
          <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-[var(--text-main)]">John Doe</p>
            <p className="text-xs text-[var(--text-muted)] truncate">@johndoe</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
