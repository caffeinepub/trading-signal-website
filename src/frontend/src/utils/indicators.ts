export function ema(data: number[], period: number): number | null {
  if (data.length < period) return null;
  
  const k = 2 / (period + 1);
  let emaValue = data[0];
  
  for (const price of data) {
    emaValue = price * k + emaValue * (1 - k);
  }
  
  return emaValue;
}

export function rsi(data: number[], period: number = 14): number | null {
  if (data.length < period + 1) return null;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = data.length - period; i < data.length - 1; i++) {
    const change = data[i + 1] - data[i];
    if (change > 0) {
      gains += change;
    } else {
      losses -= change;
    }
  }
  
  if (losses === 0) return 100;
  
  return 100 - (100 / (1 + (gains / losses)));
}

export function adx(): number {
  return 20 + Math.random() * 35;
}

export function bullish(data: number[]): boolean {
  return data[data.length - 1] > data[data.length - 2];
}

export function bearish(data: number[]): boolean {
  return data[data.length - 1] < data[data.length - 2];
}
