import create from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from '../utils/nanoid';
import { getRandomStock, stocks } from '../utils/mockStocks';

export type WidgetType = 'finance-card' | 'table' | 'chart';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  options?: any;
  data?: any;
  lastUpdated: number;
}

interface DashboardState {
  widgets: WidgetConfig[];
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  moveWidget: (from: number, to: number) => void;
  updateWidget: (id: string, partial: Partial<WidgetConfig>) => void;
  refreshWidget: (id: string) => void;
  hydrateWidgets: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: [],
      addWidget: (type) => {
        const id = nanoid();
        const stock = getRandomStock();
        let config: WidgetConfig;
        if (type === 'finance-card') {
          config = { id, type, title: stock.symbol + ' Card', data: stock, lastUpdated: Date.now() };
        } else if (type === 'table') {
          config = { id, type, title: 'Stock Table', data: stocks.slice(0,10), lastUpdated: Date.now() };
        } else {
          config = { id, type, title: stock.symbol + ' Chart', data: stock, lastUpdated: Date.now(), options: { range: 'daily' } };
        }
        set((state) => ({ widgets: [...state.widgets, config] }));
      },
      removeWidget: (id) => set((state) => ({ widgets: state.widgets.filter((w) => w.id !== id) })),
      moveWidget: (from, to) => set((state) => {
        const widgets = [...state.widgets];
        const [moved] = widgets.splice(from, 1);
        widgets.splice(to, 0, moved);
        return { widgets };
      }),
      updateWidget: (id, partial) => set((state) => ({
        widgets: state.widgets.map((w) => w.id === id ? { ...w, ...partial } : w),
      })),
      refreshWidget: (id) => set((state) => ({
        widgets: state.widgets.map((w) =>
          w.id === id
            ? { ...w, data: getRandomStock(), lastUpdated: Date.now() }
            : w
        ),
      })),
      hydrateWidgets: () => set((state) => ({ widgets: [...state.widgets] })),
    }),
    {
      name: 'finboard-dashboard',
    }
  )
);

