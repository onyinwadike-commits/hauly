import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hauly Admin",
  description: "Admin dashboard for Hauly on-demand hauling platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
