import { GoogleGenAI, Type } from "@google/genai";
import { Tone, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateTweet = async (prompt: string, tone: Tone, lang: Language) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a Twitter post about: ${prompt}. 
    Tone: ${tone}. 
    Language: ${lang === 'ar-dz' ? 'Algerian Arabic (Darja)' : lang}. 
    Ensure it's engaging and fits Twitter's character limit.`,
  });
  return response.text;
};

export const rewriteTweet = async (content: string, tone: Tone, lang: Language) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Rewrite the following tweet to be more ${tone} in ${lang === 'ar-dz' ? 'Algerian Arabic (Darja)' : lang}: "${content}"`,
  });
  return response.text;
};

export const generateThread = async (topic: string, count: number, tone: Tone, lang: Language) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a Twitter thread of ${count} tweets about: ${topic}. 
    Tone: ${tone}. 
    Language: ${lang === 'ar-dz' ? 'Algerian Arabic (Darja)' : lang}. 
    Format the output as a numbered list of tweets.`,
  });
  return response.text;
};

export const getTrends = async (region: 'Algeria' | 'Global') => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `List 5 trending topics and hashtags currently popular in ${region}. 
    For each, provide a brief explanation of why it's trending and a suggested tweet idea.
    Return the response in JSON format with the following structure:
    [{ "topic": "...", "hashtag": "...", "reason": "...", "suggestion": "..." }]`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            hashtag: { type: Type.STRING },
            reason: { type: Type.STRING },
            suggestion: { type: Type.STRING }
          },
          required: ["topic", "hashtag", "reason", "suggestion"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const getAlgorithmInsights = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Provide 3 latest insights or tips regarding the Twitter/X algorithm and best practices for engagement in 2024. 
    Format as a list of objects with title and description.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title", "description"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};
