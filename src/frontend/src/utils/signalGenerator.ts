import { ema, rsi, adx, bullish, bearish } from './indicators';
import type { Asset } from '../types/trading';

const EXPIRY_OPTIONS = [10, 15];

export function generateSignal(asset: Asset): void {
  // Decrement expiry if active
  if (asset.expiry > 0) {
    asset.expiry -= 5; // TIMEFRAME_MIN
    if (asset.expiry <= 0) {
      asset.expiry = 0;
      asset.signal = 'HOLD';
    }
    return;
  }

  // Calculate indicators
  const e21 = ema(asset.prices, 21);
  const e55 = ema(asset.prices, 55);
  const e100 = ema(asset.prices, 100);
  const e200 = ema(asset.prices, 200);
  const r = rsi(asset.prices);
  const ad = adx();

  // Check if we have enough data and ADX is strong enough
  if (!e21 || !e55 || !e100 || !e200 || r === null || ad < 30) {
    return;
  }

  // BUY signal conditions
  if (
    e21 > e55 &&
    e55 > e100 &&
    e100 > e200 &&
    r > 55 &&
    bullish(asset.prices)
  ) {
    asset.signal = 'BUY';
    asset.expiry = EXPIRY_OPTIONS[Math.floor(Math.random() * 2)];
    asset.history.unshift(`BUY (${asset.expiry}m)`);
    return;
  }

  // SELL signal conditions
  if (
    e21 < e55 &&
    e55 < e100 &&
    e100 < e200 &&
    r < 45 &&
    bearish(asset.prices)
  ) {
    asset.signal = 'SELL';
    asset.expiry = EXPIRY_OPTIONS[Math.floor(Math.random() * 2)];
    asset.history.unshift(`SELL (${asset.expiry}m)`);
    return;
  }
}
