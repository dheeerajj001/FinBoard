// Simulated gray chip stocks for mock data
export const stocks = [
  { symbol: 'AAPL', name: 'Apple', marketCap: 2500000000000 },
  { symbol: 'GOOGL', name: 'Alphabet', marketCap: 1700000000000 },
  { symbol: 'AMZN', name: 'Amazon', marketCap: 1500000000000 },
  { symbol: 'MSFT', name: 'Microsoft', marketCap: 2950000000000 },
  { symbol: 'TSLA', name: 'Tesla', marketCap: 800000000000 },
  { symbol: 'META', name: 'Meta', marketCap: 1100000000000 },
  { symbol: 'NVDA', name: 'NVIDIA', marketCap: 2400000000000 },
  { symbol: 'UNH', name: 'UnitedHealth', marketCap: 470000000000 },
  { symbol: 'BRK.A', name: 'Berkshire Hathaway', marketCap: 830000000000 },
  { symbol: 'JPM', name: 'JPMorgan Chase', marketCap: 525000000000 },
];

export function getRandomStock() {
  const base = stocks[Math.floor(Math.random() * stocks.length)];
  const basePrice = 100 + Math.random() * 2000;
  const change = (Math.random() - 0.5) * 3;
  const pct = (change / basePrice) * 100;
  const volume = Math.floor(1000000 + Math.random() * 50000000);
  return {
    ...base,
    price: Number((basePrice + change).toFixed(2)),
    change: Number(change.toFixed(2)),
    changePct: Number(pct.toFixed(2)),
    volume,
    updatedAt: new Date().toISOString(),
  };
}

export function getStockHistory(symbol: string, range: 'daily'|'weekly'|'monthly'): { time: string, price: number }[] {
  const points = range === 'daily' ? 24 : range === 'weekly' ? 7 : 30;
  const now = new Date();
  let last = 100 + Math.random() * 2000;
  return Array.from({ length: points }, (_, i) => {
    last += (Math.random() - 0.5) * 3;
    return {
      time: new Date(now.getTime() - (points - i - 1) * (range === 'daily' ? 60*60*1000 : 24*60*60*1000)).toLocaleString(),
      price: Number(last.toFixed(2)),
    };
  });
}

