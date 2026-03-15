import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vintage Games Hub',
  description: 'Play classic arcade and puzzle games',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-mc-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
