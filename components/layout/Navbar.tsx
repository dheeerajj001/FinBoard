'use client';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center bg-white/80 dark:bg-gray-950/90 backdrop-blur-lg shadow-card border-b border-gray-200 dark:border-gray-800 px-4 gap-3">
      <h1 className="text-2xl font-bold tracking-tight text-primary mr-auto select-none">FinBoard</h1>
      <ThemeToggle />
    </header>
  );
}

