

import { GoogleGenAI, Type } from "@google/genai";
import type { BibleExplorationResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    explanation: {
      type: Type.STRING,
      description: "Una explicación detallada y profunda del tema, pasaje o pregunta. Debe ser clara, perspicaz y basarse en principios teológicos sólidos.",
    },
    key_verses: {
      type: Type.ARRAY,
      description: "Una lista de 1 a 3 versículos clave que son centrales para el tema consultado.",
      items: {
        type: Type.OBJECT,
        properties: {
          reference: { type: Type.STRING, description: "La referencia bíblica completa (ej. Juan 3:16)." },
          text: { type: Type.STRING, description: "El texto completo del versículo." },
        },
        required: ["reference", "text"],
      },
    },
    related_verses: {
      type: Type.ARRAY,
      description: "Una lista de versículos adicionales que proporcionan contexto, apoyo o una perspectiva diferente sobre el tema.",
      items: {
        type: Type.OBJECT,
        properties: {
          reference: { type: Type.STRING, description: "La referencia bíblica completa (ej. Romanos 5:8)." },
          text: { type: Type.STRING, description: "El texto completo del versículo." },
        },
        required: ["reference", "text"],
      },
    },
    further_study_topics: {
        type: Type.ARRAY,
        description: "Una lista de temas o conceptos relacionados que el usuario podría explorar para profundizar su comprensión.",
        items: {
            type: Type.OBJECT,
            properties: {
                topic: { type: Type.STRING, description: "El nombre del tema (ej. El Amor Ágape)." },
                description: { type: Type.STRING, description: "Una breve descripción de lo que trata el tema y por qué es relevante." },
            },
            required: ["topic", "description"],
        },
    }
  },
  required: ["explanation", "key_verses", "related_verses", "further_study_topics"],
};

const systemInstruction = `Eres un erudito bíblico y teólogo experto. Tu propósito es ayudar a los usuarios a comprender la Biblia. Proporciona respuestas claras, perspicaces y bien fundamentadas basadas en las Escrituras. Tu tono debe ser respetuoso, informativo y accesible. Responde siempre en español. No inventes información. Basa tus respuestas en interpretaciones teológicas comúnmente aceptadas.`;

export const fetchBibleExploration = async (query: string): Promise<BibleExplorationResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `Por favor, explora el siguiente tema, pregunta o pasaje bíblico: "${query}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.5,
        topP: 0.95
      },
    });

    // FIX: Directly parse the JSON from response.text. When `responseMimeType` is "application/json",
    // the API should return a clean JSON string, making markdown fence cleaning unnecessary.
    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);

    return data as BibleExplorationResult;

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("No se pudo obtener una respuesta. Por favor, intente de nuevo.");
  }
};