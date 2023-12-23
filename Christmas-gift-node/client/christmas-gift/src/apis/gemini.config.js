import { GoogleGenerativeAI } from "@google/generative-ai";

console(import.meta.env.VITE_GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export { genAI };