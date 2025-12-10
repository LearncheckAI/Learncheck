import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateGemini = async (prompt) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  const genAi = new GoogleGenerativeAI(API_KEY);
  const model = genAi.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
};
