
import { CandleData } from '../types';

/**
 * Busca dados históricos e atuais da Binance. 
 * PAXGUSDT é usado como proxy perfeito para o preço do Ouro (Gold).
 */
export async function fetchMarketData(symbol: string = 'BTCUSDT', interval: string = '1w'): Promise<CandleData[]> {
  const binanceSymbol = symbol === 'PAXGUSDT' ? 'PAXGUSDT' : symbol;
  
  // Aumentamos o limite para garantir dados suficientes para médias longas
  const sources = [
    `https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${interval}&limit=1000`,
    `https://fapi.binance.com/fapi/v1/klines?symbol=${binanceSymbol}&interval=${interval}&limit=1000`
  ];

  for (const url of sources) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data) && data.length > 0) {
          return data.map((d: any) => ({
            time: d[0],
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
            volume: parseFloat(d[5]),
          }));
        }
      }
    } catch (error) {
      console.error(`Binance fetch error for ${url}:`, error);
    }
  }

  return [];
}

/**
 * Média Móvel Simples (SMA) - O padrão da indústria para a "200 Week MA"
 */
export function calculateSMA(data: number[], period: number): number[] {
  const result: number[] = new Array(data.length).fill(0);
  if (data.length < period) return result;

  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i];
  }
  result[period - 1] = sum / period;

  for (let i = period; i < data.length; i++) {
    sum = sum - data[i - period] + data[i];
    result[i] = sum / period;
  }
  return result;
}

export function calculateWMA(data: number[], period: number): number[] {
  const result: number[] = new Array(data.length).fill(0);
  if (data.length < period) return result;
  
  const weightSum = (period * (period + 1)) / 2;

  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j] * (period - j);
    }
    result[i] = sum / weightSum;
  }
  return result;
}

export function calculateRSI(data: number[], period: number = 14): number[] {
  const rsi: number[] = new Array(data.length).fill(50);
  if (data.length <= period) return rsi;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = data[i] - data[i - 1];
    if (change >= 0) gains += change;
    else losses -= change;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < data.length; i++) {
    const change = data[i] - data[i - 1];
    const gain = change >= 0 ? change : 0;
    const loss = change < 0 ? -change : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi[i] = 100 - 100 / (1 + rs);
  }

  return rsi;
}

export function enrichWithAverages(data: CandleData[]): CandleData[] {
  if (!data || data.length === 0) return [];
  
  const closes = data.map(d => d.close);
  const enriched = data.map(d => ({ ...d }));
  
  // WMA para 50 e 100 (mais sensíveis a tendência atual)
  const wma50 = calculateWMA(closes, 50);
  const wma100 = calculateWMA(closes, 100);
  
  // SMA para 200 (O padrão absoluto de suporte histórico)
  const sma200 = calculateSMA(closes, 200);

  enriched.forEach((d, i) => {
    d.wma50 = wma50[i] > 0 ? wma50[i] : undefined;
    d.wma100 = wma100[i] > 0 ? wma100[i] : undefined;
    d.sma200 = sma200[i] > 0 ? sma200[i] : undefined;
    // Alias para manter compatibilidade com componentes que esperam wma200
    d.wma200 = d.sma200; 
  });

  const rsiValues = calculateRSI(closes, 14);
  enriched.forEach((d, i) => {
    d.rsi = rsiValues[i] || 50;
  });

  enriched.forEach((d, i) => {
    const ma = d.wma50;
    if (ma) {
      d.trend = d.close >= ma ? 'BULL' : 'BEAR';
      if (i > 0 && enriched[i-1].trend) {
        if (enriched[i-1].trend === 'BEAR' && d.trend === 'BULL') d.trendChange = 'TO_BULL';
        else if (enriched[i-1].trend === 'BULL' && d.trend === 'BEAR') d.trendChange = 'TO_BEAR';
      }
    }
  });

  return enriched;
}
