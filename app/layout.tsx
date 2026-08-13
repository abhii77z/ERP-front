import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BizFlow - Clothing Store ERP',
  description: 'Manage your apparel retail or wholesale business effortlessly with BizFlow.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
