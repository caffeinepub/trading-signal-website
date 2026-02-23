export function TradingHeader() {
  return (
    <header className="mb-6 text-center">
      <h1 className="text-xl md:text-2xl font-normal mb-2">
        📊 Trading Signal Website (5m)
      </h1>
      <p className="text-xs md:text-sm text-trading-muted">
        EMA 21-55-100-200 • RSI • ADX
        <br />
        Expiry: 10 / 15 Minutes
      </p>
    </header>
  );
}
