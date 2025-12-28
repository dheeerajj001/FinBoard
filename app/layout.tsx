import '../styles/globals.css';
import { Navbar } from '../components/layout/Navbar';
import { ThemeProvider } from '../components/layout/ThemeProvider';

export const metadata = {
  title: 'FinBoard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen px-2 py-8 md:px-6 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

