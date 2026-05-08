import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    description: string;
    location: string;
  }[];
}

export interface TravelPlan {
  destination: string;
  country: string;
  summary: string;
  estimatedBudget: {
    low: number;
    high: number;
    currency: string;
    breakdown: {
      category: string;
      cost: string;
    }[];
  };
  culturalTips: string[];
  itinerary: ItineraryDay[];
}

export async function generateTravelPlan(destination: string, duration: number, travelType: string): Promise<TravelPlan> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a detailed travel plan for ${duration} days in ${destination}. The traveler is looking for a ${travelType} experience.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING },
          country: { type: Type.STRING },
          summary: { type: Type.STRING },
          estimatedBudget: {
            type: Type.OBJECT,
            properties: {
              low: { type: Type.NUMBER },
              high: { type: Type.NUMBER },
              currency: { type: Type.STRING },
              breakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    cost: { type: Type.STRING }
                  }
                }
              }
            }
          },
          culturalTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                title: { type: Type.STRING },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      description: { type: Type.STRING },
                      location: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        },
        required: ["destination", "country", "summary", "estimatedBudget", "culturalTips", "itinerary"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
}
