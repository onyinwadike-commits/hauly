import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hauly | On-Demand Hauling & Delivery',
  description: 'Book pickup trucks, cargo vans, and box trucks on-demand. Apartment turns, furniture delivery, junk removal, and more. Consider it handled.',
  keywords: ['hauling', 'junk removal', 'furniture delivery', 'moving', 'Henderson', 'Las Vegas'],
  openGraph: {
    title: 'Hauly | On-Demand Hauling & Delivery',
    description: 'Book pickup trucks, cargo vans, and box trucks on-demand. Consider it handled.',
    url: 'https://hauly.app',
    siteName: 'Hauly',
    images: [
      {
        url: 'https://hauly.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hauly | On-Demand Hauling & Delivery',
    description: 'Book pickup trucks, cargo vans, and box trucks on-demand. Consider it handled.',
    images: ['https://hauly.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
