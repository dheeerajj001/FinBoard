'use client';
import { useEffect, useState } from 'react';
import { WidgetConfig } from '../../store/useDashboardStore';
import { getRandomStock } from '../../utils/mockStocks';

export function FinanceCardWidget({ widget }: { widget: WidgetConfig }) {
  const [data, setData] = useState<any>(widget.data);
  const [oldPrice, setOldPrice] = useState(data?.price);
  const [anim, setAnim] = useState("");

  useEffect(() => {
    setData(widget.data);
  }, [widget.data]);

  useEffect(() => {
    const intv = setInterval(() => {
      setOldPrice(data.price);
      const newStock = getRandomStock();
      setData(newStock);
    }, 5000);
    return () => clearInterval(intv);
  }, [data]);

  useEffect(() => {
    if (data.price !== oldPrice) {
      setAnim('animate-flash');
      const t = setTimeout(() => setAnim(''), 500);
      return () => clearTimeout(t);
    }
  }, [data, oldPrice]);

  if (!data) return <div className="h-32 flex items-center justify-center">Loading...</div>;

  const up = data.change >= 0;
  return (
    <div className={`relative flex flex-col gap-2 py-3 ${anim}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-500">{data.symbol}</span>
        <span className="ml-auto px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-bold">{data.name}</span>
      </div>
      <div className="flex items-end gap-3">
        <div className="text-3xl font-bold tracking-tight flex items-center">
          ${data.price}
          <span className={`ml-2 text-base font-medium ${up ? 'text-green-500' : 'text-red-500'}`}>{up ? '▲' : '▼'} {data.change} ({data.changePct}%)</span>
        </div>
      </div>
      <div className="flex items-center text-xs gap-4 text-gray-500 mt-1">
        <span>Volume: {data.volume.toLocaleString()}</span>
        <span className="ml-auto">{new Date(data.updatedAt).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

