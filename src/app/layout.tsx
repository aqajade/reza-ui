import './globals.css';

import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';

import { cn } from '@/lib/utils';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TUI Logistik Indonesia',
  description: 'Reliable and Efficient Freight Forwarding Services',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      suppressHydrationWarning
      lang='en'
      className={cn(
        'h-full',
        'antialiased',
        inter.variable,
        montserrat.variable,
        'font-sans'
      )}
    >
      <body suppressHydrationWarning className='flex min-h-full flex-col'>
        {children}
      </body>
    </html>
  );
}
