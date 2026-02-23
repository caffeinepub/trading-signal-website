import { useState, useEffect, useRef } from 'react';
import type { AssetMap } from '../types/trading';
import { generateSignal } from '../utils/signalGenerator';
import { sendSignalNotification } from './useNotifications';

const UPDATE_MS = 5000;

const initialAssets: AssetMap = {
  'EUR/USD OTC': { name: 'EUR/USD OTC', price: 1.08, prices: [], expiry: 0, signal: 'HOLD', history: [] },
  'GBP/USD OTC': { name: 'GBP/USD OTC', price: 1.27, prices: [], expiry: 0, signal: 'HOLD', history: [] },
  'USD/CAD OTC': { name: 'USD/CAD OTC', price: 1.35, prices: [], expiry: 0, signal: 'HOLD', history: [] },
  'AUD/USD OTC': { name: 'AUD/USD OTC', price: 0.66, prices: [], expiry: 0, signal: 'HOLD', history: [] },
  'EUR/JPY OTC': { name: 'EUR/JPY OTC', price: 163, prices: [], expiry: 0, signal: 'HOLD', history: [] },
  'GBP/NZD OTC': { name: 'GBP/NZD OTC', price: 2.05, prices: [], expiry: 0, signal: 'HOLD', history: [] },
  'Bitcoin OTC': { name: 'Bitcoin OTC', price: 30000, prices: [], expiry: 0, signal: 'HOLD', history: [] },
  'Gold OTC': { name: 'Gold OTC', price: 1900, prices: [], expiry: 0, signal: 'HOLD', history: [] },
  'Asia Composite Index': { name: 'Asia Composite Index', price: 3200, prices: [], expiry: 0, signal: 'HOLD', history: [] }
};

export function usePriceSimulation(): AssetMap {
  const [assets, setAssets] = useState<AssetMap>(initialAssets);
  const previousSignalsRef = useRef<Record<string, { signal: string; expiry: number }>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) => {
        const newAssets = { ...prevAssets };

        for (const name in newAssets) {
          const asset = { ...newAssets[name] };
          const prevSignal = previousSignalsRef.current[name]?.signal || 'HOLD';
          const prevExpiry = previousSignalsRef.current[name]?.expiry || 0;

          // Simulate price movement (±1%)
          asset.price += (Math.random() - 0.5) * asset.price * 0.01;
          asset.prices = [...asset.prices, asset.price];

          // Generate signal
          generateSignal(asset);

          // Limit history to last 3 entries
          asset.history = asset.history.slice(0, 3);

          // Send notification if new signal generated
          if (
            (asset.signal === 'BUY' || asset.signal === 'SELL') &&
            (asset.signal !== prevSignal || asset.expiry !== prevExpiry) &&
            asset.expiry > 0
          ) {
            sendSignalNotification(asset.name, asset.signal, asset.expiry);
          }

          // Store current signal state
          previousSignalsRef.current[name] = {
            signal: asset.signal,
            expiry: asset.expiry
          };

          newAssets[name] = asset;
        }

        return newAssets;
      });
    }, UPDATE_MS);

    return () => clearInterval(interval);
  }, []);

  return assets;
}
