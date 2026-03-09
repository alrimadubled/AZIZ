export enum TweetStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published'
}

export interface Tweet {
  id: string;
  content: string;
  scheduled_at?: string;
  published_at?: string;
  status: TweetStatus;
  thread_id?: string;
  media_ids?: string; // JSON string in DB
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video' | 'gif';
  name: string;
}

export interface AnalyticsData {
  id: number;
  tweet_id?: string;
  impressions: number;
  likes: number;
  retweets: number;
  replies: number;
  date: string;
}

export type Tone = 'professional' | 'casual' | 'viral' | 'informative' | 'marketing';
export type Language = 'en' | 'ar-dz' | 'fr';
