import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AssetMap } from '../types/trading';

interface TradingTableProps {
  assets: AssetMap;
}

export function TradingTable({ assets }: TradingTableProps) {
  const assetList = Object.values(assets);

  return (
    <div className="overflow-x-auto rounded-lg border border-trading-border">
      <Table>
        <TableHeader>
          <TableRow className="border-trading-border hover:bg-transparent">
            <TableHead className="text-white font-medium text-center">Asset</TableHead>
            <TableHead className="text-white font-medium text-center">Price</TableHead>
            <TableHead className="text-white font-medium text-center">Signal</TableHead>
            <TableHead className="text-white font-medium text-center">Expiry</TableHead>
            <TableHead className="text-white font-medium text-center">Trade History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assetList.map((asset) => {
            const signalClass =
              asset.signal === 'BUY'
                ? 'text-trading-buy'
                : asset.signal === 'SELL'
                ? 'text-trading-sell'
                : 'text-trading-hold';

            return (
              <TableRow key={asset.name} className="border-trading-border hover:bg-trading-row-hover">
                <TableCell className="text-center font-medium">{asset.name}</TableCell>
                <TableCell className="text-center">{asset.price.toFixed(4)}</TableCell>
                <TableCell className={`text-center font-bold ${signalClass}`}>
                  {asset.signal}
                </TableCell>
                <TableCell className="text-center">
                  {asset.expiry > 0 ? `${asset.expiry}m` : '-'}
                </TableCell>
                <TableCell className="text-center text-xs text-trading-muted max-w-[220px]">
                  {asset.history.length > 0 ? (
                    <div className="space-y-1">
                      {asset.history.map((entry, idx) => (
                        <div key={idx}>{entry}</div>
                      ))}
                    </div>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
