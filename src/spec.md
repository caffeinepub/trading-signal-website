# Specification

## Summary
**Goal:** Build a real-time trading signal website that displays 9 trading assets with simulated price updates, technical indicators (EMA, RSI, ADX), automated BUY/SELL/HOLD signal generation, countdown timers, and browser notifications.

**Planned changes:**
- Create a dark-themed table displaying 9 trading assets (EUR/USD OTC, GBP/USD OTC, USD/CAD OTC, AUD/USD OTC, EUR/JPY OTC, GBP/NZD OTC, Bitcoin OTC, Gold OTC, Asia Composite Index) with columns for Asset, Price, Signal, Expiry, and Trade History
- Implement simulated price updates every 5 seconds with ±1% random movements from specified initial prices
- Calculate technical indicators: EMA (21, 55, 100, 200 periods), RSI (14-period), and ADX (random 20-55)
- Generate BUY signals when EMA-21 > EMA-55 > EMA-100 > EMA-200, RSI > 55, ADX ≥ 30, and bullish price action
- Generate SELL signals when EMA-21 < EMA-55 < EMA-100 < EMA-200, RSI < 45, ADX ≥ 30, and bearish price action
- Display HOLD status when no signal conditions are met or after signal expiry
- Implement expiry countdown (10 or 15 minutes) that decrements by 5 minutes per update cycle
- Maintain trade history showing last 3 signals per asset with signal type and expiry time
- Send browser notifications for new BUY/SELL signals with asset name, signal type, and expiry time
- Apply dark theme (#0f1115 background) with color-coded signals: bright green (#00ff99) for BUY, bright red (#ff4d4d) for SELL, orange (#ffaa00) for HOLD
- Display header with title "📊 Trading Signal Website (5m)" and subtitle showing indicators and expiry options

**User-visible outcome:** Users can view a real-time trading signal dashboard that automatically updates prices every 5 seconds, generates BUY/SELL/HOLD signals based on technical indicators, displays countdown timers for active signals, shows trade history for each asset, and sends browser notifications when new trading signals are generated.
