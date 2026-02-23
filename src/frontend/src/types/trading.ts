export interface Asset {
  name: string;
  price: number;
  prices: number[];
  signal: 'BUY' | 'SELL' | 'HOLD';
  expiry: number;
  history: string[];
}

export type AssetMap = Record<string, Asset>;
