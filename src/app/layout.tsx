import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

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
    <html lang="bn" data-theme="light">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50/50`}>
        <Toaster position="top-right" />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}