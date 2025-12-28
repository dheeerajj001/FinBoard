'use client';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggle = () => {
    if (typeof window !== 'undefined') {
      const c = document.documentElement.classList;
      if (c.contains('dark')) {
        c.remove('dark');
        setIsDark(false);
        localStorage.theme = 'light';
      } else {
        c.add('dark');
        setIsDark(true);
        localStorage.theme = 'dark';
      }
    }
  };

  return (
    <button
      onClick={toggle}
      title="Toggle dark mode"
      className="relative inline-flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent transition"
    >
      {isDark ? (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
        </svg>
      ) : (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  );
}

