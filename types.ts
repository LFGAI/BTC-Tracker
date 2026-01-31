
export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  wma50?: number;
  wma100?: number;
  sma200?: number; // Primary floor
  wma200?: number; // Alias for sma200
  rsi?: number;
  trend?: 'BULL' | 'BEAR';
  trendChange?: 'TO_BULL' | 'TO_BEAR' | null;
  [key: string]: any;
}

export interface MarketSignal {
  type: 'BUY' | 'SELL' | 'NEUTRAL';
  message: string;
  reason: string;
}

export interface GeminiSource {
  title: string;
  uri: string;
}

export interface GeminiAnalysis {
  sentiment: string;
  outlook: string;
  advice: string;
  fearGreedScore: number;
  macroPulse: string;
  probRise: number;
  probFall: number;
  probReversal: number;
  exchangeReserves?: string;
  scarcityStage?: string;
  m2Supply?: string;
  inflationAdjustedPrice?: number; // Replaces m2FairValue
  inflationAdjustedPriceGold?: number;
  inflationIndexUsed: string; // "CPI" or "M2"
  inflationRatio: number;
  totalMinedBtc?: string;
  btcGoldStatus?: 'OVERVALUED' | 'UNDERVALUED' | 'FAIR';
  btcGoldDescription?: string;
  sources?: GeminiSource[];
}

export type Language = 'PT' | 'EN' | 'DE' | 'ES';

export interface Asset {
  symbol: string;
  name: string;
  category: 'CRYPTO' | 'COMMODITY';
}

export const SUPPORTED_ASSETS: Asset[] = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', category: 'CRYPTO' },
  { symbol: 'PAXGUSDT', name: 'Gold', category: 'COMMODITY' },
];

// Added missing AlertCondition type
export type AlertCondition = 'PRICE_ABOVE' | 'PRICE_BELOW' | 'CROSS_ABOVE_MA' | 'CROSS_BELOW_MA';

// Added missing UserAlert interface
export interface UserAlert {
  id: string;
  symbol: string;
  condition: AlertCondition;
  value: number;
  type: 'BUY' | 'SELL';
  isActive: boolean;
}

// Added missing AlertPerformanceMetrics interface
export interface AlertPerformanceMetrics {
  alertId: string;
  triggerCount: number;
  avgReturn4W: number;
  winRate: number;
}
