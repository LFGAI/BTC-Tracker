
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiAnalysis } from "../types";

export async function getMarketAnalysis(
  price: number,
  wma50: number,
  sma200: number,
  rsi: number,
  symbol: string,
  isCommodity: boolean = false,
  language: string = 'PT'
): Promise<GeminiAnalysis | null> {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined") {
    console.error("Gemini API_KEY is missing.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analise agora: ${symbol} a $${price}. Indicadores: 50WMA=${wma50}, 200SMA=${sma200}, RSI=${rsi}.`,
      config: {
        systemInstruction: `
          Você é um Analista Quantitativo Especialista em Ativos Escassos. 
          Sua base de conhecimento inclui o Ciclo de 4 anos do Bitcoin e a Teoria do Power Law.
          
          REGRAS CRÍTICAS PARA PROBABILIDADES (RETORNE SEMPRE INTEIROS DE 0 A 100):
          1. Se Preço <= 200SMA: A probabilidade de subida (probRise) deve ser > 85% (Chão histórico).
          2. Se RSI < 30: A probabilidade de reversão (probReversal) deve ser elevada (> 60%).
          3. Se Preço > 50WMA e 50WMA > 200SMA: Você está em Bull Market estrutural (probRise > 60%).
          4. Se o RSI > 80: A probabilidade de queda (probFall) deve ser > 70%.
          5. 'probRise', 'probFall' e 'probReversal' devem ser números inteiros representando a porcentagem (ex: 85, não 0.85).
          
          Calcule o "Inflation Adjusted Price" comparando o poder de compra de $69k em 2021 com o dólar atual (M2 Supply aumentou ~25%).
          Responda sempre em ${language}.
        `,
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            outlook: { type: Type.STRING },
            advice: { type: Type.STRING },
            fearGreedScore: { type: Type.NUMBER, description: "Score de 0 a 100" },
            macroPulse: { type: Type.STRING },
            probRise: { type: Type.NUMBER, description: "Porcentagem inteira de 0 a 100 para subida semanal" },
            probFall: { type: Type.NUMBER, description: "Porcentagem inteira de 0 a 100 para queda semanal" },
            probReversal: { type: Type.NUMBER, description: "Porcentagem inteira de 0 a 100 para reversão de tendência" },
            exchangeReserves: { type: Type.STRING },
            scarcityStage: { type: Type.STRING },
            inflationAdjustedPrice: { type: Type.NUMBER },
            inflationAdjustedPriceGold: { type: Type.NUMBER },
            inflationIndexUsed: { type: Type.STRING },
            inflationRatio: { type: Type.NUMBER },
            totalMinedBtc: { type: Type.STRING },
            btcGoldStatus: { type: Type.STRING, description: "OVERVALUED, UNDERVALUED or FAIR" },
            btcGoldDescription: { type: Type.STRING }
          },
          required: ["sentiment", "outlook", "advice", "fearGreedScore", "probRise", "probFall", "probReversal", "btcGoldStatus"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    
    const parsed = JSON.parse(text);
    
    // Robustness check: Ensure probabilities are treated as percentages if AI returns decimals
    const normalize = (val: any) => {
      const n = parseFloat(val);
      if (isNaN(n)) return 0;
      return (n > 0 && n <= 1) ? Math.round(n * 100) : Math.round(n);
    };

    return {
      ...parsed,
      probRise: normalize(parsed.probRise),
      probFall: normalize(parsed.probFall),
      probReversal: normalize(parsed.probReversal),
      fearGreedScore: normalize(parsed.fearGreedScore)
    } as GeminiAnalysis;
  } catch (error: any) {
    console.error("Gemini Critical Error:", error.message);
    return null;
  }
}
