'use client';
import { useEffect, useMemo, useState } from 'react';
import { WidgetConfig } from '../../store/useDashboardStore';
import { stocks, getRandomStock } from '../../utils/mockStocks';

export function TableWidget({ widget }: { widget: WidgetConfig }) {
  const [tableData, setTableData] = useState<any[]>(widget.data || []);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTableData(widget.data || []);
  }, [widget.data]);

  // Auto-update every 5 seconds
  useEffect(() => {
    setLoading(true);
    const intv = setInterval(() => {
      setTableData(stocks.map(() => getRandomStock()));
      setLoading(false);
    }, 5000);
    setTimeout(() => setLoading(false), 600);
    return () => clearInterval(intv);
  }, []);

  const filtered = useMemo(
    () => tableData.filter((row) => row.symbol.toLowerCase().includes(search.toLowerCase())),
    [tableData, search]
  );

  // Pagination logic
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 7;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search]);
  useEffect(() => { if (page > Math.ceil(filtered.length / PAGE_SIZE)) setPage(1); }, [filtered, page]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <input
          className="bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 focus:border-accent outline-none text-sm"
          placeholder="Search by symbol..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {loading && <span className='text-accent text-xs animate-pulse ml-2'>Refreshing...</span>}
      </div>
      <div className="overflow-x-auto rounded shadow-card">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-200">Symbol</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 dark:text-gray-200">Price</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 dark:text-gray-200">Change %</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 dark:text-gray-200">Mkt Cap</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 text-sm divide-y divide-gray-200 dark:divide-gray-800">
            {paginated.length === 0 ? <tr><td colSpan={4} className="py-8 text-center text-gray-500">No data</td></tr> :
              paginated.map(row => (
                <tr key={row.symbol}>
                  <td className="px-4 py-2 font-bold text-accent">{row.symbol}</td>
                  <td className="px-4 py-2 text-right">${row.price}</td>
                  <td className={`px-4 py-2 text-right ${row.changePct >= 0 ? 'text-green-500' : 'text-red-500'}`}>{row.changePct}%</td>
                  <td className="px-4 py-2 text-right">${Number(row.marketCap / 1e9).toFixed(1)}B</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-2 text-xs">
        <span className="text-gray-500">Page {page}/{Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))}</span>
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50">Prev</button>
          <button disabled={page >= Math.ceil(filtered.length / PAGE_SIZE)} onClick={() => setPage(page + 1)} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-800 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}

