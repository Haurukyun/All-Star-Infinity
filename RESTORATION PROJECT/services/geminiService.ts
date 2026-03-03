
import { GoogleGenAI, Type } from "@google/genai";
import { GamePrompt, Intensity, PromptType } from "../types";

// Always use the API key directly from process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateForbiddenPrompt = async (type: PromptType, intensity: Intensity): Promise<GamePrompt> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a ${intensity} level ${type} for an adult game.`,
      config: {
        systemInstruction: `You are the "Master of Filth" for an adult Truth or Dare app called OBSIDIAN. 
        Your tone is incredibly crude, vulgar, shameless, and provocative. 
        Use explicit slang and rough language common in adult underground clubs. 
        For "Foreplay", keep it suggestive but dirty. 
        For "Deep End", make it intrusive and highly sexual. 
        For "Obsidian Filth", go completely over the line—vivid, explicit, and potentially embarrassing or highly provocative dares/truths.
        Return a JSON object matching the GamePrompt interface.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "The crude prompt itself." },
            penalty: { type: Type.STRING, description: "A vulgar punishment if they bitch out." }
          },
          required: ["text", "penalty"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    // Fix: Added missing 'id' property to return value to satisfy GamePrompt interface
    return {
      id: `ai-${Math.random().toString(36).substring(2, 11)}`,
      type,
      intensity,
      text: data.text || "Tell us something filthy.",
      penalty: data.penalty || "Drink a double shot of something cheap."
    };
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fix: Added missing 'id' property to return value to satisfy GamePrompt interface
    return {
      id: `error-${Date.now()}`,
      type,
      intensity,
      text: "The AI is too shocked to speak. Just do something slutty.",
      penalty: "Strip one item of clothing."
    };
  }
};
