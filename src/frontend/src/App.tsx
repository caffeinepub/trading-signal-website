import { TradingHeader } from './components/TradingHeader';
import { TradingTable } from './components/TradingTable';
import { usePriceSimulation } from './hooks/usePriceSimulation';
import { useNotifications } from './hooks/useNotifications';

export default function App() {
  useNotifications();
  const assets = usePriceSimulation();

  return (
    <div className="min-h-screen bg-trading-dark text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <TradingHeader />
        <TradingTable assets={assets} />
      </div>
    </div>
  );
}
