import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PayrollDAO — On-Chain Payroll for Africa",
  description:
    "Open-source payroll infrastructure for Africa's informal workforce. Pay workers in USDC/XLM on Stellar — no bank account required.",
  keywords: ["payroll", "stellar", "blockchain", "africa", "usdc", "defi", "dao"],
  openGraph: {
    title: "PayrollDAO",
    description: "On-chain payroll for Africa's informal workforce",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
