"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { ShoppingCart } from "lucide-react";

const categories = [
  { name: "চাল", slug: "chal", emoji: "🍚" },
  { name: "ডাল", slug: "dal", emoji: "🫘" },
  { name: "তেল", slug: "tel", emoji: "🛢️" },
  { name: "সবজি", slug: "sobji", emoji: "🥬" },
  { name: "মাছ", slug: "mach", emoji: "🐟" },
  { name: "মাংস", slug: "mangsho", emoji: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dudh", emoji: "🥛" },
  { name: "মসলা", slug: "moshla", emoji: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Top Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              বাজার দর
            </span>
            <span className="block text-[11px] text-gray-500 font-medium -mt-0.5">
              রবিবার, ১১ অক্টোবর, ২০২৬
            </span>
          </div>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                {session.user?.name || "ইউজার"}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-rose-50 text-rose-600 hover:bg-rose-100 border-none font-semibold text-xs rounded-lg"
              >
                সাইন আউট
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/signin"
                className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-700 hover:bg-emerald-50 border border-emerald-600 rounded-lg transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Navigation Bar (Second Row) */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar py-2.5 flex items-center justify-center gap-5 sm:gap-7">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? "text-emerald-700"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                <span className="text-sm">{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}