'use client';
import { useDashboardStore } from '../../store/useDashboardStore';

export function AddWidgetModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const addWidget = useDashboardStore((state) => state.addWidget);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[90vw] max-w-sm shadow-xl animate-fadeIn">
        <h3 className="text-lg font-bold mb-4">Add Widget</h3>
        <div className="flex flex-col gap-3">
          <button onClick={() => { addWidget('finance-card'); onClose(); }} className="px-4 py-2 rounded bg-zinc-900 text-white hover:bg-zinc-700 transition">Finance Card</button>
          <button onClick={() => { addWidget('table'); onClose(); }} className="px-4 py-2 rounded bg-zinc-900 text-white hover:bg-zinc-700 transition">Table</button>
          <button onClick={() => { addWidget('chart'); onClose(); }} className="px-4 py-2 rounded bg-zinc-900 text-white hover:bg-zinc-700 transition">Chart</button>
        </div>
        <button className="mt-4 text-sm text-gray-500 hover:underline" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

