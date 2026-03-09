import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { api } from '../services/api';
import { AnalyticsData } from '../types';
import { TrendingUp, Users, Heart, MessageCircle, Repeat, Eye } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getAnalytics();
      if (res.length === 0) {
        // Mock data if empty
        const mock = Array.from({ length: 7 }, (_, i) => ({
          id: i,
          date: `2024-03-${10 + i}`,
          impressions: Math.floor(Math.random() * 5000) + 1000,
          likes: Math.floor(Math.random() * 200) + 50,
          retweets: Math.floor(Math.random() * 50) + 10,
          replies: Math.floor(Math.random() * 30) + 5,
        }));
        setData(mock);
      } else {
        setData(res);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Impressions', value: '42.5K', change: '+12.5%', icon: Eye, color: 'text-blue-500' },
    { label: 'Total Likes', value: '1.2K', change: '+8.2%', icon: Heart, color: 'text-red-500' },
    { label: 'Total Retweets', value: '450', change: '+15.1%', icon: Repeat, color: 'text-green-500' },
    { label: 'Engagement Rate', value: '4.8%', change: '+2.4%', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="p-6 space-y-8">
      <header>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">Analytics Overview</h2>
        <p className="text-[var(--text-muted)]">Track your performance and growth</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[var(--bg-sidebar)] p-6 rounded-2xl border border-border card-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-[var(--color-surface)] ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-[var(--text-muted)]">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-[var(--text-main)]">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--bg-sidebar)] p-6 rounded-2xl border border-border card-shadow">
          <h3 className="text-lg font-bold mb-6 text-[var(--text-main)]">Impressions Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)'}}
                />
                <Area type="monotone" dataKey="impressions" stroke="#1DA1F2" strokeWidth={3} fillOpacity={1} fill="url(#colorImp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--bg-sidebar)] p-6 rounded-2xl border border-border card-shadow">
          <h3 className="text-lg font-bold mb-6 text-[var(--text-main)]">Engagement Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-main)'}}
                />
                <Line type="monotone" dataKey="likes" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="retweets" stroke="#22c55e" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="replies" stroke="#a855f7" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-sidebar)] rounded-2xl border border-border card-shadow overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--text-main)]">Top Performing Tweets</h3>
          <button className="text-brand font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--color-surface)] text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                <th className="px-6 py-4">Tweet Content</th>
                <th className="px-6 py-4 text-center">Impressions</th>
                <th className="px-6 py-4 text-center">Likes</th>
                <th className="px-6 py-4 text-center">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { content: "AI is changing the way we think about social media management. Here's how...", impressions: "12.4K", likes: "450", engagement: "5.2%" },
                { content: "Excited to announce our new partnership with @TechGlobal!", impressions: "8.2K", likes: "320", engagement: "4.1%" },
                { content: "Top 10 tips for growing your Twitter audience in 2024 🧵", impressions: "15.1K", likes: "890", engagement: "6.8%" },
              ].map((tweet, i) => (
                <tr key={i} className="hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium max-w-md truncate text-[var(--text-main)]">{tweet.content}</td>
                  <td className="px-6 py-4 text-sm text-center font-bold text-[var(--text-main)]">{tweet.impressions}</td>
                  <td className="px-6 py-4 text-sm text-center font-bold text-[var(--text-main)]">{tweet.likes}</td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="px-2 py-1 bg-brand/10 text-brand rounded-lg font-bold text-xs">{tweet.engagement}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
