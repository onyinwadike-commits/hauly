import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hauly | Professional Hauling Services in Henderson, NV',
  description:
    'Apartment turns, junk removal, furniture delivery. Background-checked Haulers, photo documentation, flat-rate pricing. Consider it handled.',
  keywords: 'hauling, junk removal, apartment turn, furniture delivery, Henderson, Las Vegas, Nevada',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
