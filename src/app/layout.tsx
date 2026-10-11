import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "বাজার দর - প্রয়োজনীয় পণ্যের বাজার মূল্য",
  description: "নিত্যপ্রয়োজনীয় পণ্যের বাজার মূল্য পর্যবেক্ষণ ও তুলনা করুন",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-[#f4f7f5] text-gray-800 antialiased`}
        suppressHydrationWarning
      >
        <Toaster position="top-right" />
        
        {/* Global Fixed Navbar & Category Bar */}
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
          <Navbar />
        </Suspense>

        {/* Global Fixed Price Ticker */}
        <Suspense fallback={<div className="h-10 bg-white border-b border-gray-200" />}>
          <PriceTicker />
        </Suspense>

        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}