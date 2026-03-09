import { Tweet, Media, AnalyticsData } from "../types";

export const api = {
  getTweets: async (): Promise<Tweet[]> => {
    const res = await fetch("/api/tweets");
    return res.json();
  },
  createTweet: async (tweet: Partial<Tweet>) => {
    const res = await fetch("/api/tweets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: crypto.randomUUID(), ...tweet }),
    });
    return res.json();
  },
  deleteTweet: async (id: string) => {
    const res = await fetch(`/api/tweets/${id}`, { method: "DELETE" });
    return res.json();
  },
  getMedia: async (): Promise<Media[]> => {
    const res = await fetch("/api/media");
    return res.json();
  },
  uploadMedia: async (media: Partial<Media>) => {
    const res = await fetch("/api/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: crypto.randomUUID(), ...media }),
    });
    return res.json();
  },
  getAnalytics: async (): Promise<AnalyticsData[]> => {
    const res = await fetch("/api/analytics");
    return res.json();
  },
};
