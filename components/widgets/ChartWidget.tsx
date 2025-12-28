'use client';
import { useEffect, useState, useRef } from 'react';
import { WidgetConfig } from '../../store/useDashboardStore';
import { getStockHistory } from '../../utils/mockStocks';
import Chart from 'chart.js/auto';

const RANGES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export function ChartWidget({ widget }: { widget: WidgetConfig }) {
  const [range, setRange] = useState(widget.options?.range || 'daily');
  const [history, setHistory] = useState<any[]>(getStockHistory(widget.data?.symbol || 'AAPL', range));
  const [loading, setLoading] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const instance = useRef<any>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHistory(getStockHistory(widget.data?.symbol || 'AAPL', range));
      setLoading(false);
    }, 600);
  }, [widget.data, range]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (instance.current) {
      instance.current.destroy();
    }
    instance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: history.map((d) => d.time),
        datasets: [
          {
            label: 'Price',
            data: history.map((d) => d.price),
            borderColor: '#06d6a0',
            backgroundColor: 'rgba(6,214,160,0.2)',
            fill: true,
            tension: 0.35,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { display: false },
          y: { display: true, grid: { color: '#e5e7eb' } },
        },
        responsive: true,
        animation: { duration: 850 },
      },
    });
    // eslint-disable-next-line
  }, [history]);

  return (
    <div className="relative">
      <div className="flex items-center mb-2 gap-2">
        <span className="text-sm font-semibold">{widget.data?.symbol || '-'}</span>
        <select
          className="ml-auto text-xs rounded border border-gray-200 dark:bg-gray-800 px-2 py-1 focus:border-accent"
          value={range}
          onChange={e => setRange(e.target.value)}
        >
          {RANGES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </div>
      {loading ? (
        <div className="h-48 flex justify-center items-center animate-pulse">Loading chart...</div>
      ) : (
        <canvas ref={chartRef} className="max-w-full h-48" />
      )}
    </div>
  );
}

