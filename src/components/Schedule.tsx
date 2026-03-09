import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Tweet, TweetStatus } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

export const Schedule: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTweets = async () => {
    setIsLoading(true);
    try {
      const res = await api.getTweets();
      setTweets(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scheduled tweet?')) return;
    await api.deleteTweet(id);
    fetchTweets();
  };

  const scheduledTweets = tweets.filter(t => t.status === TweetStatus.SCHEDULED);
  const publishedTweets = tweets.filter(t => t.status === TweetStatus.PUBLISHED);

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">Content Schedule</h2>
          <p className="text-[var(--text-muted)]">Manage your upcoming and past posts</p>
        </div>
        <button className="px-6 py-2 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
          New Post
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="font-bold text-lg text-[var(--text-main)]">Upcoming Posts</h3>
            <span className="px-2 py-0.5 bg-[var(--color-surface)] rounded-lg text-xs font-bold text-[var(--text-muted)]">
              {scheduledTweets.length}
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map(i => <div key={i} className="h-32 bg-[var(--color-surface)] animate-pulse rounded-2xl"></div>)}
            </div>
          ) : scheduledTweets.length === 0 ? (
            <div className="bg-[var(--color-surface)] border-2 border-dashed border-border rounded-2xl p-12 text-center">
              <CalendarIcon className="mx-auto text-[var(--text-muted)] mb-4" size={48} />
              <p className="text-[var(--text-muted)] font-medium">No posts scheduled yet</p>
              <button className="mt-4 text-brand font-bold hover:underline">Schedule your first tweet</button>
            </div>
          ) : (
            <div className="space-y-4">
              {scheduledTweets.map((tweet) => (
                <div key={tweet.id} className="bg-[var(--bg-sidebar)] p-6 rounded-2xl border border-border card-shadow flex gap-4 group">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider">
                      <Clock size={14} />
                      {tweet.scheduled_at ? format(new Date(tweet.scheduled_at), 'MMM d, yyyy • h:mm a') : 'Not set'}
                    </div>
                    <p className="text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">{tweet.content}</p>
                    <div className="flex items-center gap-4 pt-2">
                      <button className="text-xs font-bold text-[var(--text-muted)] hover:text-brand flex items-center gap-1 transition-colors">
                        <Edit3 size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(tweet.id)}
                        className="text-xs font-bold text-[var(--text-muted)] hover:text-red-500 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-[var(--color-surface)] rounded-lg text-[var(--text-muted)]">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-lg text-[var(--text-main)]">Recently Published</h3>
          <div className="space-y-4">
            {publishedTweets.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] italic">No published tweets yet.</p>
            ) : (
              publishedTweets.map((tweet) => (
                <div key={tweet.id} className="bg-[var(--color-surface)] p-4 rounded-xl border border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-green-500 flex items-center gap-1 uppercase">
                      <CheckCircle2 size={12} /> Published
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {tweet.published_at ? format(new Date(tweet.published_at), 'MMM d') : ''}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">{tweet.content}</p>
                </div>
              ))
            )}
          </div>

          <div className="bg-brand rounded-2xl p-6 text-white card-shadow">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <AlertCircle size={18} />
              Best Time to Post
            </h4>
            <p className="text-sm text-white/80 mb-4">Based on your audience activity, the best time to post today is:</p>
            <div className="text-2xl font-black">7:45 PM</div>
            <button className="w-full mt-4 py-2 bg-white text-brand rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
              Schedule for then
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
