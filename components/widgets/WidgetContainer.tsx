'use client';
import { useRef, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useDashboardStore, WidgetConfig } from '../../store/useDashboardStore';
import { FinanceCardWidget } from './FinanceCardWidget';
import { TableWidget } from './TableWidget';
import { ChartWidget } from './ChartWidget';
import { WidgetSettings } from './WidgetSettings';

export function WidgetContainer({ widget }: { widget: WidgetConfig }) {
  const removeWidget = useDashboardStore((s) => s.removeWidget);
  const refreshWidget = useDashboardStore((s) => s.refreshWidget);
  const updateWidget = useDashboardStore((s) => s.updateWidget);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: widget.id });

  const [openSettings, setOpenSettings] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const style = transform ? {
    transform: `translate3d(${transform.x}px,${transform.y}px,0)`,
    zIndex: 20,
    boxShadow: '0 4px 24px rgba(0,0,0,0.16)'
  } : {};

  const handleTitleChange = (e: React.FormEvent) => {
    e.preventDefault();
    setEditingTitle(false);
  };

  return (
    <div
      ref={setNodeRef}
      tabIndex={-1}
      style={style}
      className={`group bg-white dark:bg-gray-900 rounded-xl shadow-card transition-all overflow-hidden relative border border-gray-200 dark:border-gray-800 ${isDragging ? 'opacity-80 ring-4 ring-accent' : ''}`}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-1 gap-2">
        {editingTitle ? (
          <form
            className='flex flex-1 mr-2'
            onSubmit={handleTitleChange}
            onBlur={handleTitleChange}
          >
            <input
              autoFocus
              type='text'
              maxLength={32}
              value={widget.title}
              onChange={(e) => updateWidget(widget.id, { title: e.target.value })}
              className="w-full text-lg bg-gray-50 dark:bg-gray-900 font-semibold rounded px-2 py-1 outline-none border border-accent"
            />
          </form>
        ) : (
          <span
            className="text-lg font-bold truncate cursor-pointer mr-auto"
            title="Rename widget"
            tabIndex={0}
            onClick={() => setEditingTitle(true)}
            onKeyDown={(e) => (e.key === 'Enter' ? setEditingTitle(true) : undefined)}
          >
            {widget.title}
          </span>
        )}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            className="p-1 text-accent hover:text-green-600"
            title="Refresh"
            onClick={() => refreshWidget(widget.id)}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M4 4v5h5M16 16v-5h-5M7 17.32A8 8 0 1 1 20 12.32"/></svg>
          </button>
          <button
            className="p-1 text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() => removeWidget(widget.id)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <button
            className="p-1 text-gray-500 hover:text-accent"
            title="Widget Settings"
            onClick={() => setOpenSettings(x => !x)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15A1.65 1.65 0 0118 17.4M4.6 9A1.65 1.65 0 016 6.6m12 6.8A1.65 1.65 0 0119.4 9M4.6 15A1.65 1.65 0 016 17.4"/></svg>
          </button>
          <button title="Drag widget" className="p-1 cursor-grab"><svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg></button>
        </div>
      </div>
      <WidgetSettings widget={widget} open={openSettings} onOpenChange={setOpenSettings} />
      <div className="px-4 pb-4">
        {widget.type === 'finance-card' && <FinanceCardWidget widget={widget} />}
        {widget.type === 'table' && <TableWidget widget={widget} />}
        {widget.type === 'chart' && <ChartWidget widget={widget} />}
      </div>
      <div className="flex justify-end px-4 pb-2">
        <span className="text-xs text-gray-400">Last updated {new Date(widget.lastUpdated).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

