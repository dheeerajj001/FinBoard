'use client';
import React, { useEffect, useCallback, useRef } from 'react';
import { useDashboardStore, WidgetConfig } from '../../store/useDashboardStore';
import { WidgetContainer } from '../widgets/WidgetContainer';
import { AddWidgetModal } from './AddWidgetModal';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export function Dashboard() {
  const { widgets, moveWidget, hydrateWidgets } = useDashboardStore((state) => ({
    widgets: state.widgets,
    moveWidget: state.moveWidget,
    hydrateWidgets: state.hydrateWidgets
  }));
  const [modal, setModal] = React.useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  // Hydrate from localStorage
  useEffect(() => {
    hydrateWidgets();
  }, [hydrateWidgets]);

  const handleDragEnd = ({ active, over }: any) => {
    if (active && over && active.id !== over.id) {
      const from = widgets.findIndex((w) => w.id === active.id);
      const to = widgets.findIndex((w) => w.id === over.id);
      if (from !== -1 && to !== -1) moveWidget(from, to);
    }
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className='flex mb-4 items-center justify-between'>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Your Dashboard</h2>
        <button
          className="bg-accent text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-emerald-500 transition"
          onClick={() => setModal(true)}
        >
          + Add Widget
        </button>
      </div>
      <AddWidgetModal open={modal} onClose={() => setModal(false)} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {widgets.length === 0 ? (
            <div className="col-span-full mt-12 text-center text-gray-500 dark:text-gray-400 text-lg animate-pulse">
              No widgets yet. Click <span className='font-semibold text-accent'>Add Widget</span> to get started!
            </div>
          ) : (
            widgets.map((w) => (
              <WidgetContainer key={w.id} widget={w} />
            ))
          )}
        </div>
      </DndContext>
    </section>
  );
}

