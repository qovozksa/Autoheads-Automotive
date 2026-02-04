
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export async function getSpecialistResponse(userPrompt: string, history: { role: 'user' | 'assistant', text: string }[]) {
  if (!API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Format history for the API
  const contents = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.text }]
  }));

  // Add the current message
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }]
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: `You are an expert luxury automotive consultant for "Autoheads Automotive". 
        Your tone is sophisticated, professional, helpful, and premium. 
        You know everything about the Autoheads lineup (Phantom GT, Stellar S, Vortex R, Onyx E, Meridian GT).
        You should focus on engineering excellence, artisanal interiors, and the exclusive lifestyle of Autoheads owners.
        Keep responses relatively concise but evocative. If asked about prices, use the range $80k - $250k.
        Invite users to 'Book a Test Drive' if they seem interested in a specific model.`,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm currently unable to process your request. Please try again or contact our concierge directly.";
  }
}
