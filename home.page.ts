
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // In a real app, this should be handled securely.
    // For this environment, we use the provided process.env.API_KEY
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getHealthAdvice(userQuery: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a helpful and cautious pharmacist assistant for "MediCare Pharmacy BD" in Bangladesh. 
        Answer the following user query about medicine or health in a professional, concise, and friendly manner.
        
        Rules:
        1. Always advise consulting a real doctor for serious issues.
        2. If the user asks about prescription drugs, remind them they need a doctor's prescription.
        3. Mention "Bangladeshi Taka (BDT)" if discussing general pricing examples (optional).
        4. Keep the response under 100 words if possible.
        5. Format the response nicely.

        User Query: ${userQuery}`,
      });
      return response.text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "I'm having trouble connecting to the medical database right now. Please try again later or consult a doctor directly.";
    }
  }
}
    