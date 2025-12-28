'use client';
import { WidgetConfig } from '../../store/useDashboardStore';

export function WidgetSettings({ widget, open, onOpenChange }:{ widget: WidgetConfig, open: boolean, onOpenChange: (v: boolean) => void }) {
  if (!open) return null;
  // For extension: we could add more settings here!
  return (
    <div className="absolute top-10 right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-card rounded-lg z-50 py-2 px-3 animate-fadeIn">
      <h4 className="font-semibold mb-2 text-sm">Widget Options</h4>
      <p className="text-xs text-gray-500">(More settings coming soon)</p>
      <button className="mt-2 text-xs text-accent underline" onClick={() => onOpenChange(false)}>Close</button>
    </div>
  );
}

